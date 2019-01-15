'use strict';

const Service = require('egg').Service;
const url = require('url')
class AdminService extends Service {
  async checkAuth() {

    // 忽略权限判断的地址
    var ignoreUrl = ['/admin/login','/admin/captcha']
    // 获取用户的角色
    var userInfo = this.ctx.session.userInfo;
    console.log(`userInfo=======>${JSON.stringify(userInfo)}`)
    var roleId = userInfo.roleId;
    // 根据角色id 查询当前角色的权限id
    var accessResult = await this.ctx.service.admin.roleService.getRoleAccess(roleId);
    // 当前角色的访问权限列表
    var accessArr = [];
    accessResult.forEach(item =>{
        accessArr.push(item.id)
    })
    console.log(accessArr)
    // 获取当前用户的访问地址
    var pathName = url.parse(this.ctx.request.url).pathname;
    // 根据url 查询权限id 是否在角色权限id中
    var accessUrlResult = await this.ctx.service.admin.accessSevice.findByVal({"url":pathName});
    // 忽略权限判断的地址,和判断是否为管理员
    if(ignoreUrl.indexOf(pathName) > -1|| userInfo.isSuper ==1){
        return true
    }
    if(accessUrlResult){
        if(accessArr.indexOf(accessResult.id) > -1){
            return true
        }
        return false
    }
    return false
  }
}

module.exports = AdminService;
