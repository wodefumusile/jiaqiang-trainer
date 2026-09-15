import { defineConfig } from 'vite';

export default defineConfig({
  /**
   * 相对路径产物：GitHub Pages 部署在 https://<用户>.github.io/<仓库名>/ 这种**子路径**下，
   * 默认的绝对路径（/assets/...）会 404。用相对路径后本地预览与 Pages 都能直接跑。
   */
  base: './',
  server: {
    port: 5173,
    host: true,
  },
  build: {
    outDir: 'dist',
  },
});
