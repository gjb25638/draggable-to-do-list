import { defineConfig } from 'vite'
import plugins from './config/plugins'
import path from 'path'
const obj = {}

export default defineConfig((config)=>{
  const { mode } = config
  return {
    server: {
      open: true,
      port: 2800,
      host: '0.0.0.0',
      proxy: {
        // 選項寫法
        '/api': {
          target: 'http://192.168.85.91:8471', // 高雄
          // target: 'http://10.0.101.145:38821', // 台北 lab 互通高雄主機需連vpn
          ws: true,
          changeOrigin: true
        }
      }
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@IMG': path.resolve(__dirname, './src/assets/img'),
        'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
        '@CSS': path.resolve(__dirname, 'src/style')
      },
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    },
    plugins,
    build: {
      outDir: 'dist',
      assetsDir: 'static/img/',
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              const arr = id.toString().split('node_modules/.pnpm/')[1].split('/')[0].replace(/^@/, '').replace(/\+/g, '_')
              const modules = arr.split('@')[0]
              if (!obj[modules]) {
                // console.log(modules)
                obj[modules] = true
              }
              switch(modules) {
              // case 'vue':
              case 'tinymce':
              case 'axios':
              case 'lodash-es':
              case 'crypto-js':
              case 'element-plus':
              case 'element-plus_icons-vue':
                return modules
              default :
                return 'vendor'
              }
            }
          },
          chunkFileNames: 'static/js/chunk/[name]-[hash].js',
          entryFileNames: 'static/js/entry/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
        },
      },
      target: 'esnext',
      minify: 'esbuild'
    },
    esbuild: {
      drop: mode === 'production' ? ['console', 'debugger'] : [],
    },
    css: {
      devSourcemap: true
    }
  }
})
