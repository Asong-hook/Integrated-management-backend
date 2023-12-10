import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
import vitePluginImp from 'vite-plugin-imp'
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
  vitePluginImp({
    libList: [
      {
        libName: "antd",
        style: (name) => `antd/es/${name}/style`,
      },
    ],
  }),
  createSvgIconsPlugin({
    // eslint-disable-next-line no-undef
    iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
    symbolId: "icon-[dir]-[name]"
  })
  ],
  css: {
    preprocessorOptions: {
      less: {
        // eslint-disable-next-line no-undef
        javascriptEnabled: true,
      }
    },
  },
  resolve: {
    alias: {
      // eslint-disable-next-line no-undef
      '@': path.resolve(__dirname, './src')
    }
  }
})
