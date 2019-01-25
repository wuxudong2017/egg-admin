'use strict';
const path = require('path');
const sequelize = require('./db')
module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1546608309232_3696';

  // add your config here
  config.middleware = ['koaCompress', 'authAdmin'];
  // 页面压缩中间件
  config.koaCompress = {
    threshold: 1024,
  }

  // 后台管理中间件
  config.authAdmin = {
    enable: true,
    match: '/admin'
  }
  // 安全验证
  exports.security = {
    csrf: {
      // 判断是否需要 ignore 的方法，请求上下文 context 作为第一个参数 
      ignore: ctx => {
        if (ctx.request.url == '/file/upload') {
          return true;
        }
        return false;
      },
    }
  }

  // 模板渲染
  config.view = {
    mapping: {
      '.html': 'nunjucks'
    },
    cache: true, // 缓存路径
    defaultViewEngine: 'nunjucks', //默认模板渲染引擎
    root: [
      path.join(appInfo.baseDir, 'app/view')
    ].join(',')
  }
  // mysql
  config.sequelize = sequelize
  // session 配置
  config.session = {
    key: 'EGG_SESSION',
    maxAge: 30 * 60 * 1000,
    httpOnly: true,
    renew: true,
    entrypt: true
  }
  // 文件上传配置
  config.uploadDir = 'app/public/uploads'


  return config;
};
