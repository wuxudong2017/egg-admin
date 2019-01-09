'use strict';

const BaseController = require('./base');

class ManageController extends BaseController {
  async index() {
    let offset = Number(this.ctx.request.query.page);
    let result = await this.ctx.service.admin.authService.getUserList(offset);
    console.log(JSON.stringify(result))
    await this.ctx.render('/admin/manage/index',{
      result
    })
  }
  async add() {
    // 查询角色列表
    let roleList = await this.ctx.service.admin.roleService.usedRole();
    await this.ctx.render('/admin/manage/add',{
      roleList
    })
  }
  async doAdd() {
    let formData = this.ctx.request.body;    
  let username = decodeURIComponent(formData.username),
      password = await this.ctx.service.tools.md5(formData.password),
      mobile = formData.mobile,
      email = decodeURIComponent(formData.email),
      roleId = formData.roleId;
      let result = await this.ctx.service.admin.authService.addOneUser(username,password,mobile,email,roleId);
      if(result){
        this.ctx.body = {
          code:1,
          message:'添加用户成功',
          data:null
        }
      }else{
        this.ctx.body = {
          code:0,
          message:'用户名已存在',
          data:null
        }
      }
  }
  // 编辑用户
  async edit(){
    let id = this.ctx.request.query.id;
    let result = await this.ctx.service.admin.authService.findUser(id);
    let roleList = await this.ctx.service.admin.roleService.usedRole();
    await this.ctx.render('/admin/manage/edit',{
      result,
      roleList
    })
  }
  async doEdit(){
    let formData = this.ctx.request.body;
    let username = formData.username,
    id = formData.id,
    password = await this.ctx.service.tools.md5(formData.password),
    mobile = formData.mobile,
    email = decodeURIComponent(formData.email),
    roleId = formData.roleId;
    let result = await this.ctx.service.admin.authService.updateOneUser(id,username,password,mobile,email,roleId);
    if(result){
      this.ctx.body = {
        code:1,
        message:'编辑用户成功',
        data:null
      }
    }else{
      this.ctx.body = {
        code:0,
        message:'编辑名已存在',
        data:null
      }
    }
  }

  // 删除用户
  async delete(){
    let query = this.ctx.request.query;
    let id = '';
    console.log(query)
    if(query.id !='undefined'){
      id = query.id
    }else{
      id = ''
    }
    let result = await this.ctx.service.admin.authService.deleteUser(id)
    if(result){
      this.ctx.body = {
        code:1,
        message:'删除用户成功',
        data:null
      }
    }else{
      this.ctx.body = {
        code:0,
        message:'删除用户失败',
        data:null
      }
    }


  }
}

module.exports = ManageController;
