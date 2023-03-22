// require("babel-polyfill");

module.exports = {
  // 基本路径 baseURL已经过时
  publicPath: "./",
  // 输出文件目录
  outputDir: "dist",
  // eslint-loader 是否在保存的时候检查
  lintOnSave: true,
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: true,
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require("postcss-pxtorem")({
            rootValue: 18.75, // 换算的基数
            selectorBlackList: ["weui", "mu", "cube-", "mint-", "mt-"], // 忽略转换正则匹配项
            propList: ["*"],
          }),
        ],
      },
    },
  },
  devServer: {
    overlay: {
      warnings: false,
      errors: false,
    },
  },
};
