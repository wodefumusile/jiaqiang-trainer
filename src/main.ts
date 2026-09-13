/**
 * 入口：直接挂载 3D 训练场景（2D 版本已全面移除）
 */
import './styles.css';

const app = document.getElementById('app')!;

void import('./three/slice').then(({ mountThreeSlice }) => {
  mountThreeSlice(app, {
    onExit: () => {
      // 3D 是唯一版本，退出时重新加载即可回到初始界面
      window.location.reload();
    },
  });
});
