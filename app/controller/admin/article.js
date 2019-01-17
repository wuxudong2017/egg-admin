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
}

module.exports = ArticleController;
