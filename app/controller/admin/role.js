'use strict';

const BaseController = require('./base');

class RoleController extends BaseController {
  // 获取角色列表
  async index() {
    let offset = this.ctx.request.query.page?Number(this.ctx.request.query.page) : 1;
    let result = await this.ctx.service.admin.roleService.index(offset)
    await this.ctx.render('/admin/role/index',{
      result
    })
  }
  // 新加角色
  async add() {
    await this.ctx.render('/admin/role/add')
  }
  // post 新加角色
  async doAdd(){
    let formData = this.ctx.request.body;
    console.log(formData)
    let title  = decodeURIComponent(formData.title);
    let description = decodeURIComponent(formData.description);
    let status = formData.status;
    let result = await this.ctx.service.admin.roleService.addOneRole(title,description,status);
    if(result){
      this.ctx.body = {
        code:1,
        message:'添加角色成功',
        data:null
      }
    }else{
      this.ctx.body = {
        code:0,
        message:'角色已存在',
        data:null
      }
    }
  }
  // 编辑角色信息页面
  async edit(){
    let id = this.ctx.request.query.id;
    let result = await this.ctx.service.admin.roleService.getOneRole(id)
    await this.ctx.render('/admin/role/edit',{
      result
    })

  }


  async doEdit(){
    let formData = this.ctx.request.body;
    let id = formData.id;
    console.log(formData)
    let title = decodeURIComponent(formData.title);
    let description = decodeURIComponent(formData.description);
    let status = formData.status;
    let result = await this.ctx.service.admin.roleService.editRole(id,title,description,status);
    console.log(`result ====> ${result}`)
    if(Number(result) === 1){
      this.ctx.body={
          code:1,
          message:'编辑角色成功',
          data:null
      }
    }else{
      this.ctx.body={
        code:0,
        message:'编辑角色失败',
        data:null
      }
    }
  }
  // 根据id 删除角色
 async delete(){
    let id = this.ctx.request.query.id;
    if(!id){
      id = ""
    }
    let result = await this.ctx.service.admin.roleService.deleteOne(id);
    if(result == 1){
      this.ctx.body = {
        code:1,
        message:'删除角色成功',
        data:null
      }
    }else{
      this.ctx.body = {
        code:0,
        message:'删除角色失败',
        data:null
      }
    }

  }
  // 角色授权
  async auth(){
    let id = decodeURIComponent(this.ctx.request.query.id);
    // 返回当前角色id下的权限id
    let result =await this.ctx.service.admin.roleService.getRoleAccess(id);
    let accessList =await this.ctx.service.admin.accessSevice.findAccess();
    await this.ctx.render('/admin/role/auth',{
      id,
      accessList,
      result
    })
  }
  async doAuth (){
    let formData = this.ctx.request.body;
    let accessNode = formData.accessNode;
    let roleId = Number(formData.roleId);
    try{
      await accessNode.forEach(async (item,index) => {
        await  this.ctx.service.admin.roleService.addAccess(roleId,item)
       });
      this.ctx.body = {
        code:1,
        message:'添加权限成功',
        data:null
      }
    }catch(e){
      this.ctx.body = {
        code:0,
        message:'添加权限失败',
        data:null
      }
    }
  }


}

module.exports = RoleController;
