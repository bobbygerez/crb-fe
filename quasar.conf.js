/* eslint-disable no-dupe-keys */
// Configuration for your app

module.exports = function (ctx) {
  return {
    preFetch: true,
    htmlVariables: {
      title: 'test name'
    },

    // app plugins (/src/plugins)
    plugins: [
      // 'i18n',
      'vue2-filters',
      'axios',
      'vuelidate'
      // 'vue-signature-pad'
    ],
    css: [
      'app.styl'
    ],
    extras: [
      ctx.theme.mat ? 'roboto-font' : null,
      'material-icons', // optional, you are not bound to it
      // 'ionicons',
      'mdi',
      'fontawesome',
      ctx.theme.ios ? 'ionicons' : null
    ],
    supportIE: true,
    build: {
      // env: ctx.dev
      //   ? { // so on dev we'll have
      //     API: JSON.stringify('http://localhost:8099/api')
      //   }
      //   : { // and on build (production):
      //     API: JSON.stringify('http://localhost:8099/api')
      //   },
      scopeHoisting: true,
      vueRouterMode: 'history',
      // vueCompiler: true,
      // gzip: true,
      // analyze: true,
      // extractCSS: false,
      extendWebpack (cfg) {
        cfg.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules|quasar)/,
          options: {
            fix: true
          }
        })
      }
    },
    devServer: {
      // https: true,
      port: ctx.mode.spa ? 8080 : (ctx.mode.cordova ? 8080 : 8082),
      open: true // opens browser window automatically
    },
    // framework: 'all' --- includes everything; for dev only!

    framework: {
      // all: true,
      // iconSet: ctx.theme.mat ? 'material-icons' : 'ionicons'
      components: [
        'QModal',
        'QPopupEdit',
        'QTh',
        'QCheckbox',
        'QTd',
        'QTr',
        'QTable',
        'QTableColumns',
        'QSelect',
        'QAlert',
        'QAutocomplete',
        'QSearch',
        'QCard',
        'QCardTitle',
        'QCardMain',
        'QCardMedia',
        'QCardSeparator',
        'QCardActions',
        'QInput',
        'QDialog',
        'QField',
        'QBtnDropdown',
        'QLayout',
        'QLayoutHeader',
        'QLayoutDrawer',
        'QPageContainer',
        'QPage',
        'QToolbar',
        'QToolbarTitle',
        'QBtn',
        'QIcon',
        'QItemTile',
        'QList',
        'QListHeader',
        'QCollapsible',
        'QItem',
        'QItemMain',
        'QItemSide',
        'QItemSeparator',
        'QRating',
        'QTooltip',
        'QScrollObservable',
        'QPopover',
        'QInnerLoading',

        // ... if using custom spinner, add it too
        // whatever that is
        'QSpinnerGears',
        'QSpinnerMat',
        'QSpinnerIos',
        'QPageSticky',
        'QModalLayout',
        'QSpinner',
        'QAjaxBar'
      ],
      directives: [
        'Ripple', 'CloseOverlay', 'BackToTop'
      ],
      // Quasar plugins
      plugins: [
        'Notify',
        'LocalStorage',
        'SessionStorage',
        'Platform',
        'Screen',
        'LoadingBar'
      ],
      // config: {
      //   loadingBar: {
      //     skipHijack: true
      //   }
      // },
      iconSet: ctx.theme.mat ? 'material-icons' : 'ionicons'
      // i18n: 'de' // Quasar language
    },

    // animations: 'all' --- includes all animations
    animations: 'all',
    // [],
    ssr: {
      pwa: false
    },
    pwa: {
      // workboxPluginMode: 'InjectManifest',
      // workboxOptions: {},
      manifest: {
        // name: 'Quasar App',
        // short_name: 'Quasar-PWA',
        // description: 'Best PWA App in town!',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [{
          'src': 'statics/icons/icon-128x128.png',
          'sizes': '128x128',
          'type': 'image/png'
        },
        {
          'src': 'statics/icons/icon-192x192.png',
          'sizes': '192x192',
          'type': 'image/png'
        },
        {
          'src': 'statics/icons/icon-256x256.png',
          'sizes': '256x256',
          'type': 'image/png'
        },
        {
          'src': 'statics/icons/icon-384x384.png',
          'sizes': '384x384',
          'type': 'image/png'
        },
        {
          'src': 'statics/icons/icon-512x512.png',
          'sizes': '512x512',
          'type': 'image/png'
        }
        ]
      }
    },
    cordova: {
      // id: 'org.cordova.quasar.app'
    },
    electron: {
      // bundler: 'builder', // or 'packager'
      extendWebpack (cfg) {
        // do something with Electron process Webpack cfg
      },
      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Window only
        // win32metadata: { ... }
      },
      builder: {
        // https://www.electron.build/configuration/configuration

        // appId: 'quasar-app'
      }
    }
  }
}
