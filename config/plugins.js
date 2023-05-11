import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import eslint from 'vite-plugin-eslint'
// import stylelint from 'vite-plugin-stylelint'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { visualizer } from 'rollup-plugin-visualizer'
import AutoImport from 'unplugin-auto-import/vite'
import AutoImportComponents from 'unplugin-vue-components/vite'
import Checker from 'vite-plugin-checker'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// import {
//   createStyleImportPlugin,
//   ElementPlusResolve as ElementStylePlusResolve,
// } from 'vite-plugin-style-import'
import iconsPlugin from 'unplugin-icons/vite'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import IconsResolver from 'unplugin-icons/resolver'
import path from 'path'
import fs from 'fs'
import { join } from 'path'

const resolve = (url) => path.resolve(__dirname, '../', url)

/**
 * 找出所有目錄
 * @param {string} path 初始遍歷路徑
 * @returns 回傳所有目錄
 */
function getDirs(path) {
  function findDir(path, dirs = []) {
    dirs.push(path)
    const files = fs.readdirSync(path)
    files.forEach((item) => {
      const fPath = join(path,item)
      const stat = fs.statSync(fPath)
      if(stat.isDirectory()) {
        findDir(fPath, dirs)
      }
    })
    return dirs
  }
  return findDir(path, [])
}
const pathName = resolve('src/stores/modules')
const dirs = [
  // 把 store 設定套入到 unplugin-auto-import
  ...getDirs(pathName),
  // 把 extends 設定套入到 unplugin-auto-import
  resolve('src/extends/')
]
const plugins =  [
  vue(),
  vueJsx(),
  UnoCSS(),
  visualizer(),
  eslint({
    // include: ['src/**/*.js', 'src/**/*.vue', 'src/*.js', 'src/*.vue']
  }),
  // stylelint(),
  // createStyleImportPlugin({
  //   resolves: [ElementStylePlusResolve()],
  //   libs: [
  //     {
  //       libraryName: 'element-plus',
  //       esModule: true,
  //       resolveStyle: (name) => {
  //         name = name.replace('loading-service', 'loading')
  //         return `element-plus/theme-chalk/${name}.css`
  //       },
  //     },
  //   ],
  // }),

  AutoImport({
    include: [
      /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
      /\.vue$/, /\.vue\?vue/, // .vue
    ],

    imports: [
      'vue',
      'vue-router',
      'vue-i18n',
      'pinia',
      '@vueuse/core'
      // {
      // '[package-name]': [
      //   '[import-names]',
      //   // alias
      //   ['[from]', '[alias]'],
      // ],
      // },
    ],

    // Auto import for all module exports under directories
    dirs,
    dts: 'src/auto-imports.d.ts',
    deep: true,
    // Auto import inside Vue template
    // see https://github.com/unjs/unimport/pull/15 and https://github.com/unjs/unimport/pull/72
    vueTemplate: false,

    // Custom resolvers, compatible with `unplugin-vue-components`
    // see https://github.com/antfu/unplugin-auto-import/pull/23/
    resolvers: [
      ElementPlusResolver()
    ],

    // Generate corresponding .eslintrc-auto-import.json file.
    // eslint globals Docs - https://eslint.org/docs/user-guide/configuring/language-options#specifying-globals
    eslintrc: {
      enabled: true, // Default `false`
      filepath:  resolve('.eslintrc-auto-import.json'),
      globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
    },
  }),
  AutoImportComponents({
    // relative paths to the directory to search for components.
    dirs: [resolve('./src/components/')],

    // valid file extensions for components.
    extensions: ['vue'],
    // search for subdirectories
    deep: true,
    // resolvers for custom components
    resolvers: [
      IconsResolver({
        customCollections: [
          'custom',
        ]
      }),
      ElementPlusResolver({
				  importStyle: false,
      })
    ],

    // generate `components.d.ts` global declarations,
    // also accepts a path for custom filename
    // default: `true` if package typescript is installed
    dts: false,

    // Allow subdirectories as namespace prefix for components.
    directoryAsNamespace: false,
    // Subdirectory paths for ignoring namespace prefixes
    // works when `directoryAsNamespace: true`
    globalNamespaces: [],

    // auto import for directives
    // default: `true` for Vue 3, `false` for Vue 2
    // Babel is needed to do the transformation for Vue 2, it's disabled by default for performance concerns.
    // To install Babel, run: `npm install -D @babel/parser`
    directives: true,

    // Transform path before resolving
    importPathTransform: v => v,

    // Allow for components to override other components with the same name
    allowOverrides: false,

    // filters for transforming targets
    include: [/\.vue$/, /\.vue\?vue/],
    exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /[\\/]\.nuxt[\\/]/],
  }),
  iconsPlugin({ customCollections :{
    custom: FileSystemIconLoader(resolve('src/assets/icons')),
  } }),
  Checker({
    vueTsc: true,
  }),
]

export default plugins
