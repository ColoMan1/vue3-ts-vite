// vite.config.ts
import { defineConfig } from "file:///C:/Users/Q/Desktop/vue3/firstVueProject/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/Users/Q/Desktop/vue3/firstVueProject/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///C:/Users/Q/Desktop/vue3/firstVueProject/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import path from "path";
import Components from "file:///C:/Users/Q/Desktop/vue3/firstVueProject/node_modules/unplugin-vue-components/dist/vite.mjs";
import { ElementPlusResolver } from "file:///C:/Users/Q/Desktop/vue3/firstVueProject/node_modules/unplugin-vue-components/dist/resolvers.mjs";
import AutoImport from "file:///C:/Users/Q/Desktop/vue3/firstVueProject/node_modules/unplugin-auto-import/dist/vite.js";
var __vite_injected_original_dirname = "C:\\Users\\Q\\Desktop\\vue3\\firstVueProject";
var vite_config_default = defineConfig({
  plugins: [
    vueJsx({
      // options are passed on to @vue/babel-plugin-jsx
    }),
    vue(),
    Components({
      // ui库解析器
      resolvers: [
        ElementPlusResolver()
      ],
      // 指定组件位置，默认是src/components
      dirs: ["src/components"],
      extensions: ["vue"],
      // 配置文件生成位置
      dts: "src/components.d.ts"
    }),
    AutoImport({
      imports: ["vue", "vue-router", "vue-i18n", "@vueuse/head", "@vueuse/core"],
      // 可以选择auto-import.d.ts生成的位置，使用ts建议设置为'src/auto-import.d.ts'
      dts: "src/auto-import.d.ts"
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  },
  envDir: "env",
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/styles/variables.scss";'
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxRXFxcXERlc2t0b3BcXFxcdnVlM1xcXFxmaXJzdFZ1ZVByb2plY3RcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXFFcXFxcRGVza3RvcFxcXFx2dWUzXFxcXGZpcnN0VnVlUHJvamVjdFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvUS9EZXNrdG9wL3Z1ZTMvZmlyc3RWdWVQcm9qZWN0L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXHJcbmltcG9ydCB2dWVKc3ggZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlLWpzeCdcclxuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcclxuaW1wb3J0IENvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSdcclxuaW1wb3J0IHsgRWxlbWVudFBsdXNSZXNvbHZlciB9IGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3Jlc29sdmVycydcclxuaW1wb3J0IEF1dG9JbXBvcnQgZnJvbSAndW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZSdcclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgcGx1Z2luczogW1xyXG4gICAgdnVlSnN4KHtcclxuICAgICAgLy8gb3B0aW9ucyBhcmUgcGFzc2VkIG9uIHRvIEB2dWUvYmFiZWwtcGx1Z2luLWpzeFxyXG4gICAgfSksXHJcbiAgICB2dWUoKSxcclxuICAgIENvbXBvbmVudHMoe1xyXG4gICAgICAvLyB1aVx1NUU5M1x1ODlFM1x1Njc5MFx1NTY2OFxyXG4gICAgICByZXNvbHZlcnM6IFtcclxuICAgICAgICBFbGVtZW50UGx1c1Jlc29sdmVyKClcclxuICAgICAgXSxcclxuICAgICAgLy8gXHU2MzA3XHU1QjlBXHU3RUM0XHU0RUY2XHU0RjREXHU3RjZFXHVGRjBDXHU5RUQ4XHU4QkE0XHU2NjJGc3JjL2NvbXBvbmVudHNcclxuICAgICAgZGlyczogWydzcmMvY29tcG9uZW50cyddLFxyXG4gICAgICBleHRlbnNpb25zOiBbJ3Z1ZSddLFxyXG4gICAgICAvLyBcdTkxNERcdTdGNkVcdTY1ODdcdTRFRjZcdTc1MUZcdTYyMTBcdTRGNERcdTdGNkVcclxuICAgICAgZHRzOiAnc3JjL2NvbXBvbmVudHMuZC50cydcclxuICAgIH0pLFxyXG4gICAgQXV0b0ltcG9ydCh7XHJcbiAgICAgIGltcG9ydHM6IFsndnVlJywgJ3Z1ZS1yb3V0ZXInLCAndnVlLWkxOG4nLCAnQHZ1ZXVzZS9oZWFkJywgJ0B2dWV1c2UvY29yZSddLFxyXG4gICAgICAvLyBcdTUzRUZcdTRFRTVcdTkwMDlcdTYyRTlhdXRvLWltcG9ydC5kLnRzXHU3NTFGXHU2MjEwXHU3Njg0XHU0RjREXHU3RjZFXHVGRjBDXHU0RjdGXHU3NTI4dHNcdTVFRkFcdThCQUVcdThCQkVcdTdGNkVcdTRFM0Enc3JjL2F1dG8taW1wb3J0LmQudHMnXHJcbiAgICAgIGR0czogJ3NyYy9hdXRvLWltcG9ydC5kLnRzJ1xyXG4gICAgfSlcclxuICBdLFxyXG4gIHJlc29sdmU6IHtcclxuICAgIGFsaWFzOiB7XHJcbiAgICAgICdAJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjJylcclxuICAgIH1cclxuICB9LFxyXG4gIGVudkRpcjogJ2VudicsXHJcbiAgY3NzOiB7XHJcbiAgICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7XHJcbiAgICAgIHNjc3M6IHtcclxuICAgICAgICBhZGRpdGlvbmFsRGF0YTogJ0BpbXBvcnQgXCJAL3N0eWxlcy92YXJpYWJsZXMuc2Nzc1wiOydcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufSlcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFtVCxTQUFTLG9CQUFvQjtBQUNoVixPQUFPLFNBQVM7QUFDaEIsT0FBTyxZQUFZO0FBQ25CLE9BQU8sVUFBVTtBQUNqQixPQUFPLGdCQUFnQjtBQUN2QixTQUFTLDJCQUEyQjtBQUNwQyxPQUFPLGdCQUFnQjtBQU52QixJQUFNLG1DQUFtQztBQVN6QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUE7QUFBQSxJQUVQLENBQUM7QUFBQSxJQUNELElBQUk7QUFBQSxJQUNKLFdBQVc7QUFBQTtBQUFBLE1BRVQsV0FBVztBQUFBLFFBQ1Qsb0JBQW9CO0FBQUEsTUFDdEI7QUFBQTtBQUFBLE1BRUEsTUFBTSxDQUFDLGdCQUFnQjtBQUFBLE1BQ3ZCLFlBQVksQ0FBQyxLQUFLO0FBQUE7QUFBQSxNQUVsQixLQUFLO0FBQUEsSUFDUCxDQUFDO0FBQUEsSUFDRCxXQUFXO0FBQUEsTUFDVCxTQUFTLENBQUMsT0FBTyxjQUFjLFlBQVksZ0JBQWdCLGNBQWM7QUFBQTtBQUFBLE1BRXpFLEtBQUs7QUFBQSxJQUNQLENBQUM7QUFBQSxFQUNIO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLEtBQUssUUFBUSxrQ0FBVyxPQUFPO0FBQUEsSUFDdEM7QUFBQSxFQUNGO0FBQUEsRUFDQSxRQUFRO0FBQUEsRUFDUixLQUFLO0FBQUEsSUFDSCxxQkFBcUI7QUFBQSxNQUNuQixNQUFNO0FBQUEsUUFDSixnQkFBZ0I7QUFBQSxNQUNsQjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
