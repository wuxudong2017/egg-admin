'use strict';

const BaseController = require('./base');

class ManageController extends BaseController {
  async index() {
    let result = await this.ctx.service.admin.auth.getUserList();
    console.log(JSON.stringify(result))
    await this.ctx.render('/admin/manage/index',{
      result
    })
  }
  async add() {
    // 查询角色列表
    let roleList = await this.ctx.service.admin.auth.getRoleList();
    await this.ctx.render('/admin/manage/add',{
      roleList
    })
  }
  async doAdd() {
    let formData = this.ctx.request.body;    
  let username = formData.username,
      password = await this.ctx.service.tools.md5(formData.password),
      mobile = formData.mobile,
      email = decodeURIComponent(formData.email),
      roleId = formData.roleId;
      let result = await this.ctx.service.admin.auth.addOneUser(username,password,mobile,email,roleId);
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
    let id = this.ctx.request.query._id;
    let result = await this.ctx.service.admin.auth.findUser(id);
    let roleList = await this.ctx.service.admin.auth.getRoleList();
    await this.ctx.render('/admin/manage/edit',{
      result,
      roleList
    })
  }
  async doEdit(){

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
    let result = await this.ctx.service.admin.auth.deleteUser(id)
    console.log(result)


  }
}

module.exports = ManageController;
