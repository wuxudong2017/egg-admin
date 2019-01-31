'use strict';

const Controller = require('egg').Controller;

class ArticleController extends Controller {
  async index() {
    await this.ctx.render('/admin/article/index')
  }
  // 添加文章
  async add(){
      await this.ctx.render('/admin/article/add')
  }
  async doAdd(){
      let formData = this.ctx.request.body;
      console.log(formData)
  }
  // 编辑网站单页面应用
  async editPage(){
    let id = this.ctx.params.id;
    let result = await this.ctx.service.admin.navService.getOne({id});
    await this.ctx.render('/admin/article/editPage',{
      result
    })
    console.log(id)
  }


}

module.exports = ArticleController;
