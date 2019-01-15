'use strict';

const Service = require('egg').Service;
const url = require('url')
class AdminService extends Service {
  async checkAuth() {

    // 忽略权限判断的地址
    let ignoreUrl = ['/admin','/admin/login','/admin/captcha','/admin/layOut']
    // 获取用户的角色
    let userInfo = this.ctx.session.userInfo;
    //console.log(`userInfo=======>${JSON.stringify(userInfo)}`)
    let roleId = userInfo.roleId;
    // 根据角色id 查询当前角色的权限id
   // console.log(roleId)
    let accessResult = await this.ctx.service.admin.roleService.getRoleAccess(roleId);
    //console.log(`accessResult---->${JSON.stringify(accessResult)}`)
    // 当前角色的访问权限列表
    let accessArr = [];
    accessResult.forEach(item =>{
        accessArr.push(item.accessId)
    })
    //console.log(accessArr)
    // 获取当前用户的访问地址
    let pathName = url.parse(this.ctx.request.url).pathname;
    // console.log(`pathName==========>${pathName}`)
    // 根据url 查询权限id 是否在角色权限id中
    let accessUrlResult = JSON.parse(JSON.stringify(await this.ctx.service.admin.accessSevice.findByVal({"url":pathName})));
    //console.log(`accessUrlResult========>${JSON.stringify(accessUrlResult)}`)
    // 忽略权限判断的地址,和判断是否为管理员
    if(ignoreUrl.indexOf(pathName) > -1|| userInfo.isSuper ==1){
        return true
    }
    //console.log(`result---------->${accessArr.indexOf(accessUrlResult[0].id) > -1}`)
    if(accessUrlResult){
        if(accessArr.indexOf(accessUrlResult[0].id) > -1){
            return true
        }
        return false
    }
    return false
  }
  // 获取当前角色的左侧菜单数据
  async getAside(){
    let userInfo = this.ctx.session.userInfo;
    // 获取角色ID
    let roleId = userInfo.roleId;
    // // 返回当前角色id下的权限id
    let result =await this.ctx.service.admin.roleService.getRoleAccess(roleId);
    let accessList =await this.ctx.service.admin.accessSevice.findAccess();
    let accessListA = JSON.parse(JSON.stringify(accessList))['rows'];
    result.forEach(item => {
      accessListA.forEach(itemB =>{
        if(itemB.id == item.accessId){
          itemB.checked = true
        }
        itemB['accesses'].forEach(itemC => {
          if(itemC.id == item.accessId){
            itemC.checked = true
          }
        })
      })
    })
    let isSuper = userInfo.isSuper;
    accessListA.unshift({
        "moduleName": "首页",
        "url": "/admin",
        "checked":true,
        "accesses":[]
    })
    return  {accessListA,isSuper}
  }


}

module.exports = AdminService;
