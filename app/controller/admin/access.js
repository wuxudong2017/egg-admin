'use strict';

const Controller = require('egg').Controller;

class AccessController extends Controller {
    // 获取权限列表
  async index() {
    let result  = await this.ctx.service.admin.accessSevice.findAccess()
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
    let url = Boolean(formData.url)?decodeURIComponent(formData.url):"";

    let result = await this.ctx.service.admin.accessSevice.addOneAccess(moduleName,actionName,type,moduleId,sort,description,url)
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
    let result =await this.ctx.service.admin.accessSevice.getOneResult({id});
    let val = {moduleId:'0'}
    let moduleList = await this.ctx.service.admin.accessSevice.findByVal(val)
    await this.ctx.render('/admin/access/edit',{
      result,
      moduleList
    })
  }
  async doEdit(){
    let formdata = this.ctx.request.body;
    console.log(JSON.stringify(formdata))
    let id = decodeURIComponent(formdata.id);
    let moduleName = decodeURIComponent(formdata.moduleName),
    type= decodeURIComponent(formdata.type),
    actionName= decodeURIComponent(formdata.actionName),
    url= decodeURIComponent(formdata.url),
    moduleId= decodeURIComponent(formdata.moduleId),
    sort= decodeURIComponent(formdata.sort),
    description= decodeURIComponent(formdata.description);
    let result = await this.ctx.service.admin.accessSevice.updateOneById(id,moduleName,type,actionName,url,moduleId,sort,description);
    if(result){
      this.ctx.body = {
        code:1,
        data:null,
        message:'编辑成功'
      }
    }else{
      this.ctx.body = {
        code:0,
        data:null,
        message:'编辑失败'
      }
    }
  }
  // 删除一个权限
  async delete(){
    let id = this.ctx.request.query.id;
    let result = await this.ctx.service.admin.accessSevice.deleteOne(id);
    if(Number(result) ===1){
      this.ctx.body = {
        code:1,
        data:null,
        message:'删除成功'
      }
    }else{
      this.ctx.body = {
        code:0,
        data:null,
        message:'删除失败'
      }
    }
  }


}

module.exports = AccessController;
