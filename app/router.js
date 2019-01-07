'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // 公共工具
  router.get('/admin/captcha',controller.admin.base.captcha)

  router.get('/', controller.home.index);
  // 后台模块
  router.get('/admin',controller.admin.base.index)
  router.get('/admin/login',controller.admin.login.index)
  router.post('/admin/login',controller.admin.login.doLogin)
  router.get('/admin/layOut',controller.admin.login.layOut);
    // 用户
    router.get('/admin/manage',controller.admin.manage.index)
    router.get('/admin/manage/add',controller.admin.manage.add)
    router.post('/admin/manage/add',controller.admin.manage.doAdd)
    router.get('/admin/manage/edit',controller.admin.manage.edit)
    router.post('/admin/manage/edit',controller.admin.manage.doEdit)
     // 角色
     router.get('/admin/role',controller.admin.role.index)
     router.get('/admin/role/add',controller.admin.role.add)



};
