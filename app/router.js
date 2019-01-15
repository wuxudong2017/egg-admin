'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // 公共工具
  router.get('/admin/captcha', controller.admin.base.captcha)

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
  //api



};
