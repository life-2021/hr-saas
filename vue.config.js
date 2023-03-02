const { defineConfig } = require("@vue/cli-service");
// module.exports = defineConfig({
//   transpileDependencies: true
// })

module.exports = {
  devServer: {
    open: true,
    host: "localhost",
    port: 8080,
    // 配置反向代理
    proxy: {
      // 地址中含有/api触发代理机制
      "/api": {
        // 代理服务器地址
        // target: "http://ihrm-java.itheima.net/api",
        target: "http://ihrm.itheima.net/prod-api",
        // 是否跨域
        changeOrigin: true,
        // 添加路径前缀
        pathRewrite: {
          "/api": "",
        },
      },
    },
  },
  // 关闭eslint检查机制
  lintOnSave: false,
};
