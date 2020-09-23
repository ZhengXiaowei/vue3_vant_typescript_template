const merge = require("webpack-merge");
const tsImportPluginFactory = require("ts-import-plugin");

// * 避免打包项
const externals = {
  vue: "Vue",
  vuex: "Vuex",
  "vue-lazyload": "VueLazyload",
  "vue-router": "VueRouter",
  // vant: "vant",
  axios: "axios",
};

// * 公共代码抽离
const optimization = {
  splitChunks: {
    cacheGroups: {
      vendors: {
        name: "chunk-vendors",
        test: /[\\/]node_modules[\\/]/,
        priority: 100,
        chunks: "all",
        minChunks: 1,
        maxInitialRequests: 5,
        minSize: 0,
      },
      common: {
        name: "chunk-common",
        test: /[\\/]src[\\/]ts[\\/]/,
        minChunks: 2,
        maxInitialRequests: 5,
        minSize: 0,
        priority: 60,
        chunks: "all",
        reuseExistingChunk: true,
      },
      styles: {
        name: "styles",
        test: /\.(sa|sc|c)ss$/,
        chunks: "all",
        enforce: true,
      },
      runtimeChunk: {
        name: "manifest",
      },
    },
  },
};

// * 资源配置
const cdn = {
  dev: {},
  build: {
    css: [],
    js: [],
  },
};

const ossCDN = "./";

// * 三方ui在ts下按需加载的实现
const mergeConfig = (config) => {
  config.module
    .rule("ts")
    .use("ts-loader")
    .tap((options) => {
      options = merge(options, {
        transpileOnly: true,
        getCustomTransformers: () => ({
          before: [
            tsImportPluginFactory({
              libraryName: "vant",
              libraryDirectory: "es",
              style: true,
            }),
          ],
        }),
        compilerOptions: {
          module: "es2015",
        },
      });
      return options;
    });
};

// * 打包gzip
const assetsGzip = (config) => {
  config
    .plugin("compression-webpack-plugin")
    .use(require("compression-webpack-plugin"), [
      {
        filename: "[path].gz[query]",
        algorithm: "gzip",
        test: /\.js$|\.html$|\.json$|\.css/,
        threshold: 10240, // 只有大小大于该值的资源会被处理 10240
        minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
        deleteOriginalAssets: true, // 删除原文件
      },
    ]);
};

// * 代码压缩
const codeUglify = (config) => {
  config
    .plugin("uglifyjs-webpack-plugin")
    .use(require("uglifyjs-webpack-plugin"), [
      {
        uglifyOptions: {
          //生产环境自动删除console
          compress: {
            drop_debugger: true,
            drop_console: false,
            pure_funcs: ["console.log"],
          },
        },
        sourceMap: false,
        parallel: true,
      },
    ]);
};

module.exports = {
  mergeConfig,
  assetsGzip,
  codeUglify,
  externals,
  optimization,
  cdn,
  ossCDN,
};
