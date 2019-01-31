'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // 公共工具
  router.get('/admin/captcha', controller.admin.base.captcha)
  router.post('/file/upload',controller.admin.base.upload)
  router.post('/file/uploadBanner',controller.admin.base.uploadBanner)
  router.get('/test',controller.home.test)


  router.get('/', controller.home.index);
  // 后台模块
  router.get('/admin', controller.admin.base.index)
  router.get('/admin/login', controller.admin.login.index)
  router.post('/admin/login', controller.admin.login.doLogin)
  router.get('/admin/layOut', controller.admin.login.layOut);
  // 用户
  router.get('/admin/manage', controller.admin.manage.index)
  router.get('/admin/manage/add', controller.admin.manage.add)
  router.post('/admin/manage/add', controller.admin.manage.doAdd)
  router.get('/admin/manage/edit', controller.admin.manage.edit)
  router.post('/admin/manage/edit', controller.admin.manage.doEdit)
  router.get('/admin/manage/delete', controller.admin.manage.delete)
  // 角色
  router.get('/admin/role', controller.admin.role.index)
  router.get('/admin/role/add', controller.admin.role.add)
  router.post('/admin/role/add', controller.admin.role.doAdd)
  router.get('/admin/role/edit', controller.admin.role.edit)
  router.post('/admin/role/edit', controller.admin.role.doEdit)
  router.get('/admin/role/delete', controller.admin.role.delete)
  router.get('/admin/role/auth',controller.admin.role.auth)
  router.post('/admin/role/auth',controller.admin.role.doAuth)
  //权限管理
  router.get('/admin/access', controller.admin.access.index)
  router.get('/admin/access/add', controller.admin.access.add)
  router.post('/admin/access/add', controller.admin.access.doAdd)
  router.get('/admin/access/edit', controller.admin.access.edit)
  router.post('/admin/access/edit', controller.admin.access.doEdit)
  router.get('/admin/access/delete', controller.admin.access.delete)
  // 轮播图管理
  router.get('/admin/banner',controller.admin.banner.index)
  router.get('/admin/banner/add',controller.admin.banner.add)
  router.post('/admin/banner/add',controller.admin.banner.doAdd)
  router.get('/admin/banner/edit', controller.admin.banner.edit)
  router.post('/admin/banner/edit', controller.admin.banner.doEdit)
  router.get('/admin/banner/delete', controller.admin.banner.delete)
  // 导航栏管理
  //权限管理
  router.get('/admin/nav', controller.admin.nav.index)
  router.get('/admin/nav/add', controller.admin.nav.add)
  router.post('/admin/nav/add', controller.admin.nav.doAdd)
  router.get('/admin/nav/edit', controller.admin.nav.edit)
  router.post('/admin/nav/edit', controller.admin.nav.doEdit)
  router.get('/admin/nav/delete', controller.admin.nav.delete)


  // 内容发布
  router.get('/admin/article',controller.admin.article.index)
  router.get('/admin/article/add',controller.admin.article.add)
  router.post('/admin/article/add',controller.admin.article.doAdd)
  // 编辑单页面应用
  router.get('/admin/editPage/:id',controller.admin.article.editPage)




  //api


};
