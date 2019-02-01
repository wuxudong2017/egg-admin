'use strict';

const Controller = require('egg').Controller;

class ArticleController extends Controller {
  async index() {
    let result = await this.ctx.service.admin.articleService.index()
    await this.ctx.render('/admin/article/index',{
      result
    })
    
  }
  // 添加文章
  async add(){
      let colum = await this.ctx.service.admin.articleService.cloumnList()


      await this.ctx.render('/admin/article/add',{
        colum
      })
  }
  async doAdd(){
      let formData = this.ctx.request.body;
      console.log(formData)
      let title=formData.title,
      seoTitle=formData.seoTitle,
      type=formData.type,
      columnType=formData.columnType,
      img=formData.img,
      source=formData.source,
      author=formData.author,
      descript = formData.descript,
      content=formData.content;
      let result = await this.ctx.service.admin.articleService.addArticle(title,seoTitle, descript,type,columnType,  img,source,author, content)


  }
  // 编辑网站单页面应用
  async editPage(){
    let id = this.ctx.params.id;
    let result = await this.ctx.service.admin.navService.getOne({id});
    let con = await this.ctx.service.admin.articleService.getOne({id});
    await this.ctx.render('/admin/article/editPage',{
      result,
      con
    })
    console.log(id)
  }
  // 编辑单页
  async doEditPage(){
    let formData = this.ctx.request.body;
    let id = formData.id;
    let title = formData.title;
    let content=formData.content;
    let status = Number(formData.status);
    let banner = formData.banner
    let result =   await this.ctx.service.admin.articleService.addOnePage(id,title,content,status,banner);
    if(result){
      this.ctx.body={
        code:1,
        message:'编辑成功',
        data:null
      }

    }else{
      this.ctx.body={
        code:0,
        message:'编辑失败',
        data:null
      }
    }
  }


}

module.exports = ArticleController;
