'use strict';

const Controller = require('egg').Controller;

class NavController extends Controller {
  async index() {
    let result = await this.ctx.service.admin.navService.getNavList();

    await this.ctx.render('/admin/nav/index',{
        result
    })
  }
  async add(){
    let result = await  this.ctx.service.admin.navService.getFirstL({type:'1'})

    await this.ctx.render('/admin/nav/add',{
        result
    })
  }




  async doAdd(){
    let formData = this.ctx.request.body;
    let title = formData.title
    let postion = Number(formData.postion)
    let link = String(formData.link)
    let moduleId = formData.moduleId
    let status = Number(formData.status)
    console.log(formData)
    let id = await this.ctx.service.tools.uuid();
    let result = await this.ctx.service.admin.navService.addOne(id,title,postion,link,moduleId,status);
    if(!result){
        this.ctx.body = {
            code:0,
            message:'添加栏目失败',
            data:null
        }
    }else{
        this.ctx.body = {
            code:1,
            message:'添加栏目成功',
            data:null
        }
    }
  }

  async edit(){

  }

  async doEdit(){

  }


  async delete(){
    let id = this.ctx.request.query.id;
    let result = await this.ctx.service.admin.navService.deleteById(id);
    if(result == 0){
        this.ctx.body = {
            code:0,
            message:'删除栏目失败',
            data:null
        }
    }else{
        this.ctx.body = {
            code:1,
            message:'删除栏目成功',
            data:null
        }
    }
  }
}

module.exports = NavController;
