const autoprefixer = require("autoprefixer");
const pxtorem = require("postcss-pxtorem");
const prodConfig = require("./prod.config");

module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? prodConfig.ossCDN : "/",
  assetsDir:
    process.env.NODE_ENV === "production"
      ? "static" + new Date().toLocaleDateString().replace(/\//g, "-")
      : "static",

  lintOnSave: false,
  productionSourceMap: false,
  parallel: false, // ts-loader不支持多线程 ts下打包会丢失三方组件样式
  devServer: {
    // * 接口跨域处理
    proxy: {
      "/api": {
        target: "http://apidomain.com",
        changeOrigin: true,
      },
    },
    disableHostCheck: true,
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer(),
          pxtorem({
            rootValue: 37.5,
            propList: ["*"],
          }),
        ],
      },
      scss: {
        prependData: `@import "~@/scss/variables.scss";`,
      },
    },
  },
  // * 打包忽略项
  configureWebpack: {
    devtool: "source-map",
    // externals:
    //   process.env.NODE_ENV === "production" ? prodConfig.externals : {},
    optimization: prodConfig.optimization,
    resolve: {
      extensions: [".js", ".vue", ".json", ".ts", ".tsx"], // 加入ts 和 tsx
    },
  },
  chainWebpack: (config) => {
    // ts-import-plugin 配置
    prodConfig.mergeConfig(config);
    // 移除prefetch和preload
    config.plugins.delete("prefetch");
    config.plugins.delete("preload");
    if (process.env.NODE_ENV === "production") {
      // gzip
      // prodConfig.assetsGzip(config);
      config.entry("index").add("babel-polyfill");
      config.plugin("html").tap((args) => {
        // 加上属性引号
        args[0].minify.removeAttributeQuotes = false;
        args[0].cdn = prodConfig.cdn.build;
        args[0].isProd = true;
        return args;
      });
    }
  },
};
