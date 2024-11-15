const { defineConfig } = require('@vue/cli-service');

const path = require('path');
const webpack = require('webpack');
function resolve (dir) {
  return path.join(__dirname, dir);
}
const MODE = process.env.VUE_APP_MODE;
// console.log(MODE, '当前环境');

module.exports = defineConfig({
  publicPath: MODE === 'development' ? '/' : './',
  devServer: {
    // host: "localhost",
    port: 8081, // 端口号
    host: '0.0.0.0',
    https: false, // https:{type:Boolean}
    open: false, //配置自动启动浏览器
    proxy: {
      '/api' : {
        target: 'http://192.168.1.55:8888',
        pathRewrite: { '^/api': '' },
        changeOrigin: true, // target 是域名的话，需要这个参数
        secure: false // 设置支持https协议的代理
      },
    }
  },
  transpileDependencies: true,
  lintOnSave: false,// 关闭ESLINT校验工具
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'));
      config.plugin('html').tap(args => {
        args[0].title = '智能网格预报'; //网站标题
        return args;
      });
  },
  configureWebpack: {
    output: {
      sourcePrefix: ''
    },
    resolve: {
      fallback: { "https": false, "zlib": false, "http": false, "url": false },
      mainFiles: ['index']
    },
    plugins: [
      
    ]
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "@/styles/main.scss";`
      },
      sass: {
        prependData: `@import "@/styles/main.scss";`
      }
    }
  }
});
