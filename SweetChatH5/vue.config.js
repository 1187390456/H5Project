"use strict";
const path = require("path");
const defaultSettings = require("./src/settings.js");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
var ZipPlugin = require("zip-webpack-plugin");
const SentryPlugin = require("@sentry/webpack-plugin");

function resolve(dir) {
  return path.join(__dirname, dir);
}

var sentryInclude;
if (process.env.VUE_APP_MODE === "release") {
  sentryInclude = "./dist/FormalReleased/";
} else if (process.env.VUE_APP_MODE === "stage") {
  sentryInclude = "./dist/GrayReleased/";
} else if (process.env.VUE_APP_MODE === "test") {
  sentryInclude = "./dist/TestReleased/";
}
const sentryPlugin = new SentryPlugin({
  include: sentryInclude,
  release: process.env.VUE_APP_MODE + process.env.VUE_APP_VERSION,
  configFile: "./.sentryclirc",
  // urlPrefix: '~/dist/',
  // ignore: ['dist.zip', './lib']
});
const name = defaultSettings.title || "FansBridge"; // page title

const port = process.env.port || process.env.npm_config_port || 8883; // dev port

let outputDir, assetsDir;
if (process.env.VUE_APP_MODE === "test") {
  outputDir = "dist/TestReleased";
  assetsDir = "./static";
} else if (process.env.VUE_APP_MODE === "stage") {
  outputDir = "dist/GrayReleased";
  assetsDir = "./static";
} else if (process.env.VUE_APP_MODE === "release") {
  outputDir = "dist/FormalReleased";
  assetsDir = "./static";
}

const zipPlugin = new ZipPlugin({
  path: path.join(__dirname, "dist"),
  filename: `${process.env.VUE_APP_MODE}.nosourcemap.zip`,
  exclude: [/\.map$/],
});
// 自定义压缩配置
const uglifyJsPlugin = new UglifyJsPlugin({
  uglifyOptions: {
    warnings: false,
    compress: {
      drop_debugger: true,
      drop_console: false,
    },
  },
  sourceMap: true,
  parallel: true,
});
const pluginsFnc = () => {
  if (process.env.NODE_ENV === "production") {
    if (process.env.VUE_APP_SENTRY === "yes") {
      return [uglifyJsPlugin, sentryPlugin, zipPlugin];
    } else {
      return [uglifyJsPlugin, zipPlugin];
    }
  } else {
    return [];
  }
};
module.exports = {
  lintOnSave: false,

  publicPath: process.env.NODE_ENV === "production" ? "" : "",

  outputDir: outputDir,
  assetsDir: assetsDir,
  indexPath: "index.html",
  // productionSourceMap: process.env.VUE_APP_MODE !== 'release',
  productionSourceMap: true,
  devServer: {
    host: "0.0.0.0",
    disableHostCheck: true,
    port: port,
    // http://118.31.222.92:8083/wechat-web-pay/web-place-order
    // proxy: 'http://118.31.222.92:8088',
    // proxy: 'http://101.37.27.140:12800', // 灰
    // proxy: 'https://test.kr-cell.com',
    proxy: "http://gh.kr-cell.net",
    // proxy: 'https://sp.timing360.com',
    overlay: {
      errors: true, // 编译过程中如果有任何错误，都会显示到页面上
    },
    // open:true 自动帮你打开浏览器
    hot: true,
  },
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [
        path.resolve(__dirname, "src/assets/style/variable.less"),
        path.resolve(__dirname, "src/assets/style/unionDialog.less"),
        path.resolve(__dirname, "src/assets/style/popTips.less"),
      ], // 引入全局样式变量
    },
  },
  configureWebpack: {
    // dev:process.env.VUE_APP_MODE !== 'test',
    name: name,
    resolve: {
      alias: {
        "@": resolve("src"),
        src: resolve("src"),
        views: resolve("src/views"),
        components: resolve("src/components"),
        assets: resolve("src/assets"),
        common: resolve("src/common"),
        store: resolve("src/store"),
        api: resolve("src/api"),
        api_v2: resolve("src/api_v2"),
        config: resolve("src/config"),
        lib: resolve("src/lib"),
        bus: resolve("src/bus"),
        utils: resolve("src/utils"),
        static: resolve("public/static"),
      },
    },
    plugins: pluginsFnc(),
  },
  chainWebpack(config) {
    config.plugins.delete("preload"); // TODO: need test
    config.plugins.delete("prefetch"); // TODO: need test
    // set svg-sprite-loader
    config.module.rule("svg").exclude.add(resolve("src/icons")).end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      })
      .end();

    // set preserveWhitespace
    config.module
      .rule("vue")
      .use("vue-loader")
      .loader("vue-loader")
      .tap((options) => {
        options.compilerOptions.preserveWhitespace = true;
        return options;
      })
      .end();

    config
      // https://webpack.js.org/configuration/devtool/#development
      .when(process.env.NODE_ENV === "development", (config) =>
        config.devtool("cheap-source-map")
      );

    config.when(process.env.NODE_ENV !== "development", (config) => {
      config
        .plugin("ScriptExtHtmlWebpackPlugin")
        .after("html")
        .use("script-ext-html-webpack-plugin", [
          {
            // `runtime` must same as runtimeChunk name. default is `runtime`
            inline: /runtime\..*\.js$/,
          },
        ])
        .end();
      config.optimization.splitChunks({
        chunks: "all",
        cacheGroups: {
          libs: {
            name: "chunk-libs",
            test: /[\\/]node_modules[\\/]/,
            priority: 10,

            chunks: "initial", // only package third parties that are initially dependent
          },
          elementUI: {
            name: "chunk-elementUI", // split elementUI into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/, // in order to adapt to cnpm
          },
          commons: {
            name: "chunk-commons",
            test: resolve("src/components"), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      });
      config.optimization.runtimeChunk("single");
    });
  },
};
