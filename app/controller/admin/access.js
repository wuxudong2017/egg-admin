'use strict';

const Controller = require('egg').Controller;

class AccessController extends Controller {
    // 获取权限列表
  async index() {
    let offset = Number(this.ctx.request.query.page?this.ctx.request.query.page:1)
    let result  = await this.ctx.service.admin.accessSevice.findAccess(offset)
    await this.ctx.render('/admin/access/index',{
      result
    })
  }
  // 添加权限
  async add(){
    let val = {moduleId:'0'}
    let moduleList = await this.ctx.service.admin.accessSevice.findByVal(val)
    await this.ctx.render('/admin/access/add',{
      moduleList
    })
  }
  async doAdd(){
    let formData = this.ctx.request.body;
    let moduleName = decodeURIComponent(formData.moduleName);
    let type = Number(formData.type)
    let actionName = decodeURIComponent(formData.actionName)
    let moduleId = decodeURIComponent(formData.moduleId)
    let sort = decodeURIComponent(formData.sort)
    let description = decodeURIComponent(formData.description);
    let result = await this.ctx.service.admin.accessSevice.addOneAccess(moduleName,sort,type,actionName,moduleId,description)
    if(result){
      this.ctx.body={
        code:1,
        message:'添加权限成功',
        data:null
      }
    }else{
      this.ctx.body={
        code:0,
        message:'添加权限失败,权限名重复',
        data:null
      }
    }
  }

  // 编辑一个权限
  async edit(){
    let id = this.ctx.request.query.id?decodeURIComponent(this.ctx.request.query.id):'';
    let result =await this.ctx.service.admin.accessSevice.getOneResult(id);
    let val = {moduleId:'0'}
    let moduleList = await this.ctx.service.admin.accessSevice.findByVal(val)
    await this.ctx.render('/admin/access/edit',{
      result,
      moduleList
    })
  }
  async doEdit(){
    let id = this.ctx.request.query.id?decodeURIComponent(this.ctx.request.query.id):'';
    let formadata = this.ctx.request.body;
    let result = await this.ctx.service.admin.accessSevice.updateOneById(id,formadata)
  }


}

module.exports = AccessController;
