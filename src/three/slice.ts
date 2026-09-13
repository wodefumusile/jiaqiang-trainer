/**
 * 3D 垂直切片（branch: codex/3d-rebuild）
 *
 * 目标：用免费开源的 Three.js（项目本地依赖，无外部素材）验证 3D 路线的手感与观感。
 * 全部模型都是**程序化建模**（代码里的几何体 + 层级装配），因此不依赖任何美术资源文件，
 * 几何参数集中在本文件顶部的 CONFIG 里，后续可以直接替换为 Blender 导出的 glTF。
 *
 * 覆盖内容：
 *  - 3D 房间场景：地面/天花板/砖墙（真实开洞的门框）/木箱掩体/矮墙 + 暖光 + 阴影
 *  - 程序化步枪：机匣/护木/弹匣/枪托/握把/瞄具/枪口，挂载在相机上，含后坐力与摆动
 *  - 程序化敌人：头/躯干/双臂/双腿分层装配，行走与拉出掩体动画，受击闪红与倒地
 *  - 射击：射线命中（头=秒杀，身体=25 伤害，4 枪致死），前两发精准 + 连射扩散
 *  - 反馈：枪口火光、弹壳/火花、墙面弹孔、命中/击杀提示（复用现有音效与统计管线）
 */
import * as THREE from 'three';
import { RIFLE, effectiveSpread, sampleBulletOffset, shouldResetBurst } from '../config/spray';
import { DAMAGE, shotDamage } from '../config/damage';
import { sfx } from '../engine/sfx';
import { summarizeSession } from '../stats/metrics';
import { pushSession } from '../state/appStore';
import type { EncounterRecord, ShotRecord } from '../types';

/** 可调参数（后续换 glTF 模型时只改这里） */
const CONFIG = {
  /** 站姿眼高（米） */
  eyeHeight: 1.62,
  /** 下蹲眼高（米） */
  crouchHeight: 1.05,
  /** 走廊宽度、长度 */
  roomWidth: 14,
  roomDepth: 26,
  roomHeight: 3.2,
  /** 门洞尺寸与位置 */
  doorWidth: 1.4,
  doorHeight: 2.3,
  doorZ: -6,
  /** 掩体（木箱）位置 */
  crate: { x: -1.9, z: -3.4, w: 1.2, h: 1.1, d: 1.2 },
  /** 玩家侧掩体（半高墙，蹲下可完全躲住） */
  playerCover: { x: 0.6, z: 0.9, w: 3.2, h: 1.3, d: 0.5 },
  /** 玩家可移动范围 */
  moveLimitX: 4.2,
  moveLimitZ: 3.2,
  /** 移动速度与灵敏度换算（复用 2D 版的 px/计数 → 3D 角度） */
  moveSpeed: 3.4,
  /** 敌人拉出身位（米） */
  peekOffsets: [0.5, 1.0, 1.6, 2.4],
  /** 可拉出的掩体点位（敌人每次随机挑一个） */
  covers: [
    { id: '门洞左', x: -0.55, z: -6.2 },
    { id: '门洞右', x: 0.55, z: -6.2 },
    { id: '木箱后', x: -1.9, z: -4.3 },
    { id: '木箱左', x: -2.9, z: -3.4 },
    { id: '矮墙后', x: 2.2, z: -3.1 },
  ],
  /** 敌人停下后的开火前摇（秒） */
  enemyAimTime: [0.55, 0.95],
  /** 敌人移动速度（米/秒） */
  enemySpeed: 1.9,
};

interface SliceHooks {
  onExit: () => void;
}

/** 程序化步枪：返回一个朝向 -Z 的枪组（坐标系：-Z 为枪口方向、+Y 为上） */
function buildRifle(): THREE.Group {
  const gun = new THREE.Group();
  const matMetal = new THREE.MeshStandardMaterial({ color: 0x3a424c, metalness: 0.85, roughness: 0.42 });
  const matPoly = new THREE.MeshStandardMaterial({ color: 0x22262b, metalness: 0.3, roughness: 0.75 });
  const matWood = new THREE.MeshStandardMaterial({ color: 0x6b4a2c, metalness: 0.1, roughness: 0.85 });
  const matRed = new THREE.MeshStandardMaterial({ color: 0xb8352a, metalness: 0.2, roughness: 0.7 });
  const add = (
    parent: THREE.Object3D,
    geo: THREE.BufferGeometry,
    mat: THREE.Material,
    x: number,
    y: number,
    z: number,
  ): THREE.Mesh => {
    const m = new THREE.Mesh(geo, mat);
    m.position.set(x, y, z);
    m.castShadow = true;
    parent.add(m);
    return m;
  };

  // 机匣
  add(gun, new THREE.BoxGeometry(0.1, 0.14, 0.46), matPoly, 0, 0, -0.2);
  // 顶部导轨
  add(gun, new THREE.BoxGeometry(0.06, 0.03, 0.5), matPoly, 0, 0.09, -0.22);
  // 拉机柄（换弹动画会拉动它）
  const charging = add(gun, new THREE.BoxGeometry(0.07, 0.02, 0.06), matMetal, 0.06, 0.06, -0.06);
  charging.name = 'charging';
  // 护木
  add(gun, new THREE.BoxGeometry(0.09, 0.1, 0.44), matWood, 0, -0.01, -0.66);
  // 枪管
  const barrel = add(gun, new THREE.CylinderGeometry(0.022, 0.022, 0.62, 12), matMetal, 0, 0.01, -1.18);
  barrel.rotation.x = Math.PI / 2;
  // 枪口装置
  const muzzle = add(gun, new THREE.CylinderGeometry(0.035, 0.035, 0.1, 12), matMetal, 0, 0.01, -1.52);
  muzzle.rotation.x = Math.PI / 2;
  // 弹匣（前倾）
  const mag = add(gun, new THREE.BoxGeometry(0.07, 0.26, 0.12), matPoly, 0, -0.2, -0.18);
  mag.rotation.x = -0.22;
  mag.name = 'mag';
  // 握把
  const grip = add(gun, new THREE.BoxGeometry(0.06, 0.18, 0.09), matPoly, 0, -0.17, 0.02);
  grip.rotation.x = 0.28;
  // 枪托
  add(gun, new THREE.BoxGeometry(0.08, 0.12, 0.34), matPoly, 0, -0.01, 0.16);
  // 腮托
  add(gun, new THREE.BoxGeometry(0.07, 0.05, 0.22), matPoly, 0, 0.07, 0.14);
  // 红点瞄具 + 镜片
  add(gun, new THREE.BoxGeometry(0.07, 0.07, 0.12), matPoly, 0, 0.15, -0.2);
  const lens = add(gun, new THREE.CircleGeometry(0.024, 16), new THREE.MeshBasicMaterial({ color: 0x2a6f8f }), 0, 0.15, -0.262);
  lens.rotation.y = Math.PI;
  // 红色点缀（呼应参考素材）
  add(gun, new THREE.BoxGeometry(0.02, 0.06, 0.03), matRed, 0.055, 0.02, -0.1);

  // 双手：用圆角柱体近似手套握持
  const glove = new THREE.MeshStandardMaterial({ color: 0x3c4436, roughness: 0.9 });
  const skin = new THREE.MeshStandardMaterial({ color: 0xd9a066, roughness: 0.8 });
  const handFront = add(gun, new THREE.BoxGeometry(0.09, 0.09, 0.14), glove, 0, -0.06, -0.62);
  handFront.rotation.z = 0.12;
  add(gun, new THREE.BoxGeometry(0.07, 0.05, 0.1), skin, 0, 0.0, -0.62);
  const handBack = add(gun, new THREE.BoxGeometry(0.09, 0.11, 0.12), glove, 0, -0.1, 0.0);
  handBack.rotation.z = -0.1;

  gun.traverse((o) => {
    if ((o as THREE.Mesh).isMesh) o.castShadow = false;
  });
  return gun;
}

/** 程序化敌人：返回分组与动画所需部件引用 */
function buildEnemy(): {
  group: THREE.Group;
  leftLeg: THREE.Mesh;
  rightLeg: THREE.Mesh;
  leftArm: THREE.Mesh;
  rightArm: THREE.Mesh;
  head: THREE.Mesh;
  torso: THREE.Mesh;
  materials: THREE.MeshStandardMaterial[];
} {
  const group = new THREE.Group();
  const clothes = new THREE.MeshStandardMaterial({ color: 0x39434f, roughness: 0.78, metalness: 0.05 });
  const vest = new THREE.MeshStandardMaterial({ color: 0x232a33, roughness: 0.7 });
  const pants = new THREE.MeshStandardMaterial({ color: 0x2b3037, roughness: 0.85 });
  const skinMat = new THREE.MeshStandardMaterial({ color: 0xd7a271, roughness: 0.75 });
  const hair = new THREE.MeshStandardMaterial({ color: 0x2b2118, roughness: 0.9 });
  const red = new THREE.MeshStandardMaterial({ color: 0xc0392b, roughness: 0.7 });

  // 躯干 + 战术背心
  const torso = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.58, 0.26), clothes);
  torso.position.y = 1.18;
  group.add(torso);
  const vestMesh = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.38, 0.3), vest);
  vestMesh.position.y = 1.22;
  group.add(vestMesh);
  // 红色臂章（贴在上臂）
  const band = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.08, 0.06), red);
  band.position.set(-0.26, 1.3, 0);
  group.add(band);

  // 头 + 头发
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.135, 20, 16), skinMat);
  head.position.y = 1.63;
  group.add(head);
  const hairMesh = new THREE.Mesh(new THREE.SphereGeometry(0.142, 20, 12, 0, Math.PI * 2, 0, Math.PI * 0.62), hair);
  hairMesh.position.y = 1.645;
  group.add(hairMesh);

  // 四肢（用胶囊体近似，便于摆动）
  const legGeo = new THREE.CapsuleGeometry(0.085, 0.62, 4, 10);
  const leftLeg = new THREE.Mesh(legGeo, pants);
  leftLeg.position.set(-0.12, 0.48, 0);
  group.add(leftLeg);
  const rightLeg = new THREE.Mesh(legGeo, pants);
  rightLeg.position.set(0.12, 0.48, 0);
  group.add(rightLeg);

  const armGeo = new THREE.CapsuleGeometry(0.07, 0.5, 4, 10);
  const leftArm = new THREE.Mesh(armGeo, clothes);
  leftArm.position.set(-0.29, 1.16, -0.06);
  group.add(leftArm);
  const rightArm = new THREE.Mesh(armGeo, clothes);
  rightArm.position.set(0.29, 1.16, -0.06);
  group.add(rightArm);

  // 手中的简易武器（提高剪影辨识度）
  const gunMesh = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, 0.5), new THREE.MeshStandardMaterial({ color: 0x15191d, roughness: 0.6 }));
  gunMesh.position.set(0.16, 1.12, -0.34);
  group.add(gunMesh);

  group.traverse((o) => {
    const m = o as THREE.Mesh;
    if (m.isMesh) {
      m.castShadow = true;
      m.receiveShadow = true;
    }
  });

  // 命中判定分区：整具身体都可命中（头/头发=爆头，其余=身体）
  group.traverse((o) => {
    const m = o as THREE.Mesh;
    if (!m.isMesh) return;
    m.userData.isEnemy = true;
    m.userData.zone = 'body';
  });
  head.userData.zone = 'head';
  hairMesh.userData.zone = 'head';

  return {
    group,
    leftLeg,
    rightLeg,
    leftArm,
    rightArm,
    head,
    torso,
    materials: [clothes, vest, pants, skinMat, hair, red],
  };
}

/** 3D 房间：地面、天花板、墙、门洞、木箱、矮墙 */
function buildRoom(): { root: THREE.Group; walls: THREE.Mesh[] } {
  const root = new THREE.Group();
  const walls: THREE.Mesh[] = [];
  const brick = new THREE.MeshStandardMaterial({ color: 0x9d8f79, roughness: 0.92, metalness: 0.02 });
  const floorMat = new THREE.MeshStandardMaterial({ color: 0x3b3730, roughness: 0.95 });
  const ceilMat = new THREE.MeshStandardMaterial({ color: 0x2a1e15, roughness: 0.9 });
  const wood = new THREE.MeshStandardMaterial({ color: 0x6b4a2c, roughness: 0.85 });

  // 地面 + 天花板
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(CONFIG.roomWidth, CONFIG.roomDepth), floorMat);
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  root.add(floor);
  const ceil = new THREE.Mesh(new THREE.PlaneGeometry(CONFIG.roomWidth, CONFIG.roomDepth), ceilMat);
  ceil.rotation.x = Math.PI / 2;
  ceil.position.y = CONFIG.roomHeight;
  root.add(ceil);

  const wall = (w: number, h: number, d: number, x: number, y: number, z: number): THREE.Mesh => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), brick);
    m.position.set(x, y, z);
    m.castShadow = false;
    m.receiveShadow = true;
    root.add(m);
    walls.push(m);
    return m;
  };

  const halfW = CONFIG.roomWidth / 2;
  // 两侧长墙
  wall(0.3, CONFIG.roomHeight, CONFIG.roomDepth, -halfW, CONFIG.roomHeight / 2, 0);
  wall(0.3, CONFIG.roomHeight, CONFIG.roomDepth, halfW, CONFIG.roomHeight / 2, 0);
  // 后墙（含门洞）：左段 + 右段 + 门楣
  const doorHalf = CONFIG.doorWidth / 2;
  const backZ = CONFIG.doorZ - 0.6;
  const leftW = halfW - doorHalf;
  wall(leftW, CONFIG.roomHeight, 0.3, -halfW + leftW / 2, CONFIG.roomHeight / 2, backZ);
  wall(leftW, CONFIG.roomHeight, 0.3, halfW - leftW / 2, CONFIG.roomHeight / 2, backZ);
  wall(CONFIG.doorWidth, CONFIG.roomHeight - CONFIG.doorHeight, 0.3, 0, CONFIG.doorHeight + (CONFIG.roomHeight - CONFIG.doorHeight) / 2, backZ);
  // 前墙（玩家背后，避免穿帮）
  wall(CONFIG.roomWidth, CONFIG.roomHeight, 0.3, 0, CONFIG.roomHeight / 2, CONFIG.roomDepth / 2);

  // 木箱掩体
  const crate = new THREE.Mesh(
    new THREE.BoxGeometry(CONFIG.crate.w, CONFIG.crate.h, CONFIG.crate.d),
    wood,
  );
  crate.position.set(CONFIG.crate.x, CONFIG.crate.h / 2, CONFIG.crate.z);
  crate.castShadow = true;
  crate.receiveShadow = true;
  crate.userData.isCover = true;
  root.add(crate);
  walls.push(crate);

  // 矮墙（第二个掩体）
  const lowWall = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.95, 0.4), brick);
  lowWall.position.set(2.2, 0.475, -2.4);
  lowWall.castShadow = true;
  lowWall.receiveShadow = true;
  lowWall.userData.isCover = true;
  root.add(lowWall);
  walls.push(lowWall);

  // 场景道具：沙袋堆（左后）与壁灯（暖光）
  const sandMat = new THREE.MeshStandardMaterial({ color: 0x6b6146, roughness: 0.95 });
  for (let row = 0; row < 2; row++) {
    for (let i = 0; i < 3 - row; i++) {
      const bag = new THREE.Mesh(new THREE.SphereGeometry(0.3, 12, 8), sandMat);
      bag.scale.set(1.25, 0.72, 0.85);
      bag.position.set(-5.4 + i * 0.72 + row * 0.36, 0.22 + row * 0.32, -1.2);
      bag.castShadow = true;
      bag.receiveShadow = true;
      root.add(bag);
    }
  }
  // 壁灯：自发光方块 + 暖色点光
  const lampBody = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.12, 0.24),
    new THREE.MeshStandardMaterial({ color: 0x2a2724, emissive: 0xffd9a0, emissiveIntensity: 0.6 }),
  );
  lampBody.position.set(CONFIG.roomWidth / 2 - 0.5, 2.6, -1.5);
  root.add(lampBody);
  const lamp = new THREE.PointLight(0xffd2a0, 5.5, 12, 2);
  lamp.position.set(CONFIG.roomWidth / 2 - 0.9, 2.5, -1.5);
  root.add(lamp);

  return { root, walls };
}

/** 入口：把 3D 切片挂到指定容器 */
export function mountThreeSlice(container: HTMLElement, hooks: SliceHooks): () => void {
  container.innerHTML = `
    <div class="slice3d">
      <canvas id="c3d"></canvas>
      <div class="s3-hud s3-left">
        <div class="s3-title">3D 试验版 · 垂直切片</div>
        <div class="s3-line">鼠标转视角 · WASD 移动 · Ctrl 下蹲</div>
        <div class="s3-line">按住左键连发 · R 换弹 · Esc 退出</div>
      </div>
      <div class="s3-hud s3-right">
        <div class="s3-line">击杀 <b id="s3-kills">0</b></div>
        <div class="s3-line">命中率 <b id="s3-acc">--</b></div>
        <div class="s3-line">血量 <b id="s3-hp">100</b></div>
      </div>
      <div class="s3-ammo"><span id="s3-ammo">25</span> / 25</div>
      <div class="s3-crosshair"></div>
      <div class="s3-hpbar" id="s3-hpbar"><i></i></div>
      <div class="s3-dmg" id="s3-dmg"></div>
      <div class="s3-banner" id="s3-banner"></div>
      <div class="s3-overlay" id="s3-overlay">
        <div class="s3-card">
          <h2>3D 垂直切片</h2>
          <p>程序化建模：房间 / 掩体 / 敌人 / 步枪全部由代码几何体生成。点击开始，Esc 退出。</p>
          <div class="s3-cover-toggle">
            <span>玩家掩体</span>
            <button class="btn-ghost btn-sm" id="s3-cover-on">有掩体</button>
            <button class="btn-ghost btn-sm" id="s3-cover-off">空旷场地</button>
          </div>
          <button class="btn-primary btn-lg" id="s3-start">点击进入</button>
          <button class="btn-ghost" id="s3-quit">返回 2D 版</button>
        </div>
      </div>
    </div>
  `;
  const canvas = container.querySelector<HTMLCanvasElement>('#c3d')!;
  const overlay = container.querySelector<HTMLElement>('#s3-overlay')!;
  const ammoEl = container.querySelector<HTMLElement>('#s3-ammo')!;
  const killsEl = container.querySelector<HTMLElement>('#s3-kills')!;
  const accEl = container.querySelector<HTMLElement>('#s3-acc')!;
  const hpEl = container.querySelector<HTMLElement>('#s3-hp')!;
  const bannerEl = container.querySelector<HTMLElement>('#s3-banner')!;
  const hpBarEl = container.querySelector<HTMLElement>('#s3-hpbar')!;
  const dmgLayer = container.querySelector<HTMLElement>('#s3-dmg')!;
  const crosshairEl = container.querySelector<HTMLElement>('.s3-crosshair')!;
  const coverOnBtn = container.querySelector<HTMLButtonElement>('#s3-cover-on')!;
  const coverOffBtn = container.querySelector<HTMLButtonElement>('#s3-cover-off')!;

  /* ---------------- Three.js 初始化 ---------------- */
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0d0f12);
  scene.fog = new THREE.Fog(0x0d0f12, 8, 34);

  const camera = new THREE.PerspectiveCamera(75, 1, 0.05, 200);
  camera.position.set(0, CONFIG.eyeHeight, 2.6);
  camera.rotation.order = 'YXZ';

  // 光照：环境 + 半球 + 右侧暖色主光（带阴影）+ 门口点光
  scene.add(new THREE.AmbientLight(0x8a8578, 0.35));
  scene.add(new THREE.HemisphereLight(0xffe0b0, 0x1a1d22, 0.45));
  const sun = new THREE.DirectionalLight(0xffd2a0, 1.15);
  sun.position.set(7.5, 5.5, 3.5);
  sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024);
  sun.shadow.camera.near = 0.5;
  sun.shadow.camera.far = 40;
  sun.shadow.camera.left = -12;
  sun.shadow.camera.right = 12;
  sun.shadow.camera.top = 10;
  sun.shadow.camera.bottom = -6;
  scene.add(sun);
  const doorLight = new THREE.PointLight(0xffc98a, 6, 14, 2);
  doorLight.position.set(0, 2.4, CONFIG.doorZ - 0.4);
  scene.add(doorLight);

  const room = buildRoom();
  scene.add(room.root);

  /* ---------------- 玩家掩体（可开关） ---------------- */
  const COVER_KEY = 'jg.slice3d.cover';
  const coverState = { on: (localStorage.getItem(COVER_KEY) ?? 'on') !== 'off' };
  let playerCoverMeshes: THREE.Mesh[] = [];

  /** 生成 / 移除玩家侧掩体（半高墙，蹲下可完全藏住） */
  const applyCoverSetting = (): void => {
    // 先清理旧掩体
    for (const m of playerCoverMeshes) {
      scene.remove(m);
      const idx = room.walls.indexOf(m);
      if (idx >= 0) room.walls.splice(idx, 1);
    }
    playerCoverMeshes = [];

    if (coverState.on) {
      const c = CONFIG.playerCover;
      const mat = new THREE.MeshStandardMaterial({ color: 0x8a8172, roughness: 0.92 });
      const wallMesh = new THREE.Mesh(new THREE.BoxGeometry(c.w, c.h, c.d), mat);
      wallMesh.position.set(c.x, c.h / 2, c.z);
      wallMesh.castShadow = true;
      wallMesh.receiveShadow = true;
      wallMesh.userData.isPlayerCover = true;
      scene.add(wallMesh);
      playerCoverMeshes.push(wallMesh);
      room.walls.push(wallMesh); // 加入射线目标：玩家子弹会打在掩体上留弹孔
    }
    coverOnBtn.classList.toggle('btn-primary', coverState.on);
    coverOffBtn.classList.toggle('btn-primary', !coverState.on);
    localStorage.setItem(COVER_KEY, coverState.on ? 'on' : 'off');
  };
  applyCoverSetting();

  /** 敌人视线判定：从敌人眼睛到玩家相机，被玩家掩体挡住则返回 false */
  const losRay = new THREE.Raycaster();
  const enemyHasLineOfSight = (): boolean => {
    if (playerCoverMeshes.length === 0) return true;
    const from = new THREE.Vector3(enemy.group.position.x, 1.5, enemy.group.position.z);
    const to = camera.position.clone();
    const dir = to.clone().sub(from);
    const dist = dir.length();
    losRay.set(from, dir.normalize());
    losRay.far = dist;
    return losRay.intersectObjects(playerCoverMeshes, false).length === 0;
  };

  // 第一人称步枪：挂到相机上（-Z 为枪口方向），做右下角偏移
  const rifle = buildRifle();
  rifle.position.set(0.16, -0.17, -0.34);
  rifle.rotation.set(0, 0.04, 0);
  camera.add(rifle);
  scene.add(camera);

  // 换弹动画要单独驱动的部件（记录基准变换，动画只做偏移）
  const magPart = rifle.getObjectByName('mag') as THREE.Mesh;
  const chargingPart = rifle.getObjectByName('charging') as THREE.Mesh;
  const magBase = magPart.position.clone();
  const magBaseRotX = magPart.rotation.x;
  const chargingBase = chargingPart.position.clone();

  // 枪口火光
  const flash = new THREE.PointLight(0xffd27a, 0, 6, 2);
  flash.position.set(0, 0.01, -1.58);
  rifle.add(flash);
  const flashMesh = new THREE.Mesh(
    new THREE.CircleGeometry(0.09, 12),
    new THREE.MeshBasicMaterial({ color: 0xffe08a, transparent: true, opacity: 0 }),
  );
  flashMesh.position.set(0, 0.01, -1.58);
  rifle.add(flashMesh);

  /* ---------------- 敌人 ---------------- */
  const enemy = buildEnemy();
  scene.add(enemy.group);

  type EnemyState = 'hidden' | 'walking' | 'aiming' | 'dead';
  const enemyAI = {
    state: 'hidden' as EnemyState,
    hp: DAMAGE.maxHp,
    timer: 0,
    peekTargetX: 0,
    peekPos: new THREE.Vector3(0, 0, 0),
    coverName: '',
    crouch: false,
    aimPose: 0,
    blocked: 0,
    dieProgress: 0,
    walkPhase: 0,
  };

  /** 让敌人从门后出现在门内（隐藏 → 走出门洞） */
  const resetEnemy = (): void => {
    const cover = CONFIG.covers[Math.floor(Math.random() * CONFIG.covers.length)];
    const offset = CONFIG.peekOffsets[Math.floor(Math.random() * CONFIG.peekOffsets.length)];
    const side = Math.random() < 0.5 ? -1 : 1;
    enemyAI.state = 'hidden';
    enemyAI.hp = DAMAGE.maxHp;
    enemyAI.timer = 0.6 + Math.random() * 1.6; // 出现前的随机等待
    enemyAI.coverName = cover.id;
    enemyAI.crouch = Math.random() < 0.35; // 约 1/3 概率蹲下
    enemyAI.aimPose = 0;
    enemyAI.blocked = 0;
    // 从掩体后拉出：横向一个身位 + 朝玩家方向走出一段
    enemyAI.peekTargetX = cover.x + side * offset;
    enemyAI.peekPos.set(enemyAI.peekTargetX, 0, cover.z + 1.1 + Math.random() * 0.9);
    enemyAI.dieProgress = 0;
    enemy.group.visible = true;
    enemy.group.scale.set(1, 1, 1);
    enemy.group.position.set(cover.x, 0, cover.z);
    enemy.group.rotation.set(0, 0, 0);
    enemy.leftArm.rotation.set(0, 0, 0);
    enemy.rightArm.rotation.set(0, 0, 0);
    enemy.leftLeg.rotation.set(0, 0, 0);
    enemy.rightLeg.rotation.set(0, 0, 0);
    enemy.materials.forEach((m) => m.emissive.setHex(0x000000));
  };
  resetEnemy();

  // 调试挂点（便于自动化测试读取运行时状态与瞄准某点）
  const debugAim = (x: number, y: number, z: number): void => {
    const dx = x - camera.position.x;
    const dy = y - camera.position.y;
    const dz = z - camera.position.z;
    yaw = Math.atan2(-dx, -dz);
    pitch = Math.atan2(dy, Math.hypot(dx, dz));
  };
  (window as unknown as { __slice3d?: unknown }).__slice3d = {
    enemy,
    camera,
    scene,
    ai: enemyAI,
    aimAt: debugAim,
    getBurst: () => burst,
    rifle,
    parts: { mag: magPart, charging: chargingPart },
    reloadState: () => ({ reloading, magY: +magPart.position.y.toFixed(3), chargeZ: +chargingPart.position.z.toFixed(3) }),
    coverState: () => ({
      on: coverState.on,
      count: playerCoverMeshes.length,
      los: enemyHasLineOfSight(),
      blocked: +enemyAI.blocked.toFixed(2),
    }),
    deaths: () => stats.deaths,
  };

  /* ---------------- 输入与射击 ---------------- */
  const keys = new Set<string>();
  let yaw = 0;
  let pitch = 0;
  let crouching = false;
  let firing = false;
  let ammo = RIFLE.magSize;
  let reloading = false;
  let reloadEnd = 0;
  let reloadStartAt = 0;
  let burst = 0;
  let lastShot = 0;
  let recoil = 0;
  let running = false;
  let rafId = 0;
  let lastT = performance.now();

  const stats = { shots: 0, hits: 0, kills: 0, deaths: 0, startedEpoch: Date.now(), startedPerf: performance.now() };
  const shotRecords: ShotRecord[] = [];
  const encounterRecords: EncounterRecord[] = [];
  let currentEncounter: Partial<EncounterRecord> | null = null;
  const playerPos = new THREE.Vector3(0, CONFIG.eyeHeight, 2.6);
  const playerVel = new THREE.Vector3();

  const decals: THREE.Mesh[] = [];
  const sparks: { mesh: THREE.Mesh; vel: THREE.Vector3; life: number }[] = [];
  const decalGeo = new THREE.CircleGeometry(0.035, 10);
  const decalMat = new THREE.MeshBasicMaterial({ color: 0x121212, transparent: true, opacity: 0.9 });
  const sparkMat = new THREE.MeshBasicMaterial({ color: 0xffd9a0 });
  const bloodMat = new THREE.MeshBasicMaterial({ color: 0xa81f1a });

  const raycaster = new THREE.Raycaster();

  const spawnSparks = (
    point: THREE.Vector3,
    normal: THREE.Vector3,
    count: number,
    mat: THREE.Material = sparkMat,
  ): void => {
    for (let i = 0; i < count; i++) {
      const m = new THREE.Mesh(new THREE.SphereGeometry(0.012, 5, 4), mat);
      m.position.copy(point);
      const vel = normal
        .clone()
        .multiplyScalar(1.2 + Math.random())
        .add(new THREE.Vector3((Math.random() - 0.5) * 1.6, (Math.random() - 0.5) * 1.6, (Math.random() - 0.5) * 1.6));
      scene.add(m);
      sparks.push({ mesh: m, vel, life: 0.35 + Math.random() * 0.2 });
    }
  };

  const addDecal = (point: THREE.Vector3, normal: THREE.Vector3): void => {
    const d = new THREE.Mesh(decalGeo, decalMat);
    d.position.copy(point).addScaledVector(normal, 0.012);
    d.lookAt(point.clone().add(normal));
    scene.add(d);
    decals.push(d);
    if (decals.length > 40) {
      const old = decals.shift();
      if (old) scene.remove(old);
    }
  };

  /** 单发：射线命中敌人（头=秒杀，身体=25）或场景（留弹孔 + 火花） */
  const shoot = (): void => {
    const now = performance.now();
    if (reloading || ammo <= 0) {
      sfx.empty();
      return;
    }
    ammo--;
    ammoEl.textContent = String(ammo);
    const moving = playerVel.length() > 0.4; // 需求④：移动打断连射累积
    if (shouldResetBurst(moving, now - lastShot)) burst = 0;
    burst++;
    lastShot = now;

    // 前两发精准；之后按散布半径换算成角度偏移（复用 2D 版的散布模型）
    const spreadPx = effectiveSpread(burst, window.innerWidth, moving);
    const off = sampleBulletOffset(spreadPx);
    const halfFovY = (75 * Math.PI) / 360;
    const angleX = Math.atan((off.x / window.innerWidth) * 2 * Math.tan(halfFovY) * camera.aspect);
    const angleY = Math.atan((off.y / window.innerHeight) * 2 * Math.tan(halfFovY));
    const dir = new THREE.Vector3(0, 0, -1)
      .applyQuaternion(camera.quaternion)
      .applyQuaternion(new THREE.Quaternion().setFromEuler(new THREE.Euler(-angleY, angleX, 0, 'YXZ')))
      .normalize();
    raycaster.set(camera.getWorldPosition(new THREE.Vector3()), dir);

    const targets: THREE.Object3D[] = [...room.walls, enemy.group];
    const hits = raycaster.intersectObjects(targets, true);
    stats.shots++;
    shotRecords.push({
      t: now - stats.startedPerf,
      hit: false,
      head: false,
      targetX: 0,
      targetY: 0,
      distX: 0,
    });
    const lastShotRecord = shotRecords[shotRecords.length - 1];
    recoil = 1;
    flash.intensity = 6;
    flashMesh.material.opacity = 0.95;
    sfx.shot();

    if (hits.length > 0) {
      const hitObj = hits[0].object as THREE.Mesh;
      // 沿父级向上判断是否属于敌人（避免手臂/腿/武器漏判）
      let isEnemyPart = false;
      let cursor: THREE.Object3D | null = hitObj;
      while (cursor) {
        if (cursor.userData?.isEnemy) {
          isEnemyPart = true;
          break;
        }
        cursor = cursor.parent;
      }
      const zone = (hitObj.userData.zone as string | undefined) ?? 'body';
      const enemyHit = isEnemyPart && enemyAI.state !== 'dead';
      if (enemyHit) {
        const dmg = shotDamage(zone === 'head', 'headshot');
        enemyAI.hp = Math.max(0, enemyAI.hp - dmg);
        stats.hits++;
        showHitmarker(zone === 'head');
        spawnDamageText(hits[0].point, zone === 'head' ? '爆头' : `-${dmg}`, zone === 'head' ? '#ffd24a' : '#ff9a86');
        lastShotRecord.hit = true;
        lastShotRecord.head = zone === 'head';
        if (currentEncounter) {
          currentEncounter.shotsFired = (currentEncounter.shotsFired ?? 0) + 1;
          if (currentEncounter.firstShotAt == null) {
            currentEncounter.firstShotAt = now;
            currentEncounter.firstShotHit = true;
            currentEncounter.firstShotHead = zone === 'head';
          }
        }
        enemy.materials.forEach((m) => m.emissive.setHex(0x551111));
        window.setTimeout(() => enemy.materials.forEach((m) => m.emissive.setHex(0x000000)), 110);
        spawnSparks(hits[0].point, hits[0].face?.normal ?? new THREE.Vector3(0, 1, 0), 6, bloodMat);
        if (zone === 'head') sfx.headshot();
        else sfx.hit();
        if (enemyAI.hp <= 0) {
          enemyAI.state = 'dead';
          stats.kills++;
          killsEl.textContent = String(stats.kills);
          sfx.killConfirm(stats.kills);
          showBanner(zone === 'head' ? '爆头击杀' : `击杀（${enemyAI.hp === 0 ? '身体' : ''}）`);
          spawnSparks(hits[0].point, hits[0].face?.normal ?? new THREE.Vector3(0, 1, 0), 14, bloodMat);
          closeEncounter(true);
        }
      } else {
        addDecal(hits[0].point, hits[0].face?.normal ?? new THREE.Vector3(0, 1, 0));
        spawnSparks(hits[0].point, hits[0].face?.normal ?? new THREE.Vector3(0, 1, 0), 7);
        sfx.miss();
      }
    }
    if (ammo <= 0) startReload();
  };

  const startReload = (): void => {
    if (reloading) return;
    reloading = true;
    reloadStartAt = performance.now();
    reloadEnd = reloadStartAt + RIFLE.reloadMs;
    ammoEl.textContent = '换弹中';
    sfx.reloadStart();
  };

  const showBanner = (text: string): void => {
    bannerEl.textContent = text;
    bannerEl.className = 's3-banner show';
    window.setTimeout(() => {
      bannerEl.className = 's3-banner';
    }, 850);
  };

  /** 命中准星闪光 */
  const showHitmarker = (head: boolean): void => {
    crosshairEl.classList.remove('hit', 'headhit');
    void crosshairEl.offsetWidth;
    crosshairEl.classList.add(head ? 'headhit' : 'hit');
  };

  /** 伤害数字：把世界坐标投影到屏幕后生成漂浮文字 */
  const spawnDamageText = (world: THREE.Vector3, text: string, color: string): void => {
    const v = world.clone().project(camera);
    const el = document.createElement('div');
    el.className = 's3-dmg-item';
    el.textContent = text;
    el.style.color = color;
    el.style.left = `${((v.x + 1) / 2) * 100}%`;
    el.style.top = `${((-v.y + 1) / 2) * 100}%`;
    dmgLayer.appendChild(el);
    window.setTimeout(() => el.remove(), 700);
  };

  const openEncounter = (): void => {
    currentEncounter = {
      targetId: stats.kills + stats.deaths + 1,
      appearAt: performance.now(),
      firstShotAt: null,
      firstShotHit: false,
      firstShotHead: false,
      shotsFired: 0,
      killed: false,
      killAt: null,
      escaped: false,
      flickDistPx: null,
      preaimErrPx: null,
      displacementPx: 0,
      trackMs: null,
      activeDurMs: null,
      attacked: false,
    };
  };

  const closeEncounter = (killed: boolean): void => {
    if (!currentEncounter) return;
    currentEncounter.killed = killed;
    currentEncounter.killAt = performance.now();
    currentEncounter.escaped = !killed;
    encounterRecords.push(currentEncounter as EncounterRecord);
    currentEncounter = null;
  };

  /* ---------------- 事件绑定 ---------------- */
  const onKeyDown = (e: KeyboardEvent): void => {
    keys.add(e.code);
    if (e.code === 'KeyR') startReload();
    // C：随时切换玩家掩体（有掩体 / 空旷场地）
    if (e.code === 'KeyC') {
      coverState.on = !coverState.on;
      applyCoverSetting();
      showBanner(coverState.on ? '掩体：开启' : '掩体：关闭');
    }
    if (e.code === 'Escape') exit();
    if (e.code === 'ControlLeft' || e.code === 'ControlRight') crouching = true;
  };
  const onKeyUp = (e: KeyboardEvent): void => {
    keys.delete(e.code);
    if (e.code === 'ControlLeft' || e.code === 'ControlRight') crouching = false;
  };
  const onMouseMove = (e: MouseEvent): void => {
    if (!running || document.pointerLockElement !== canvas) return;
    const sens = 0.0022;
    yaw -= e.movementX * sens;
    pitch = Math.max(-1.1, Math.min(1.1, pitch - e.movementY * sens));
  };
  const onMouseDown = (e: MouseEvent): void => {
    if (e.button === 0) firing = true;
  };
  const onMouseUp = (e: MouseEvent): void => {
    if (e.button === 0) firing = false;
  };
  document.addEventListener('keydown', onKeyDown);
  document.addEventListener('keyup', onKeyUp);
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mousedown', onMouseDown);
  document.addEventListener('mouseup', onMouseUp);

  const resize = (): void => {
    const w = container.clientWidth || window.innerWidth;
    const h = container.clientHeight || window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  window.addEventListener('resize', resize);
  resize();

  const start = (): void => {
    overlay.classList.add('hidden');
    running = true;
    lastT = performance.now();
    canvas.requestPointerLock();
  };

  const exit = (): void => {
    running = false;
    firing = false;
    cancelAnimationFrame(rafId);
    if (document.pointerLockElement === canvas) void document.exitPointerLock();
    if (stats.shots > 0) {
      const summary = summarizeSession({
        modeId: 'positioning',
        sceneId: '3d-slice',
        sceneName: '3D 试验场景',
        difficultyId: 'normal',
        difficultyName: '普通',
        profileId: '3d',
        profileName: '3D 切片',
        startedAt: stats.startedEpoch,
        durationMs: performance.now() - stats.startedPerf,
        shots: shotRecords,
        wastedShots: 0,
        encounters: encounterRecords,
        moveDir: 1,
      });
      pushSession(summary);
    }
    hooks.onExit();
  };

  container.querySelector<HTMLButtonElement>('#s3-start')!.addEventListener('click', start);
  coverOnBtn.addEventListener('click', () => {
    coverState.on = true;
    applyCoverSetting();
  });
  coverOffBtn.addEventListener('click', () => {
    coverState.on = false;
    applyCoverSetting();
  });
  container.querySelector<HTMLButtonElement>('#s3-quit')!.addEventListener('click', () => {
    running = false;
    hooks.onExit();
  });
  canvas.addEventListener('click', () => {
    if (running && document.pointerLockElement !== canvas) canvas.requestPointerLock();
  });
  document.addEventListener('pointerlockchange', () => {
    if (running && document.pointerLockElement !== canvas) {
      overlay.classList.remove('hidden');
      running = false;
    }
  });

  /* ---------------- 主循环 ---------------- */
  const loop = (): void => {
    rafId = requestAnimationFrame(loop);
    const now = performance.now();
    const dt = Math.min(0.05, (now - lastT) / 1000);
    lastT = now;
    if (!running) return;

    // —— 视角 ——
    camera.rotation.set(pitch, yaw, 0);

    // —— WASD 移动 + 下蹲 ——
    const forward = new THREE.Vector3(-Math.sin(yaw), 0, -Math.cos(yaw));
    const right = new THREE.Vector3(Math.cos(yaw), 0, -Math.sin(yaw));
    const wish = new THREE.Vector3();
    if (keys.has('KeyW')) wish.add(forward);
    if (keys.has('KeyS')) wish.sub(forward);
    if (keys.has('KeyD')) wish.add(right);
    if (keys.has('KeyA')) wish.sub(right);
    if (wish.lengthSq() > 0) wish.normalize().multiplyScalar(CONFIG.moveSpeed);
    playerVel.lerp(wish, Math.min(1, dt * 12));
    playerPos.addScaledVector(playerVel, dt);
    // 需求④：移动期间持续清零连射累积（急停后第一发必定精准）
    if (playerVel.length() > 0.4) burst = 0;
    playerPos.x = Math.max(-CONFIG.moveLimitX, Math.min(CONFIG.moveLimitX, playerPos.x));
    playerPos.z = Math.max(-CONFIG.moveLimitZ, Math.min(2.9, playerPos.z));
    const eye = crouching ? CONFIG.crouchHeight : CONFIG.eyeHeight;
    camera.position.set(playerPos.x, eye + Math.sin(now * 0.002) * 0.006, playerPos.z);
    camera.position.y += (eye - camera.position.y) * Math.min(1, dt * 10);

    // —— 步枪后坐力与摆动 ——
    recoil = Math.max(0, recoil - dt * 6.5);
    const sway = -playerVel.x * 0.012;

    // —— 换弹动画（只做表现，不改变 2.5 秒的换弹时长与数值）——
    // t: 0→1 时间轴；分四段：压枪 → 卸匣 → 装匣 → 拉栓复位
    let reloadDip = 0;
    let magDrop = 0;
    let magTilt = 0;
    let chargingPull = 0;
    if (reloading) {
      const t = Math.min(1, (now - reloadStartAt) / RIFLE.reloadMs);
      // 压枪：前 25% 下沉，末 25% 抬起
      reloadDip = t < 0.25 ? t / 0.25 : t > 0.75 ? (1 - t) / 0.25 : 1;
      // 卸匣（20%-45%）→ 空档 → 装匣（55%-80%）
      if (t >= 0.2 && t < 0.45) {
        const k = (t - 0.2) / 0.25;
        magDrop = -0.55 * k;
        magTilt = 1.1 * k;
      } else if (t >= 0.45 && t < 0.55) {
        magDrop = -0.55;
        magTilt = 1.1;
      } else if (t >= 0.55 && t < 0.8) {
        const k = (t - 0.55) / 0.25;
        magDrop = -0.55 * (1 - k);
        magTilt = 1.1 * (1 - k);
      }
      // 拉栓（80%-95%）：一次往返
      if (t >= 0.8 && t < 0.95) {
        chargingPull = Math.sin(((t - 0.8) / 0.15) * Math.PI) * 0.085;
      }
    }
    magPart.position.set(magBase.x, magBase.y + magDrop, magBase.z);
    magPart.rotation.x = magBaseRotX + magTilt;
    chargingPart.position.set(chargingBase.x, chargingBase.y, chargingBase.z - chargingPull);

    rifle.position.set(
      0.16 + sway,
      -0.17 + recoil * 0.03 + reloadDip * -0.14,
      -0.34 + recoil * 0.085 + reloadDip * 0.02,
    );
    rifle.rotation.set(
      recoil * 0.16 + reloadDip * 0.34,
      0.04 + sway * 0.5,
      recoil * 0.05 - reloadDip * 0.16,
    );
    flash.intensity = Math.max(0, flash.intensity - dt * 90);
    flashMesh.material.opacity = Math.max(0, flashMesh.material.opacity - dt * 12);

    // —— 连发 ——
    if (firing && now - lastShot >= RIFLE.fireIntervalMs) shoot();

    // —— 换弹 ——
    if (reloading && now >= reloadEnd) {
      reloading = false;
      ammo = RIFLE.magSize;
      ammoEl.textContent = String(ammo);
      sfx.reloadDone();
    }

    // —— 敌人 AI：等待 → 走出门洞（拉出）→ 停下瞄准 → 开火 ——
    const g = enemy.group;
    if (enemyAI.state === 'hidden') {
      enemyAI.timer -= dt;
      if (enemyAI.timer <= 0) {
        enemyAI.state = 'walking';
        openEncounter();
      }
    } else if (enemyAI.state === 'walking') {
      // 从掩体后走到拉出位（沿路径绕过掩体）
      const target = enemyAI.peekPos;
      const dir = target.clone().sub(g.position);
      const dist = dir.length();
      if (dist > 0.06) {
        dir.normalize();
        g.position.addScaledVector(dir, CONFIG.enemySpeed * dt);
        g.rotation.y = Math.atan2(dir.x, dir.z) + Math.PI;
        enemyAI.walkPhase += dt * 7;
        const swing = Math.sin(enemyAI.walkPhase) * 0.55;
        enemy.leftLeg.rotation.x = swing;
        enemy.rightLeg.rotation.x = -swing;
        enemy.leftArm.rotation.x = -swing * 0.6;
        enemy.rightArm.rotation.x = swing * 0.6;
        g.position.y = Math.abs(Math.sin(enemyAI.walkPhase)) * 0.035;
      } else {
        enemyAI.state = 'aiming';
        enemyAI.timer = CONFIG.enemyAimTime[0] + Math.random() * (CONFIG.enemyAimTime[1] - CONFIG.enemyAimTime[0]);
        enemy.leftLeg.rotation.x = 0;
        enemy.rightLeg.rotation.x = 0;
        // 蹲下：整体下沉并轻微压扁（视觉上更矮）
        if (enemyAI.crouch) {
          g.scale.set(1, 0.86, 1);
          g.position.y = -0.06;
        }
      }
    } else if (enemyAI.state === 'aiming') {
      enemyAI.timer -= dt;
      // 举枪瞄准姿态：双臂前伸，随瞄准进度抬起
      enemyAI.aimPose = Math.min(1, enemyAI.aimPose + dt * 3);
      enemy.leftArm.rotation.x = -1.25 * enemyAI.aimPose;
      enemy.rightArm.rotation.x = -1.35 * enemyAI.aimPose;
      // 面向玩家
      const toPlayer = new THREE.Vector3(playerPos.x - g.position.x, 0, playerPos.z - g.position.z);
      g.rotation.y = Math.atan2(toPlayer.x, toPlayer.z) + Math.PI;
      // 真实遮挡：玩家躲在掩体后 → 敌人看不见就不开火，并侧移换角度找人
      const hasLos = enemyHasLineOfSight();
      if (!hasLos) {
        enemyAI.blocked += dt;
        if (enemyAI.blocked > 1.2) {
          enemyAI.blocked = 0;
          const side = Math.random() < 0.5 ? -1 : 1;
          enemyAI.peekPos.x = Math.max(-5.6, Math.min(5.6, g.position.x + side * 1.1));
          enemyAI.state = 'walking';
        }
      } else if (enemyAI.timer <= 0) {
        enemyAI.blocked = 0;
        // 开火：扣血 + 红屏 + 阵亡计数
        // 注意：这里**不能** resetEnemy()——那会把敌人血量一起回满（曾经的"无敌帧"Bug）
        stats.deaths++;
        hpEl.textContent = '0';
        sfx.enemyShot();
        document.body.classList.add('s3-hurt');
        window.setTimeout(() => document.body.classList.remove('s3-hurt'), 260);
        if (currentEncounter) {
          currentEncounter.attacked = true;
          closeEncounter(false);
        }
        // 保持血量与位置，敌人继续瞄准（下次开火前有同样的前摇），直到被击杀
        enemyAI.timer = CONFIG.enemyAimTime[0] + Math.random() * (CONFIG.enemyAimTime[1] - CONFIG.enemyAimTime[0]);
        window.setTimeout(() => {
          hpEl.textContent = '100';
        }, 900);
      }
    } else if (enemyAI.state === 'dead') {
      // 倒地动画（放慢，并保留尸体一小段时间，避免看起来"打死又复活"）
      enemyAI.dieProgress = Math.min(1, enemyAI.dieProgress + dt * 1.1);
      g.rotation.x = -enemyAI.dieProgress * 1.35;
      g.position.y = -enemyAI.dieProgress * 0.18;
      if (enemyAI.dieProgress >= 1) {
        enemyAI.timer += dt;
        if (enemyAI.timer > 1.0) resetEnemy();
      }
    }

    // —— 敌人血条（投影到屏幕） ——
    if (enemy.group.visible && enemyAI.state !== 'hidden') {
      const top = new THREE.Vector3(enemy.group.position.x, 1.92, enemy.group.position.z).project(camera);
      const onScreen = top.z < 1;
      hpBarEl.style.display = onScreen ? 'block' : 'none';
      if (onScreen) {
        hpBarEl.style.left = `${((top.x + 1) / 2) * 100}%`;
        hpBarEl.style.top = `${((-top.y + 1) / 2) * 100}%`;
        const ratio = Math.max(0, enemyAI.hp / DAMAGE.maxHp);
        const fill = hpBarEl.firstElementChild as HTMLElement;
        fill.style.width = `${ratio * 100}%`;
        fill.style.background = ratio > 0.5 ? '#7cfc9b' : ratio > 0.25 ? '#ffd166' : '#ff5c5c';
      }
    } else {
      hpBarEl.style.display = 'none';
    }

    // —— 火花衰减 ——
    for (let i = sparks.length - 1; i >= 0; i--) {
      const s = sparks[i];
      s.life -= dt;
      s.vel.y -= 4.5 * dt;
      s.mesh.position.addScaledVector(s.vel, dt);
      if (s.life <= 0) {
        scene.remove(s.mesh);
        sparks.splice(i, 1);
      }
    }

    accEl.textContent = stats.shots > 0 ? `${Math.round((stats.hits / stats.shots) * 100)}%` : '--';
    renderer.render(scene, camera);
  };
  rafId = requestAnimationFrame(loop);

  // 清理：退出 3D 切片时解绑所有监听
  return () => {
    cancelAnimationFrame(rafId);
    running = false;
    document.removeEventListener('keydown', onKeyDown);
    document.removeEventListener('keyup', onKeyUp);
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mousedown', onMouseDown);
    document.removeEventListener('mouseup', onMouseUp);
    window.removeEventListener('resize', resize);
    renderer.dispose();
  };
}
