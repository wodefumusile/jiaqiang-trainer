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
import { DIFFICULTIES } from '../config/difficulty';
import { summarizeSession } from '../stats/metrics';
import { pushSession } from '../state/appStore';
import type { EncounterRecord, ShotRecord } from '../types';

/** 版本标识：HUD 会显示它——用于一眼判断"浏览器里跑的是不是最新代码" */
const BUILD_STAMP = 'v3d-0.6';

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
  /** 刷新点：**只在玩家正面方向**（门口 + 前侧掩体），不再有身后/侧后刷新 */
  covers: [
    { id: '门后左', x: -1.8, z: -7.6 },
    { id: '门后右', x: 1.8, z: -7.6 },
    { id: '前左箱后', x: -3.8, z: -2.2 },
    { id: '前右箱后', x: 3.8, z: -1.8 },
  ],
  /** 敌人停下后的开火前摇（秒） */
  enemyAimTime: [0.55, 0.95],
  /** 敌人移动速度（米/秒） */
  enemySpeed: 1.9,
  /** 刷新约束：离玩家最小距离（米）与判定用眼高 */
  spawn: { minDistance: 4, headHeight: 1.6 },
};

/**
 * 材质工厂：弱显卡上 MeshStandardMaterial（PBR）太贵，
 * 低/中画质统一用 MeshLambertMaterial（纯漫反射，几乎同样的观感但便宜很多）。
 * 只在建场景时决定一次——运行时切材质会触发着色器重编译造成卡顿。
 */
let useStandardMaterials = true;
function makeMat(params: {
  color: number;
  roughness?: number;
  metalness?: number;
  emissive?: number;
  emissiveIntensity?: number;
}): THREE.Material {
  if (useStandardMaterials) {
    return new THREE.MeshStandardMaterial({
      color: params.color,
      roughness: params.roughness ?? 0.8,
      metalness: params.metalness ?? 0.05,
      emissive: params.emissive ?? 0x000000,
      emissiveIntensity: params.emissiveIntensity ?? 1,
    });
  }
  return new THREE.MeshLambertMaterial({
    color: params.color,
    emissive: params.emissive ?? 0x000000,
  });
}

/**
 * 难度 → 战术动作表（需求①）
 * peek：拉出身位范围（米）｜crouch：蹲下概率｜feint：假动作（先探再缩再出）
 * strafeShoot：拉出后横向移动射击｜coverChange：中途换掩体｜jitter：速度随机抖动比例
 */
const TACTICS: Record<
  string,
  { peek: [number, number]; crouch: number; feint: boolean; strafeShoot: boolean; coverChange: boolean; jitter: number }
> = {
  easy: { peek: [0.6, 1.0], crouch: 0.15, feint: false, strafeShoot: false, coverChange: false, jitter: 0 },
  normal: { peek: [0.5, 2.4], crouch: 0.25, feint: false, strafeShoot: false, coverChange: false, jitter: 0.1 },
  hard: { peek: [0.5, 2.4], crouch: 0.4, feint: false, strafeShoot: false, coverChange: false, jitter: 0.2 },
  insane: { peek: [0.8, 2.6], crouch: 0.45, feint: true, strafeShoot: false, coverChange: true, jitter: 0.3 },
  master: { peek: [1.0, 2.8], crouch: 0.5, feint: true, strafeShoot: true, coverChange: true, jitter: 0.45 },
  extreme: { peek: [1.2, 3.2], crouch: 0.55, feint: true, strafeShoot: true, coverChange: true, jitter: 0.65 },
};

interface SliceHooks {
  onExit: () => void;
}

/** 程序化步枪：返回一个朝向 -Z 的枪组（坐标系：-Z 为枪口方向、+Y 为上） */
function buildRifle(): THREE.Group {
  const gun = new THREE.Group();
  const matMetal = new THREE.MeshStandardMaterial({ color: 0x3a424c, metalness: 0.85, roughness: 0.42 });
  const matPoly = new THREE.MeshStandardMaterial({ color: 0x22262b, metalness: 0.3, roughness: 0.75 });
  const matWood = makeMat({ color: 0x6b4a2c, roughness: 0.85 });
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
  const glove = makeMat({ color: 0x3c4436, roughness: 0.9 });
  const skin = makeMat({ color: 0xd9a066, roughness: 0.8 });
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
  materials: THREE.Material[];
} {
  const group = new THREE.Group();
  const clothes = makeMat({ color: 0x39434f, roughness: 0.78 });
  const vest = makeMat({ color: 0x232a33, roughness: 0.7 });
  const pants = makeMat({ color: 0x2b3037, roughness: 0.85 });
  const skinMat = makeMat({ color: 0xd7a271, roughness: 0.75 });
  const hair = makeMat({ color: 0x2b2118, roughness: 0.9 });
  const red = makeMat({ color: 0xc0392b, roughness: 0.7 });

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
  const gunMesh = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, 0.5), makeMat({ color: 0x15191d, roughness: 0.6 }));
  gunMesh.position.set(0.16, 1.12, -0.34);
  group.add(gunMesh);

  group.traverse((o) => {
    const m = o as THREE.Mesh;
    if (m.isMesh) {
      m.receiveShadow = true;
      // 只有大部件投影（头发/手臂/枪不投影）：减少阴影深度着色器数量与批次，
      // 避免敌人首次出现时为每个材质编译深度着色器造成"卡一下"
      m.castShadow = false;
    }
  });
  torso.castShadow = true;
  head.castShadow = true;
  leftLeg.castShadow = true;
  rightLeg.castShadow = true;

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
  const brick = makeMat({ color: 0x9d8f79, roughness: 0.92 });
  const floorMat = makeMat({ color: 0x3b3730, roughness: 0.95 });
  const ceilMat = makeMat({ color: 0x2a1e15, roughness: 0.9 });
  const wood = makeMat({ color: 0x6b4a2c, roughness: 0.85 });

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
  const sandMat = makeMat({ color: 0x6b6146, roughness: 0.95 });
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

  // 正面掩体箱：敌人只从**玩家正面**的掩体后出现（门口 + 前侧），不再有身后刷新
  const flankCrate = makeMat({ color: 0x5f452c, roughness: 0.88 });
  for (const p of [
    { x: -3.8, z: -2.2 },
    { x: 3.8, z: -1.8 },
  ]) {
    // 高箱：站立的敌人也能完全藏在后面（顶面 1.95m > 敌人头顶 ~1.77m）
    const m = new THREE.Mesh(new THREE.BoxGeometry(1.9, 1.95, 1.5), flankCrate);
    m.position.set(p.x, 0.975, p.z);
    m.castShadow = true;
    m.receiveShadow = true;
    m.userData.isCover = true;
    root.add(m);
    walls.push(m);
  }

  return { root, walls };
}

/** 入口：把 3D 切片挂到指定容器 */
export function mountThreeSlice(container: HTMLElement, hooks: SliceHooks): () => void {
  container.innerHTML = `
    <div class="slice3d">
      <canvas id="c3d"></canvas>
      <div class="s3-hud s3-left">
        <div class="s3-title">3D 试验版 · 垂直切片</div>
        <div class="s3-line">版本 ${BUILD_STAMP}</div>
        <div class="s3-line">鼠标转视角 · WASD 移动 · Ctrl 下蹲</div>
        <div class="s3-line">按住左键连发 · R 换弹 · Esc 退出</div>
        <div class="s3-line">F 全屏 · C 掩体 · F1-F3 画质</div>
        <div class="s3-line s3-perf" id="s3-perf">--</div>
      </div>
      <div class="s3-hud s3-right">
        <div class="s3-line">击杀 <b id="s3-kills">0</b></div>
        <div class="s3-line">命中率 <b id="s3-acc">--</b></div>
        <div class="s3-line">血量 <b id="s3-hp">100</b></div>
      </div>
      <div class="s3-ammo"><span id="s3-ammo">25</span> / 25</div>
      <div class="s3-crosshair"></div>
      <div class="s3-dmg" id="s3-dmg"></div>
      <div class="s3-banner" id="s3-banner"></div>
      <div class="s3-lock-hint hidden" id="s3-lock-hint">点击画面以捕获鼠标（否则无法转视角）</div>
      <div class="s3-overlay" id="s3-overlay">
        <div class="s3-card">
          <h2>3D 垂直切片</h2>
          <p>程序化建模：房间 / 掩体 / 敌人 / 步枪全部由代码几何体生成。点击开始，Esc 退出。</p>
          <div class="s3-cover-toggle">
            <span>玩家掩体</span>
            <button class="btn-ghost btn-sm" id="s3-cover-on">有掩体</button>
            <button class="btn-ghost btn-sm" id="s3-cover-off">空旷场地</button>
          </div>
          <div class="s3-cover-toggle" id="s3-diff-row">
            <span>难度</span>
            ${DIFFICULTIES.map(
              (d) => `<button class="btn-ghost btn-sm" data-diff="${d.id}">${d.name}</button>`,
            ).join('')}
          </div>
          <div class="s3-cover-toggle">
            <span>显示</span>
            <button class="btn-ghost btn-sm" id="s3-fullscreen">全屏（F）</button>
          </div>
          <div class="s3-cover-toggle" id="s3-count-row">
            <span>本局敌人数量</span>
            <button class="btn-ghost btn-sm" data-count="5">5</button>
            <button class="btn-ghost btn-sm" data-count="10">10</button>
            <button class="btn-ghost btn-sm" data-count="20">20</button>
            <button class="btn-ghost btn-sm" data-count="999">不限</button>
          </div>
          <button class="btn-primary btn-lg" id="s3-start" disabled>初始化中…</button>
          <button class="btn-ghost" id="s3-bench">性能自检</button>
          <button class="btn-ghost" id="s3-quit">返回 2D 版</button>
          <div class="s3-bench-out" id="s3-bench-out"></div>
          <div class="s3-lastlog" id="s3-lastlog"></div>
        </div>
      </div>
      <div class="overlay hidden" id="s3-loading">
        <div class="s3-card">
          <h2>正在准备训练</h2>
          <p id="s3-load-step">初始化…</p>
          <div class="s3-progress"><i id="s3-progress-fill"></i></div>
          <p class="s3-line" id="s3-load-pct">0%</p>
        </div>
      </div>
      <div class="overlay hidden" id="s3-result">
        <div class="s3-card">
          <h2>训练成绩</h2>
          <div class="s3-score" id="s3-score"></div>
          <div class="row">
            <button class="btn-primary" id="s3-again">再来一局</button>
            <button class="btn-ghost" id="s3-back">返回设置</button>
          </div>
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
  const dmgLayer = container.querySelector<HTMLElement>('#s3-dmg')!;
  const crosshairEl = container.querySelector<HTMLElement>('.s3-crosshair')!;
  const coverOnBtn = container.querySelector<HTMLButtonElement>('#s3-cover-on')!;
  const coverOffBtn = container.querySelector<HTMLButtonElement>('#s3-cover-off')!;
  const diffRow = container.querySelector<HTMLElement>('#s3-diff-row')!;
  const fullscreenBtn = container.querySelector<HTMLButtonElement>('#s3-fullscreen')!;
  const perfEl = container.querySelector<HTMLElement>('#s3-perf')!;
  const loadingOverlay = container.querySelector<HTMLElement>('#s3-loading')!;
  const loadStepEl = container.querySelector<HTMLElement>('#s3-load-step')!;
  const loadPctEl = container.querySelector<HTMLElement>('#s3-load-pct')!;
  const progressFill = container.querySelector<HTMLElement>('#s3-progress-fill')!;
  const resultOverlay = container.querySelector<HTMLElement>('#s3-result')!;
  const scoreEl = container.querySelector<HTMLElement>('#s3-score')!;
  const againBtn = container.querySelector<HTMLButtonElement>('#s3-again')!;
  const backBtn = container.querySelector<HTMLButtonElement>('#s3-back')!;
  // 注意：这里必须用 id 精确定位——用 :last-of-type 之类的结构选择器一旦失配，
  // 会在挂载阶段抛异常导致整个应用起不来（曾经的真实 Bug）
  const countRow = container.querySelector<HTMLElement>('#s3-count-row');
  const benchBtn = container.querySelector<HTMLButtonElement>('#s3-bench')!;
  const benchOut = container.querySelector<HTMLElement>('#s3-bench-out')!;
  const lastLogEl = container.querySelector<HTMLElement>('#s3-lastlog')!;
  const lockHintEl = container.querySelector<HTMLElement>('#s3-lock-hint')!;
  /**
   * 关键：场景构建需要几百毫秒，如果用户在构建完成前点"点击进入"，这一下会被丢掉
   * （表现就是"点了没反应 / 卡住动不了"，时好时坏）。这里在最开头就记下点击意图，
   * 并在按钮上显示"初始化中…"，构建完成后立即开始。
   */
  const startBtn = container.querySelector<HTMLButtonElement>('#s3-start')!;
  let startRequested = false;
  startBtn.disabled = true;
  startBtn.textContent = '初始化中…';
  startBtn.addEventListener('click', () => {
    startRequested = true;
  });
  /** 敌人池是否已加载（决定"点击进入"是走加载流程还是直接开始） */
  let sessionReady = false;
  // 事件日志：先占位再实现——因为在场景构建阶段（resetEnemy 初始化）就会调用 logEvent，
  // 若直接用 const/let 在后面声明会触发 TDZ 异常，导致挂载中断（这是踩过的坑）
  let eventLog: string[] = [];
  let logEvent: (msg: string) => void = () => {};
  /**
   * 请求鼠标指针锁定（必须在用户手势内同步调用）。
   * 关键：**失败只提示、绝不抛异常**——一旦抛出会打断 start() 流程，
   * 加载不执行、鼠标锁不上，表现就是"点击进入后动不了"（真实踩过的坑）。
   */
  const tryLock = (): void => {
    try {
      const p = canvas.requestPointerLock() as unknown as Promise<void> | undefined;
      if (p && typeof p.catch === 'function') p.catch(() => undefined);
    } catch {
      // 忽略：点击画面会重试
    }
  };

  /** 本局敌人数量（玩家开局前可选），999 = 不限 */
  let sessionTarget = Number(localStorage.getItem('jg.slice3d.count') ?? '10') || 10;
  const refreshCountButtons = (): void => {
    container.querySelectorAll<HTMLButtonElement>('[data-count]').forEach((b) => {
      b.classList.toggle('btn-primary', Number(b.dataset.count) === sessionTarget);
    });
  };
  refreshCountButtons();
  countRow?.querySelectorAll<HTMLButtonElement>('[data-count]').forEach((b) => {
    b.addEventListener('click', () => {
      sessionTarget = Number(b.dataset.count) ?? 10;
      localStorage.setItem('jg.slice3d.count', String(sessionTarget));
      refreshCountButtons();
    });
  });

  /* ---------------- 画质档位（性能开关） ----------------
   * 高：像素比 ≤1.5 + 阴影 1024
   * 中：像素比 ≤1.25 + 阴影 512
   * 低：像素比 1 + 关阴影 + 关一盏点光（帧率优先）
   * 自动：进入后采样 3 秒，平均帧率 <45 自动降到"低" */
  type QualityLevel = 'high' | 'medium' | 'low';
  // 默认"中"：无阴影 + Lambert 材质 + 像素预算，保证弱显卡也能跑起来
  const storedQuality = localStorage.getItem('jg.slice3d.quality');
  let qualityLevel: QualityLevel =
    storedQuality === 'high' || storedQuality === 'medium' || storedQuality === 'low' ? storedQuality : 'medium';
  /** 最大渲染像素数：不随屏幕变大而爆炸（弱显卡的关键保护） */
  const PIXEL_BUDGET: Record<QualityLevel, number> = { high: 2_100_000, medium: 1_000_000, low: 520_000 };
  // 材质档位在建场景前决定：只有高画质用 PBR(Standard)，其余用 Lambert
  useStandardMaterials = qualityLevel === 'high';
  /** 首次进入（没有存过画质）时启用自动降档 */
  let autoQuality = storedQuality === null;

  /* ---------------- 难度（需求①：影响战术丰富度） ---------------- */
  const DIFF_KEY = 'jg.slice3d.diff';
  let sliceDiff = localStorage.getItem(DIFF_KEY) ?? 'normal';
  const tactics = () =>
    TACTICS[sliceDiff] ?? TACTICS.normal;
  const refreshDiffButtons = (): void => {
    diffRow.querySelectorAll<HTMLButtonElement>('[data-diff]').forEach((b) => {
      b.classList.toggle('btn-primary', b.dataset.diff === sliceDiff);
    });
  };
  refreshDiffButtons();
  diffRow.querySelectorAll<HTMLButtonElement>('[data-diff]').forEach((b) => {
    b.addEventListener('click', () => {
      sliceDiff = b.dataset.diff ?? 'normal';
      localStorage.setItem(DIFF_KEY, sliceDiff);
      refreshDiffButtons();
      showBanner(`难度：${DIFFICULTIES.find((d) => d.id === sliceDiff)?.name ?? sliceDiff}`);
    });
  });

  /* ---------------- Three.js 初始化 ---------------- */
  // 抗锯齿（MSAA）在弱显卡/软件渲染路径上非常贵：只有高画质才开
  // powerPreference 请求独显（双显卡笔记本默认可能用核显，这是"配置很好却卡"的常见元凶）
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: qualityLevel === 'high',
  });
  // —— 真实渲染器诊断：浏览器到底用的是显卡，还是 CPU 软件光栅化 ——
  // （核显/软件渲染是"配置很好却卡"的头号元凶，HUD 会把它显出来）
  const glCtx = renderer.getContext();
  const dbgInfo = glCtx.getExtension('WEBGL_debug_renderer_info');
  const gpuName = String(
    dbgInfo ? glCtx.getParameter(dbgInfo.UNMASKED_RENDERER_WEBGL) : glCtx.getParameter(glCtx.RENDERER),
  );
  const gpuIsSoftware = /swiftshader|software|basic render|llvmpipe|microsoft basic/i.test(gpuName);

  // 性能关键点①：像素比。高 DPI 屏上 2× 像素比 = 4 倍像素填充，是"卡"的头号原因
  renderer.setPixelRatio(1);
  // 阴影在初始化时一次决定：运行中切换会触发全材质着色器重编译（表现为"画面卡住"）
  renderer.shadowMap.enabled = qualityLevel === 'high';
  // 性能关键点②：PCFSoft 是最贵的阴影过滤，改成 PCF
  renderer.shadowMap.type = THREE.PCFShadowMap;

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
  sun.castShadow = qualityLevel === 'high';
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

  /* ---------------- 实体碰撞（掩体/墙体：挡人 + 挡子弹） ----------------
   * 从场景真实网格计算 AABB，玩家与敌人都用同一套碰撞盒做 XZ 平面推挤，
   * 子弹则在 room.walls 上做射线（掩体是实体，打上去留弹孔）。 */
  let colliders: THREE.Box3[] = [];
  const rebuildColliders = (): void => {
    colliders = room.walls.map((m) => new THREE.Box3().setFromObject(m));
  };
  /** 把圆柱体（半径 radius）推出所有碰撞盒；返回累计推出向量（供"沿面滑动"使用） */
  const resolveXZ = (pos: THREE.Vector3, radius: number): THREE.Vector3 => {
    const pushAccum = new THREE.Vector3();
    for (const box of colliders) {
      // 只考虑与身体高度重叠的碰撞盒：
      // 否则门楣（2.3~3.2m 高）会把门洞"封死"，敌人被卡在门口出不来
      if (box.min.y > CONFIG.eyeHeight + 0.15 || box.max.y < 0.05) continue;
      const cx = Math.max(box.min.x, Math.min(pos.x, box.max.x));
      const cz = Math.max(box.min.z, Math.min(pos.z, box.max.z));
      const dx = pos.x - cx;
      const dz = pos.z - cz;
      const d2 = dx * dx + dz * dz;
      if (d2 > radius * radius) continue;
      if (d2 > 1e-6) {
        const d = Math.sqrt(d2);
        const k = (radius - d) / d;
        pos.x += dx * k;
        pos.z += dz * k;
        pushAccum.x += dx * k;
        pushAccum.z += dz * k;
      } else {
        // 圆心已在盒内：沿最小穿透轴推出
        const toMinX = pos.x - box.min.x;
        const toMaxX = box.max.x - pos.x;
        const toMinZ = pos.z - box.min.z;
        const toMaxZ = box.max.z - pos.z;
        const minPen = Math.min(toMinX, toMaxX, toMinZ, toMaxZ);
        if (minPen === toMinX) {
          pushAccum.x -= box.min.x - radius - pos.x;
          pos.x = box.min.x - radius;
        } else if (minPen === toMaxX) {
          pushAccum.x += box.max.x + radius - pos.x;
          pos.x = box.max.x + radius;
        } else if (minPen === toMinZ) {
          pushAccum.z -= box.min.z - radius - pos.z;
          pos.z = box.min.z - radius;
        } else {
          pushAccum.z += box.max.z + radius - pos.z;
          pos.z = box.max.z + radius;
        }
      }
    }
    return pushAccum;
  };
  /** 找到离给定点最近的掩体碰撞盒（用于把刷新点放到掩体背面外侧） */
  const nearestCollider = (x: number, z: number): THREE.Box3 | null => {
    let best: THREE.Box3 | null = null;
    let bestD = 4;
    for (const b of colliders) {
      const c = b.getCenter(new THREE.Vector3());
      const d = Math.hypot(c.x - x, c.z - z);
      if (d < bestD) {
        bestD = d;
        best = b;
      }
    }
    return best;
  };
  /** 把点沿"远离玩家"方向外推，直到离开掩体碰撞盒并留出一个身位半径 */
  const pushBehindCover = (x: number, z: number, radius: number): THREE.Vector3 => {
    const box = nearestCollider(x, z);
    const p = new THREE.Vector3(x, 0, z);
    if (!box) return p;
    const away = new THREE.Vector3(x - camera.position.x, 0, z - camera.position.z);
    if (away.lengthSq() < 1e-4) away.set(0, 0, 1);
    away.normalize();
    for (let i = 0; i < 60; i++) {
      const inside =
        p.x > box.min.x - radius &&
        p.x < box.max.x + radius &&
        p.z > box.min.z - radius &&
        p.z < box.max.z + radius;
      if (!inside) break;
      p.addScaledVector(away, 0.08);
    }
    return p;
  };

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
      const mat = makeMat({ color: 0x8a8172, roughness: 0.92 });
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
    rebuildColliders(); // 掩体是实体：增删后同步碰撞盒
  };
  applyCoverSetting();

  /** 敌人视线判定：从敌人眼睛到玩家相机，被玩家掩体挡住则返回 false */
  const losRay = new THREE.Raycaster();
  const enemyHasLineOfSight = (): boolean => {
    if (playerCoverMeshes.length === 0) return true;
    const from = _v1.set(enemy.group.position.x, 1.5, enemy.group.position.z);
    const dir = _v2.copy(camera.position).sub(from);
    const dist = dir.length();
    losRay.set(from, dir.normalize());
    losRay.far = dist;
    return losRay.intersectObjects(playerCoverMeshes, false).length === 0;
  };

  // 复用的临时向量：避免每帧 new 出一堆 Vector3（减少 GC 抖动/卡顿）
  const _v1 = new THREE.Vector3();
  const _v2 = new THREE.Vector3();
  const _v3 = new THREE.Vector3();
  const _v4 = new THREE.Vector3();

  /* ---------------- 敌人移动模型（更正版） ----------------
   * 目标不是"走向玩家"，而是**把枪线挪到玩家身上**：
   *   · 以掩体为支点做横向侧步，找到"能看到玩家"的位置
   *   · 全程身体与枪口朝玩家（不是朝移动方向）
   *   · 撞到实体沿面滑动，卡住则换下一个候选枪线位 */
  const enemyLineClear = (x: number, z: number): boolean => {
    const from = _v1.set(x, 1.5, z);
    const dir = _v2.copy(camera.position).sub(from);
    const dd = dir.length();
    losRay.set(from, dir.normalize());
    losRay.far = dd;
    return losRay.intersectObjects(room.walls, false).length === 0;
  };
  const facePlayer = (): void => {
    const g = enemy.group;
    const dx = camera.position.x - g.position.x;
    const dz = camera.position.z - g.position.z;
    if (Math.hypot(dx, dz) < 0.05) return;
    g.rotation.y = Math.atan2(dx, dz) + Math.PI;
  };
  /** 走向某点：带碰撞滑动；返回是否已到达。全程朝玩家 + 走路动画 */
  const moveEnemyTo = (target: THREE.Vector3, speed: number, dt: number): boolean => {
    const g = enemy.group;
    const dir = _v1.set(target.x - g.position.x, 0, target.z - g.position.z);
    const dist = dir.length();
    if (dist < 0.15) return true;
    dir.normalize();
    g.position.addScaledVector(dir, speed * dt);
    const push = resolveXZ(g.position, 0.4);
    if (push.lengthSq() > 1e-6) {
      const n = _v2.copy(push).normalize();
      const tang = _v3.copy(dir).sub(_v4.copy(n).multiplyScalar(dir.dot(n)));
      if (tang.lengthSq() > 1e-6) g.position.addScaledVector(tang.normalize(), speed * dt * 0.85);
    }
    facePlayer();
    enemyAI.walkPhase += dt * 7;
    const swing = Math.sin(enemyAI.walkPhase) * 0.5;
    enemy.leftLeg.rotation.x = swing;
    enemy.rightLeg.rotation.x = -swing;
    enemy.leftArm.rotation.x = -swing * 0.5;
    enemy.rightArm.rotation.x = swing * 0.5;
    if (!enemyAI.crouch && g.scale.y < 1) {
      g.scale.y = Math.min(1, g.scale.y + dt * 2.2);
      g.position.y = -0.06 * (1 - g.scale.y) / 0.14;
    }
    return false;
  };
  /** 找"枪线位"：沿掩体两侧横移取样，挑能看见玩家且横移最短的点 */
  const findFiringSpot = (): THREE.Vector3 => {
    const g = enemy.group;
    const box = nearestCollider(g.position.x, g.position.z);
    const base = box ? box.getCenter(new THREE.Vector3()) : g.position.clone();
    const halfX = box ? (box.max.x - box.min.x) / 2 : 0.6;
    const candidates: THREE.Vector3[] = [];
    for (const sx of [-1, 1]) {
      for (const d of [0.7, 1.2, 1.8]) {
        candidates.push(new THREE.Vector3(base.x + sx * (halfX + d), 0, g.position.z));
      }
    }
    // 允许向玩家方向少量探出（≤1m），但绝不贴身
    const toward = new THREE.Vector3(
      camera.position.x - g.position.x,
      0,
      camera.position.z - g.position.z,
    ).normalize();
    candidates.push(g.position.clone().addScaledVector(toward, 1.0));
    const usable = candidates.filter(
      (c) =>
        enemyLineClear(c.x, c.z) &&
        resolveXZ(c.clone(), 0.42).lengthSq() < 1e-6 &&
        !enemyAI.badSpots.some((b) => b.distanceTo(c) < 0.7),
    );
    const pool = usable.length > 0 ? usable : candidates;
    pool.sort((a, b) => a.distanceTo(g.position) - b.distanceTo(g.position));
    return pool[0];
  };

  /* -------- 需求①：刷新必须在玩家视线之外（被掩体挡住）且离玩家足够远 -------- */
  const spawnRay = new THREE.Raycaster();
  /**
   * 玩家能否看到该点（需求①核心：**必须是掩体/墙实体挡住**才允许刷新）
   * 只用遮挡判定：从玩家眼睛（真实相机高度，蹲下更低）向该点打多条射线，
   * 只要有任意一条不被挡，就说明玩家能直接看到 → 该点不能用来刷新。
   */
  const isVisibleFromPlayer = (pos: THREE.Vector3): boolean => {
    const target = new THREE.Vector3(pos.x, CONFIG.spawn.headHeight, pos.z);
    const eye = camera.position.clone();
    const samples = [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0.35, 0, 0),
      new THREE.Vector3(-0.35, 0, 0),
      new THREE.Vector3(0, 0.2, 0),
    ];
    for (const off of samples) {
      const from = eye.clone().add(off);
      const d = target.clone().sub(from);
      const dd = d.length();
      spawnRay.set(from, d.normalize());
      spawnRay.far = dd;
      if (spawnRay.intersectObjects(room.walls, false).length === 0) return true;
    }
    return false;
  };
  /** 挑选合法刷新点：视线外 + 距离 ≥ 4 米；都不满足时退化为最远的掩体点 */
  const pickSpawnPoint = (): { x: number; z: number; id: string; fallback: boolean } => {
    const px = camera.position.x;
    const pz = camera.position.z;
    const valid = CONFIG.covers.filter((c) => {
      // 硬性规则：只在玩家**正面**刷新（至少 1.5m 在前方），杜绝"从背后冒出来"
      if (c.z > pz - 1.5) return false;
      if (Math.hypot(c.x - px, c.z - pz) < CONFIG.spawn.minDistance) return false;
      return !isVisibleFromPlayer(new THREE.Vector3(c.x, 0, c.z));
    });
    // 兜底：若没有任何点通过严格遮挡测试，就固定用"背墙后的门后点"——
    // 墙是通高的，任何站姿/蹲姿都挡得住，绝不会刷在玩家眼前
    const behindWall = CONFIG.covers.filter((c) => c.z < -6.4);
    const pool = valid.length > 0 ? valid : behindWall;
    const pick = pool[Math.floor(Math.random() * pool.length)];
    return { ...pick, fallback: valid.length === 0 };
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
  // 敌人实例池：开局前就把 N 个敌人建好并预热（避免运行中新建对象/现场编译着色器）
  let enemy = buildEnemy();
  scene.add(enemy.group);
  const enemyPool: ReturnType<typeof buildEnemy>[] = [enemy];
  let enemyPoolIndex = 0;

  /** 受击闪红：Standard 与 Lambert 材质都支持 emissive，这里统一安全处理 */
  const flashEnemyMats = (hex: number): void => {
    for (const m of enemy.materials) {
      const emissive = (m as THREE.MeshStandardMaterial).emissive;
      if (emissive) emissive.setHex(hex);
    }
  };

  type EnemyState = 'hidden' | 'feinting' | 'walking' | 'aiming' | 'dead';
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
    speedJitter: 1,
    strafeShoot: false,
    strafeDir: 1,
    strafeSeconds: 0,
    canChangeCover: false,
    feintPlan: false,
    feintPhase: 0,
    feintPos: new THREE.Vector3(),
    coverPos: new THREE.Vector3(),
    waypoint: null as THREE.Vector3 | null,
    path: [] as THREE.Vector3[],
    firingSpot: null as THREE.Vector3 | null,
    badSpots: [] as THREE.Vector3[],
    stallT: 0,
    counters: { feints: 0, coverChanges: 0 },
    dieProgress: 0,
    walkPhase: 0,
  };
  /** 最近一次刷新的合法性（供自动化验证读取） */
  let lastSpawn = {
    seq: 0,
    visible: true,
    distance: 0,
    cover: '',
    difficulty: 'normal',
    fallback: false,
    cameraY: 0,
    x: 0,
    z: 0,
  };

  /** 让敌人从门后出现在门内（隐藏 → 走出门洞） */
  const resetEnemy = (): void => {
    // 从预热好的池里轮换取下一个敌人（运行时不再新建对象）
    if (enemyPool.length > 1) {
      enemyPoolIndex = (enemyPoolIndex + 1) % enemyPool.length;
      enemy = enemyPool[enemyPoolIndex];
      for (const e of enemyPool) if (e !== enemy) e.group.visible = false;
    }
    const t = tactics();
    // 需求①：只在视线之外、且离玩家 ≥4 米的位置刷新
    const cover = pickSpawnPoint();
    const offset = t.peek[0] + Math.random() * Math.max(0, t.peek[1] - t.peek[0]);
    const side = Math.random() < 0.5 ? -1 : 1;
    enemyAI.state = 'hidden';
    enemyAI.hp = DAMAGE.maxHp;
    enemyAI.timer = 0.6 + Math.random() * 1.6; // 出现前的随机等待
    enemyAI.coverName = cover.id;
    logEvent(`敌人刷新：${cover.id}（难度 ${sliceDiff}）`);
    enemyAI.crouch = Math.random() < t.crouch;
    enemyAI.speedJitter = 1 + (Math.random() * 2 - 1) * t.jitter;
    enemyAI.strafeShoot = t.strafeShoot;
    enemyAI.canChangeCover = t.coverChange;
    enemyAI.strafeSeconds = 0;
    // 高难度：先做一次假动作（小身位探一下再缩回），才真正拉出
    enemyAI.feintPlan = t.feint && Math.random() < 0.65;
    enemyAI.feintPhase = 0;
    enemyAI.aimPose = 0;
    enemyAI.blocked = 0;
    // 需求①：把刷新点放到"掩体背面外侧"（基于真实碰撞盒外推，保证站在掩体后且不穿模）
    const behind = pushBehindCover(cover.x, cover.z, 0.42);
    const spawnX = behind.x;
    const spawnZ = behind.z;
    // 从掩体后拉出：横向一个身位 + 朝玩家方向走出一段
    enemyAI.coverPos.set(spawnX, 0, spawnZ);
    // 拉出方向：永远朝玩家一侧（避免从掩体后往更远处跑）
    const toward = Math.sign(camera.position.z - spawnZ) || 1;
    enemyAI.peekTargetX = cover.x + side * offset;
    enemyAI.peekPos.set(enemyAI.peekTargetX, 0, cover.z + toward * (0.9 + Math.random() * 0.8));
    enemyAI.feintPos.set(cover.x + side * 0.35, 0, cover.z + toward * 0.35);
    // 门后刷新：先穿过门洞再拉出（否则会穿墙）
    // 路径规划（关键修复：不能直线穿掩体，否则会被碰撞卡死）
    //  - 门后刷新：先走到门洞中线，再出门口拉出
    //  - 其他掩体：先横移到掩体侧面边缘，再从侧面走出来（也正好是"横拉出掩体"的观感）
    const path: THREE.Vector3[] = [];
    if (cover.z < -6.4) {
      path.push(new THREE.Vector3(0, 0, -6.0));
    } else {
      const box = nearestCollider(spawnX, spawnZ);
      if (box) {
        const c = box.getCenter(new THREE.Vector3());
        const halfX = (box.max.x - box.min.x) / 2;
        const edgeSign = Math.sign(enemyAI.peekTargetX - c.x) || 1;
        const edgeX = c.x + edgeSign * (halfX + 0.55);
        path.push(new THREE.Vector3(edgeX, 0, c.z)); // 侧移到掩体边缘
        path.push(new THREE.Vector3(edgeX, 0, enemyAI.peekPos.z)); // 从边缘侧步出来
      }
    }
    enemyAI.path = path;
    enemyAI.firingSpot = null;
    enemyAI.badSpots = [];
    enemyAI.stallT = 0;
    enemyAI.dieProgress = 0;
    enemy.group.visible = true;
    enemy.group.position.set(spawnX, 0, spawnZ);
    // 保险：刷新瞬间先"蹲在掩体后"（头部降到约 1.4m，被掩体完全挡住），拉出时才起身
    enemy.group.scale.set(1, 0.86, 1);
    enemy.group.position.y = -0.06;
    lastSpawn = {
      seq: lastSpawn.seq + 1,
      visible: isVisibleFromPlayer(new THREE.Vector3(spawnX, 0, spawnZ)),
      distance: +Math.hypot(spawnX - camera.position.x, spawnZ - camera.position.z).toFixed(2),
      cover: cover.id,
      difficulty: sliceDiff,
      fallback: cover.fallback,
      cameraY: +camera.position.y.toFixed(2),
      x: +spawnX.toFixed(2),
      z: +spawnZ.toFixed(2),
    };
    enemy.group.rotation.set(0, 0, 0);
    enemy.leftArm.rotation.set(0, 0, 0);
    enemy.rightArm.rotation.set(0, 0, 0);
    enemy.leftLeg.rotation.set(0, 0, 0);
    enemy.rightLeg.rotation.set(0, 0, 0);
    flashEnemyMats(0x000000);
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
    perf: () => ({
      fps: +(perfFrames / Math.max(0.001, perfAccum)).toFixed(1),
      quality: qualityLevel,
      dpr: renderer.getPixelRatio(),
      calls: renderer.info.render.calls,
      triangles: renderer.info.render.triangles,
      shadows: renderer.shadowMap.enabled,
      buffer: [renderer.domElement.width, renderer.domElement.height],
      longFrames,
      maxFrameMs: +maxFrameMs.toFixed(1),
      loopError,
      recoveries,
      gpu: gpuName,
      gpuSoftware: gpuIsSoftware,
      antialias: qualityLevel === 'high',
    }),
    resetMaxFrame: () => {
      maxFrameMs = 0;
      longFrames = 0;
    },
    /** 测试钩子：模拟"循环冻结"，用于验证看门狗能自动恢复 */
    forceStall: () => {
      lastLoopTick = performance.now() - 9999;
    },
    setQuality: (q: 'high' | 'medium' | 'low') => {
      autoQuality = false;
      applyQuality(q);
    },
    reloadState: () => ({ reloading, magY: +magPart.position.y.toFixed(3), chargeZ: +chargingPart.position.z.toFixed(3) }),
    coverState: () => ({
      on: coverState.on,
      count: playerCoverMeshes.length,
      los: enemyHasLineOfSight(),
      blocked: +enemyAI.blocked.toFixed(2),
    }),
    deaths: () => stats.deaths,
    kills: () => stats.kills,
    poolSize: () => enemyPool.length,
    /** 测试钩子：走与爆头击杀完全相同的结算链路（用于验证"打满即出成绩"） */
    forceKill: () => {
      if (enemyAI.state === 'dead') return;
      enemyAI.hp = 0;
      enemyAI.state = 'dead';
      stats.kills++;
      headshotCount++;
      if (currentEncounter?.appearAt) reactionSamples.push(performance.now() - currentEncounter.appearAt);
      killsEl.textContent = String(stats.kills);
      closeEncounter(true);
      if (sessionTarget < 999 && stats.kills >= sessionTarget) endSession();
    },
    decals: () => decals.length,
    /** 穿模自检：敌人中心是否嵌入任何实体碰撞盒（半径 0.4 的 60% 容差） */
    enemyClipCheck: () => {
      const g = enemy.group.position;
      for (const b of colliders) {
        if (b.min.y > CONFIG.eyeHeight + 0.15 || b.max.y < 0.05) continue;
        const cx = Math.max(b.min.x, Math.min(g.x, b.max.x));
        const cz = Math.max(b.min.z, Math.min(g.z, b.max.z));
        if ((g.x - cx) ** 2 + (g.z - cz) ** 2 < (0.4 * 0.6) ** 2) return true;
      }
      return false;
    },
    enemyInfo: () => {
      const g = enemy.group;
      const dx = camera.position.x - g.position.x;
      const dz = camera.position.z - g.position.z;
      const dist = Math.hypot(dx, dz);
      // 朝向玩家程度：模型正面为本地 -Z
      const fwdX = -Math.sin(g.rotation.y);
      const fwdZ = -Math.cos(g.rotation.y);
      const facing = dist > 0.05 ? (fwdX * (dx / dist) + fwdZ * (dz / dist)) : 1;
      return {
        state: enemyAI.state,
        x: +g.position.x.toFixed(2),
        z: +g.position.z.toFixed(2),
        distance: +dist.toFixed(2),
        facingPlayer: +facing.toFixed(2),
        lineClear: enemyLineClear(g.position.x, g.position.z),
      };
    },
    probe: (x: number, y: number, z: number) => {
      const from = camera.position.clone();
      const target = new THREE.Vector3(x, y, z);
      const d = target.clone().sub(from);
      const dd = d.length();
      spawnRay.set(from, d.normalize());
      spawnRay.far = dd;
      const hits = spawnRay.intersectObjects(room.walls, false);
      return {
        wallCount: room.walls.length,
        hitCount: hits.length,
        firstHit: hits[0] ? { dist: +hits[0].distance.toFixed(2), far: +dd.toFixed(2) } : null,
      };
    },
    spawnInfo: () => ({ ...lastSpawn, counters: { ...enemyAI.counters }, strafeSeconds: +enemyAI.strafeSeconds.toFixed(1) }),
    setDifficulty: (id: string) => {
      sliceDiff = id;
      localStorage.setItem(DIFF_KEY, id);
      refreshDiffButtons();
    },
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
  let perfFrames = 0;
  let perfAccum = 0;
  const autoSamples: number[] = [];
  let loopError = '';
  let longFrames = 0;
  let maxFrameMs = 0;
  /** 本局是否已结算（结算后停止生成敌人） */
  let sessionOver = false;
  /** 性能自检模式：收集每帧耗时（毫秒） */
  let benchMode = false;
  let benchSamples: number[] = [];
  /** 看门狗：记录最后一次真实渲染的时刻（用于检测"冻结"并自动恢复） */
  let lastLoopTick = performance.now();
  let recoveries = Number(localStorage.getItem('jg.slice3d.recoveries') ?? '0') || 0;
  let recovering = false;
  /**
   * 事件日志：记录"冻结前最后做了什么"。
   * 每次关键动作都写进 localStorage，下次打开（尤其是自动恢复重载后）就能看到触发点。
   */
  eventLog = (() => {
    try {
      const raw = localStorage.getItem('jg.slice3d.eventLog');
      const arr = raw ? (JSON.parse(raw) as string[]) : [];
      return Array.isArray(arr) ? arr.slice(-8) : [];
    } catch {
      return [];
    }
  })();
  logEvent = (msg: string): void => {
    eventLog.push(`${new Date().toLocaleTimeString('zh-CN')} ${msg}`);
    if (eventLog.length > 8) eventLog.shift();
    try {
      localStorage.setItem('jg.slice3d.eventLog', JSON.stringify(eventLog));
    } catch {
      // 忽略存储异常
    }
  };
  // 上次是否是"自动恢复"重载？把触发点显示出来
  try {
    const lastRec = localStorage.getItem('jg.slice3d.lastRecovery');
    if (lastRec) {
      lastLogEl.innerHTML =
        `<b>上次运行疑似冻结</b>：${lastRec}<br>` +
        `恢复次数：${recoveries}<br>` +
        `冻结前最后动作：<br>${eventLog.map((l) => `· ${l}`).join('<br>') || '（无记录）'}`;
      localStorage.removeItem('jg.slice3d.lastRecovery');
    } else {
      lastLogEl.textContent = '';
    }
  } catch {
    // 忽略
  }

  const stats = { shots: 0, hits: 0, kills: 0, deaths: 0, startedEpoch: Date.now(), startedPerf: performance.now() };
  // 本局统计（用于结算成绩）
  let headshotCount = 0;
  const reactionSamples: number[] = [];
  let sessionStartAt = performance.now();
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
  // 复用同一份几何体：避免每次命中都新建 GPU 缓冲（会造成命中瞬间卡顿）
  const sparkGeo = new THREE.SphereGeometry(0.012, 5, 4);

  const raycaster = new THREE.Raycaster();

  const spawnSparks = (
    point: THREE.Vector3,
    normal: THREE.Vector3,
    count: number,
    mat: THREE.Material = sparkMat,
  ): void => {
    for (let i = 0; i < count; i++) {
      const m = new THREE.Mesh(sparkGeo, mat);
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
        flashEnemyMats(0x551111);
        window.setTimeout(() => flashEnemyMats(0x000000), 110);
        spawnSparks(hits[0].point, hits[0].face?.normal ?? new THREE.Vector3(0, 1, 0), 6, bloodMat);
        if (zone === 'head') sfx.headshot();
        else sfx.hit();
        if (enemyAI.hp <= 0) {
          enemyAI.state = 'dead';
          stats.kills++;
          logEvent(`击杀 #${stats.kills}`);
          if (zone === 'head') headshotCount++;
          if (currentEncounter?.appearAt) reactionSamples.push(now - currentEncounter.appearAt);
          killsEl.textContent = String(stats.kills);
          sfx.killConfirm(stats.kills);
          showBanner(zone === 'head' ? '爆头击杀' : `击杀（${enemyAI.hp === 0 ? '身体' : ''}）`);
          spawnSparks(hits[0].point, hits[0].face?.normal ?? new THREE.Vector3(0, 1, 0), 14, bloodMat);
          closeEncounter(true);
          // 达成本局目标 → 出成绩
          if (sessionTarget < 999 && stats.kills >= sessionTarget) endSession();
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
    // 吃掉浏览器默认行为（F1 帮助页之类）
    if (['KeyP', 'KeyC', 'KeyR', 'KeyF', 'Tab'].includes(e.code)) e.preventDefault();
    if (e.code === 'KeyR') startReload();
    // F：网页内全屏（浏览器全屏 API，作用于 3D 容器）
    if (e.code === 'KeyF') void toggleFullscreen();
    // P：循环切换画质（低 → 中 → 高）。不用 F1-F3，避免与浏览器快捷键冲突
    if (e.code === 'KeyP') {
      autoQuality = false;
      const next: QualityLevel = qualityLevel === 'low' ? 'medium' : qualityLevel === 'medium' ? 'high' : 'low';
      applyQuality(next);
      showBanner(`画质：${next === 'low' ? '低（540p 级）' : next === 'medium' ? '中（100 万像素）' : '高（含阴影，需刷新页面生效）'}`);
    }
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
    // 关键：按"最大像素预算"决定渲染分辨率缩放——屏幕再大也不会把显卡压垮
    const budget = PIXEL_BUDGET[qualityLevel];
    const ideal = Math.sqrt(budget / Math.max(1, w * h));
    const scale = Math.max(0.5, Math.min(window.devicePixelRatio, ideal));
    renderer.setPixelRatio(scale);
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  const fsRoot = container.querySelector<HTMLElement>('.slice3d') ?? container;
  /** 网页内全屏：对整个 3D 容器调用全屏 API（不依赖浏览器菜单） */
  const toggleFullscreen = async (): Promise<void> => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await fsRoot.requestFullscreen();
      }
    } catch {
      showBanner('当前环境不支持全屏');
    }
  };
  window.addEventListener('resize', resize);
  document.addEventListener('fullscreenchange', resize);
  // WebGL 上下文丢失（显存/驱动问题会让画面彻底停住）：捕获并提示
  canvas.addEventListener('webglcontextlost', (e) => {
    e.preventDefault();
    loopError = 'WebGL 上下文丢失（显存或驱动问题）';
    recover('图形上下文丢失');
  });
  canvas.addEventListener('webglcontextrestored', () => {
    loopError = '';
  });

  /**
   * 自动恢复：显卡驱动挂起 / 上下文丢失 / 循环停摆时，浏览器会彻底冻住且无法自救。
   * 这里统一走"提示 + 自动重载"，把"永久卡死"变成"最多两秒恢复"。
   */
  const recover = (reason: string): void => {
    if (recovering) return;
    recovering = true;
    recoveries++;
    localStorage.setItem('jg.slice3d.recoveries', String(recoveries));
    try {
      localStorage.setItem(
        'jg.slice3d.lastRecovery',
        `${reason} · ${new Date().toLocaleString('zh-CN')}`,
      );
    } catch {
      // 忽略
    }
    try {
      showBanner(`${reason}，正在自动恢复…`);
    } catch {
      // 极端情况下 DOM 不可用也无妨，重载即可
    }
    window.setTimeout(() => window.location.reload(), 900);
  };

  /**
   * 看门狗：每 1 秒检查一次"最后一帧"距今多久。
   * 超过 2.5 秒没有任何一帧 → 判定冻结并自动恢复（这是"卡住就无法恢复"的根治手段）。
   */
  const watchdog = window.setInterval(() => {
    if (recovering || !running) return;
    if (performance.now() - lastLoopTick > 2500) recover('检测到画面冻结');
  }, 1000);
  void watchdog;
  // 容器尺寸变化也同步（例如进入全屏、布局变化）
  const ro = new ResizeObserver(() => resize());
  ro.observe(container);
  resize();

  /** 预编译：把场景里所有材质的着色器（含阴影深度材质）提前编译好，
   *  否则敌人首次出现/首次投影时会现场编译 → 明显的"卡一下" */
  const warmUp = (): void => {
    try {
      renderer.compile(scene, camera);
      renderer.render(scene, camera); // 跑一帧把阴影贴图与程序都预热
    } catch {
      // 预热失败不影响运行
    }
  };
  warmUp();

  /** 应用画质档位（改像素比/阴影/灯光强度，并立即重算画布尺寸） */
  const applyQuality = (level: QualityLevel): void => {
    qualityLevel = level;
    logEvent(`画质 → ${level}`);
    localStorage.setItem('jg.slice3d.quality', level);
    doorLight.intensity = level === 'low' ? 3 : 6;
    // 运行时只改"渲染分辨率"——阴影/材质档位需要刷新页面才生效（避免着色器重编译卡顿）
    resize();
  };
  applyQuality(qualityLevel);

  /** 一帧之后继续（让加载进度条能刷新出来，不阻塞界面） */
  const nextFrame = (): Promise<void> =>
    new Promise((resolve) => requestAnimationFrame(() => resolve()));
  const setProgress = (p: number, text: string): void => {
    const pct = Math.round(Math.max(0, Math.min(1, p)) * 100);
    progressFill.style.width = `${pct}%`;
    loadPctEl.textContent = `${pct}%`;
    loadStepEl.textContent = text;
  };

  /**
   * 开局前加载：建满敌人池 → 逐个放到镜头前渲染（编译彩色/阴影深度着色器）
   * → 预热命中特效。做完这些，运行中就不会再出现"现建对象/现场编译"的卡顿。
   */
  const loadSession = async (count: number): Promise<void> => {
    while (enemyPool.length < count) {
      const e = buildEnemy();
      e.group.visible = false;
      scene.add(e.group);
      enemyPool.push(e);
      setProgress((enemyPool.length / count) * 0.55, `构建敌人模型 ${enemyPool.length}/${count}`);
      if (enemyPool.length % 3 === 0) await nextFrame();
    }
    for (let i = 0; i < enemyPool.length; i++) {
      const e = enemyPool[i];
      e.group.visible = true;
      e.group.position.set(0, 0, camera.position.z - 3.5);
      renderer.render(scene, camera);
      e.group.visible = false;
      e.group.position.set(0, 0, 0);
      setProgress(0.55 + (i / Math.max(1, enemyPool.length)) * 0.35, `预编译着色器 ${i + 1}/${enemyPool.length}`);
      await nextFrame();
    }
    setProgress(0.93, '预热命中特效…');
    await nextFrame();
    for (let i = 0; i < 6; i++) {
      const spark = new THREE.Mesh(sparkGeo, bloodMat);
      spark.position.set(0, 1.2, camera.position.z - 3);
      scene.add(spark);
      renderer.render(scene, camera);
      scene.remove(spark);
    }
    setProgress(1, '准备完成');
    await nextFrame();
  };

  /** 重置本局统计 */
  const resetSessionStats = (): void => {
    stats.shots = 0;
    stats.hits = 0;
    stats.kills = 0;
    stats.deaths = 0;
    stats.startedEpoch = Date.now();
    stats.startedPerf = performance.now();
    headshotCount = 0;
    reactionSamples.length = 0;
    sessionStartAt = performance.now();
    killsEl.textContent = '0';
    accEl.textContent = '--';
    hpEl.textContent = '100';
    ammoEl.textContent = String(RIFLE.magSize);
    sessionOver = false;
    resetEnemy();
  };

  /** 达成目标数量 → 结算成绩 */
  const endSession = (): void => {
    sessionOver = true;
    running = false;
    firing = false;
    if (document.pointerLockElement === canvas) void document.exitPointerLock();
    const dur = (performance.now() - sessionStartAt) / 1000;
    const acc = stats.shots > 0 ? (stats.hits / stats.shots) * 100 : 0;
    const hsRate = stats.kills > 0 ? (headshotCount / stats.kills) * 100 : 0;
    const avgReact = reactionSamples.length
      ? reactionSamples.reduce((a, b) => a + b, 0) / reactionSamples.length
      : 0;
    const rows: [string, string][] = [
      ['击杀', `${stats.kills} / ${sessionTarget < 999 ? sessionTarget : '∞'}`],
      ['爆头击杀率', `${hsRate.toFixed(1)}%`],
      ['命中率', `${acc.toFixed(1)}%`],
      ['平均反应', `${avgReact.toFixed(0)} ms`],
      ['阵亡', String(stats.deaths)],
      ['用时', `${dur.toFixed(1)} s`],
    ];
    scoreEl.innerHTML = rows
      .map(([k, v]) => `<div class="s3-score-row"><span>${k}</span><b>${v}</b></div>`)
      .join('');
    resultOverlay.classList.remove('hidden');
  };

  const start = (): void => {
    overlay.classList.add('hidden');
    tryLock();
    // 关键修复：指针锁定必须在"用户手势"内**同步**申请。
    // 之前放在 await 加载之后申请，已超出浏览器的手势有效期 → 被拒绝 →
    // 鼠标无响应、视角冻住，表现就是"卡住动不了"（重载后偶发成功，所以时好时坏）
    void (async () => {
      if (!sessionReady) {
        // 首次进入：预建敌人池 + 预热着色器/特效
        loadingOverlay.classList.remove('hidden');
        await loadSession(Math.min(sessionTarget, 24));
        loadingOverlay.classList.add('hidden');
        sessionReady = true;
        resetSessionStats();
        logEvent(`开始本局：敌人 ${sessionTarget}，画质 ${qualityLevel}`);
        if (gpuIsSoftware) {
          showBanner('检测到软件渲染（未使用显卡）→ 请在浏览器开启硬件加速');
        }
      } else {
        // 已经加载过（如 Esc 后再进）：直接开始，不重复加载
        resetSessionStats();
      }
      running = true;
      lastT = performance.now();
      // 兜底：若同步申请被拒（Esc 退出后的冷却期），这里再试一次
      if (document.pointerLockElement !== canvas) tryLock();
    })();
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

  // 顺序很关键：**先接上处理器，再启用按钮**。
  // 反过来做的话，在"启用"到"接上处理器"之间点击会丢事件（表现为点了没反应/卡住）
  startBtn.addEventListener('click', start);
  startBtn.textContent = '点击进入';
  startBtn.disabled = false;
  if (startRequested) start();
  // 兜底：开始界面**任意位置**点一下都能进入（避免点击被其它层吃掉导致"点了没反应"）
  overlay.addEventListener('click', (e) => {
    const el = e.target as HTMLElement | null;
    if (el && el.closest('button') && el.closest('button') !== startBtn) return; // 其它按钮不触发
    start();
  });
  /**
   * 性能自检：把场景真实渲染 3 秒，输出帧率与帧时间分布。
   * 这是唯一能在主人机器上直接给出"到底跑不跑得动"的数字的办法。
   */
  benchBtn.addEventListener('click', () => {
    void (async () => {
      benchOut.innerHTML = '采样中…（3 秒，请勿操作）';
      overlay.classList.add('hidden');
      await nextFrame();
      // 预热：先渲染 20 帧，排除首帧编译影响
      for (let i = 0; i < 20; i++) await nextFrame();
      benchSamples = [];
      benchMode = true;
      const t0 = performance.now();
      while (performance.now() - t0 < 3000) await nextFrame();
      benchMode = false;
      overlay.classList.remove('hidden');

      const s = benchSamples.slice().sort((a, b) => a - b);
      const pct = (p: number): number => s[Math.min(s.length - 1, Math.floor(s.length * p))] ?? 0;
      const avg = s.reduce((a, b) => a + b, 0) / Math.max(1, s.length);
      const p95 = pct(0.95);
      const worst = s[s.length - 1] ?? 0;
      const verdict =
        p95 <= 20
          ? '✅ 机器完全跑得动（60 FPS 级）'
          : p95 <= 33
            ? '⚠️ 基本流畅，偶有掉帧'
            : '❌ 渲染吃力（核显/软件渲染，或窗口分辨率过大）';
      const buf = renderer.domElement;
      benchOut.innerHTML = `
        <div class="s3-score-row"><span>版本</span><b>${BUILD_STAMP}</b></div>
        <div class="s3-score-row"><span>渲染器</span><b>${gpuName}</b></div>
        <div class="s3-score-row"><span>帧率</span><b>${(1000 / Math.max(0.01, avg)).toFixed(1)} FPS（均值）</b></div>
        <div class="s3-score-row"><span>帧时间 平均/P95/最差</span><b>${avg.toFixed(1)} / ${p95.toFixed(1)} / ${worst.toFixed(1)} ms</b></div>
        <div class="s3-score-row"><span>渲染缓冲</span><b>${buf.width} × ${buf.height}</b></div>
        <div class="s3-score-row"><span>窗口 / DPR</span><b>${window.innerWidth}×${window.innerHeight} / ${window.devicePixelRatio}</b></div>
        <div class="s3-score-row"><span>画质</span><b>${qualityLevel === 'low' ? '低' : qualityLevel === 'medium' ? '中' : '高'}</b></div>
        <div class="s3-score-row"><span>结论</span><b>${verdict}</b></div>
      `;
    })();
  });
  fullscreenBtn.addEventListener('click', () => void toggleFullscreen());
  coverOnBtn.addEventListener('click', () => {
    coverState.on = true;
    applyCoverSetting();
  });
  coverOffBtn.addEventListener('click', () => {
    coverState.on = false;
    applyCoverSetting();
  });
  againBtn.addEventListener('click', () => {
    resultOverlay.classList.add('hidden');
    resetSessionStats();
    running = true;
    lastT = performance.now();
    tryLock();
  });
  backBtn.addEventListener('click', () => {
    resultOverlay.classList.add('hidden');
    overlay.classList.remove('hidden');
  });
  container.querySelector<HTMLButtonElement>('#s3-quit')!.addEventListener('click', () => {
    running = false;
    hooks.onExit();
  });
  canvas.addEventListener('click', () => {
    // 任何时候点击画面都尝试重新捕获鼠标（避免"没锁上就彻底动不了"）
    if (document.pointerLockElement !== canvas) tryLock();
  });
  document.addEventListener('pointerlockchange', () => {
    if (running && document.pointerLockElement !== canvas) {
      overlay.classList.remove('hidden');
      running = false;
    }
  });

  /* ---------------- 主循环 ---------------- */
  const loop = (): void => {
    // 先排下一帧：即使本帧逻辑抛异常，循环也不会中断（防止"画面卡住不动"）
    rafId = requestAnimationFrame(loop);
    try {
      step();
    } catch (err) {
      loopError = err instanceof Error ? err.message : String(err);
    }
  };

  const step = (): void => {
    const now = performance.now();
    const dt = Math.min(0.05, (now - lastT) / 1000);
    lastT = now;
    lastLoopTick = now; // 看门狗心跳
    // 单帧超过 1.2 秒：视为"危险帧"（可能是驱动挂起前兆），立刻降到最低画质并记录
    if (dt >= 0.9) {
      longFrames++;
      if (qualityLevel !== 'low') {
        applyQuality('low');
      }
    }
    // 卡顿统计：单帧超过 400ms 记为一次长卡（用于判断是"持续低帧"还是"周期性卡死"）
    if (dt > 0.4) longFrames++;
    // 注意：上面已按 0.9s 阈值做"危险帧降档"，这里保留 0.4s 的统计口径
    if (dt * 1000 > maxFrameMs) maxFrameMs = dt * 1000;
    if (benchMode) benchSamples.push(dt * 1000);
    if (!running) return;
    // 运行中但鼠标没被捕获 → 明确提示（这就是之前"卡住动不了"的可见症状）
    if (running && document.pointerLockElement !== canvas) {
      lockHintEl.classList.remove('hidden');
    } else {
      lockHintEl.classList.add('hidden');
    }

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
    // 实体碰撞：玩家撞不过掩体/墙体（半径 0.38m）
    if (resolveXZ(playerPos, 0.38).lengthSq() > 1e-6) {
      playerVel.multiplyScalar(0.35); // 撞墙后减速，避免贴墙抖动
      camera.position.x = playerPos.x;
      camera.position.z = playerPos.z;
    }

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
      if (enemyAI.timer <= 0 && !sessionOver) {
        // 高难度先做假动作（探一下再缩回），再真正拉出
        enemyAI.state = enemyAI.feintPlan ? 'feinting' : 'walking';
        openEncounter();
      }
    } else if (enemyAI.state === 'feinting') {
      // 假动作：小身位探出 → 短暂停顿 → 缩回掩体
      const target = enemyAI.feintPhase === 0 ? enemyAI.feintPos : enemyAI.coverPos;
      const dir = target.clone().sub(g.position);
      const dist = dir.length();
      if (dist > 0.05) {
        dir.normalize();
        g.position.addScaledVector(dir, CONFIG.enemySpeed * 1.5 * enemyAI.speedJitter * dt);
        // 注意：敌人的碰撞暂时关闭——严格碰撞会在掩体拐角处把敌人卡死（已实测）。
        // 玩家侧掩体仍是实体（挡人挡弹）。敌人的正规寻路/侧步将在下一步统一实现。
        g.rotation.y = Math.atan2(dir.x, dir.z) + Math.PI;
        enemyAI.walkPhase += dt * 9;
        const swing = Math.sin(enemyAI.walkPhase) * 0.5;
        enemy.leftLeg.rotation.x = swing;
        enemy.rightLeg.rotation.x = -swing;
      } else if (enemyAI.feintPhase === 0) {
        enemyAI.feintPhase = 1;
        enemyAI.timer = 0.22; // 探出后短暂停留
      } else {
        // 缩回完成：统计一次假动作；高难度有概率直接换掩体再出
        enemyAI.counters.feints++;
        if (enemyAI.canChangeCover && Math.random() < 0.45) {
          const next = pickSpawnPoint();
          const t = tactics();
          const side = Math.random() < 0.5 ? -1 : 1;
          const offset = t.peek[0] + Math.random() * Math.max(0, t.peek[1] - t.peek[0]);
          enemyAI.coverName = next.id;
          enemyAI.coverPos.set(next.x, 0, next.z);
          enemyAI.peekTargetX = next.x + side * offset;
          enemyAI.peekPos.set(enemyAI.peekTargetX, 0, next.z + 1.1 + Math.random() * 0.9);
          g.position.set(next.x, 0, next.z);
          enemyAI.counters.coverChanges++;
          lastSpawn = {
            seq: lastSpawn.seq + 1,
            visible: isVisibleFromPlayer(new THREE.Vector3(next.x, 0, next.z)),
            distance: +Math.hypot(next.x - camera.position.x, next.z - camera.position.z).toFixed(2),
            cover: next.id,
            difficulty: sliceDiff,
            fallback: next.fallback,
            cameraY: +camera.position.y.toFixed(2),
            x: +next.x.toFixed(2),
            z: +next.z.toFixed(2),
          };
        }
        enemyAI.feintPlan = false;
        enemyAI.state = 'walking';
      }
    } else if (enemyAI.state === 'walking') {
      // 移动目标 = 把枪线挪到玩家身上（不是走到玩家身边）
      const speed = CONFIG.enemySpeed * enemyAI.speedJitter;
      // 1) 门后刷新：先穿门洞（中转点）
      if (enemyAI.path.length > 0) {
        if (moveEnemyTo(enemyAI.path[0], speed, dt)) enemyAI.path.shift();
        return;
      }
      // 2) 横向侧步到"能看见玩家"的枪线位
      if (!enemyAI.firingSpot) enemyAI.firingSpot = findFiringSpot();
      const lastDist = enemyAI.firingSpot.distanceTo(g.position);
      const arrived = moveEnemyTo(enemyAI.firingSpot, speed, dt);
      const newDist = enemyAI.firingSpot.distanceTo(g.position);
      // 卡住检测：1.2 秒没有进展 → 换一个候选枪线位
      enemyAI.stallT = newDist < lastDist - 0.02 ? 0 : enemyAI.stallT + dt;
      if (enemyAI.stallT > 1.2) {
        enemyAI.badSpots.push(enemyAI.firingSpot.clone());
        enemyAI.firingSpot = findFiringSpot();
        enemyAI.stallT = 0;
      }
      // 枪线已覆盖玩家（或已到位）→ 停下开火
      if (arrived || enemyLineClear(g.position.x, g.position.z)) {
        enemyAI.state = 'aiming';
        enemyAI.timer = CONFIG.enemyAimTime[0] + Math.random() * (CONFIG.enemyAimTime[1] - CONFIG.enemyAimTime[0]);
        enemy.leftLeg.rotation.x = 0;
        enemy.rightLeg.rotation.x = 0;
        facePlayer();
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
      // 大师/极限：拉出后横向移动射击（更难预判）
      if (enemyAI.strafeShoot) {
        enemyAI.strafeSeconds += dt;
        g.position.x += enemyAI.strafeDir * 1.05 * dt;
        if (Math.abs(g.position.x) > 5.6) enemyAI.strafeDir = -enemyAI.strafeDir;
      }
      // 面向玩家
      const toPlayer = new THREE.Vector3(playerPos.x - g.position.x, 0, playerPos.z - g.position.z);
      g.rotation.y = Math.atan2(toPlayer.x, toPlayer.z) + Math.PI;
      // 真实遮挡：玩家躲在掩体后 → 敌人看不见就不开火，并侧移换角度找人
      const hasLos = enemyHasLineOfSight();
      if (!hasLos) {
        enemyAI.blocked += dt;
        if (enemyAI.blocked > 1.2) {
          enemyAI.blocked = 0;
          if (enemyAI.canChangeCover) {
            // 高难度：直接换掩体绕角度
            const next = pickSpawnPoint();
            g.position.set(next.x, 0, next.z);
            enemyAI.coverName = next.id;
            enemyAI.counters.coverChanges++;
            const t = tactics();
            const side = Math.random() < 0.5 ? -1 : 1;
            const offset = t.peek[0] + Math.random() * Math.max(0, t.peek[1] - t.peek[0]);
            enemyAI.peekPos.set(next.x + side * offset, 0, next.z + 1.1 + Math.random() * 0.9);
          } else {
            const side = Math.random() < 0.5 ? -1 : 1;
            enemyAI.peekPos.x = Math.max(-5.6, Math.min(5.6, g.position.x + side * 1.1));
          }
          enemyAI.state = 'walking';
        }
      } else if (enemyAI.timer <= 0) {
        enemyAI.blocked = 0;
        // 开火：扣血 + 红屏 + 阵亡计数
        // 注意：这里**不能** resetEnemy()——那会把敌人血量一起回满（曾经的"无敌帧"Bug）
        stats.deaths++;
        logEvent(`玩家阵亡 #${stats.deaths}`);
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

    // 注意：不显示敌人血条——它会透过掩体暴露敌人位置（命中反馈用受击红闪/血雾/伤害数字）

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

    // —— 性能采样：FPS / 帧时间 / 绘制批次 + 自动降画质 ——
    perfFrames++;
    perfAccum += dt;
    if (perfAccum >= 0.5) {
      const fps = perfFrames / perfAccum;
      const info = renderer.info.render;
      perfEl.textContent =
        `${fps.toFixed(0)} FPS · ${(1000 / Math.max(1, fps)).toFixed(1)} ms · ` +
        `${info.calls} draws · ${(info.triangles / 1000).toFixed(1)}k tri · ` +
        `dpr ${renderer.getPixelRatio().toFixed(2)} · 画质 ${qualityLevel === 'low' ? '低' : qualityLevel === 'medium' ? '中' : '高'}` +
        `\nGPU: ${gpuName}` +
        (gpuIsSoftware ? ' ⚠ 软件渲染（未用显卡）' : '') +
        (longFrames > 0 ? ` · 长卡 ${longFrames}` : '') +
        (loopError ? ` · 异常：${loopError}` : '');
      if (autoQuality && running) {
        autoSamples.push(fps);
        if (autoSamples.length >= 6) {
          const avg = autoSamples.reduce((a, b) => a + b, 0) / autoSamples.length;
          if (avg < 45 && qualityLevel === 'high') {
            applyQuality('medium');
            showBanner(`帧率 ${avg.toFixed(0)}，已自动降到中等画质`);
          } else if (avg < 40 && qualityLevel === 'medium') {
            applyQuality('low');
            showBanner(`帧率 ${avg.toFixed(0)}，已自动降到低画质（关阴影）`);
          }
          autoSamples.length = 0;
        }
      }
      perfFrames = 0;
      perfAccum = 0;
    }
    renderer.render(scene, camera);
  };
  rafId = requestAnimationFrame(loop);

  // 清理：退出 3D 切片时解绑所有监听
  return () => {
    cancelAnimationFrame(rafId);
    running = false;
    ro.disconnect();
    document.removeEventListener('fullscreenchange', resize);
    document.removeEventListener('keydown', onKeyDown);
    document.removeEventListener('keyup', onKeyUp);
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mousedown', onMouseDown);
    document.removeEventListener('mouseup', onMouseUp);
    window.removeEventListener('resize', resize);
    renderer.dispose();
  };
}
