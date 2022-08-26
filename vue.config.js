const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

module.exports = {
  devServer: {
    open:false,
    proxy: { // 配置跨域
      '/api': {
        target: 'http://127.0.0.1:8888', // 需要代理的地址
        changeOrigin: true, // 允许跨域,
        ws:true,
        pathRewrite:{
          '^/api':''
        }
      },
    },
  },
};
const { initServer} = require('./src/api/Service.js')
//import initServer from './src/api/Service'
initServer();