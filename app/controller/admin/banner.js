'use strict';
const path = require('path');
const fs = require('fs')
const md5 = require('md5');
const pump = require('mz-modules/pump');
const Controller = require('egg').Controller;

class BannerController extends Controller {
  async index() {
    let offset = this.ctx.request.query.page?Number(this.ctx.request.query.page):1
    let result = await this.ctx.service.admin.bannerService.getAllData(offset)
    await this.ctx.render('/admin/banner/index',{
        result
    })
  }
  async add(){
    await this.ctx.render('/admin/banner/add')
  }
  async doAdd(){
    try{
      let id = await this.ctx.service.tools.uuid();
    // 获取文档流
    let stream =await this.ctx.getFileStream();
    let formData = stream.fields;
    let md5s = md5(stream.filename+stream.length)
    // 上传文件目录
    let dir = path.join(this.app.config.uploadDir+'/banner',md5s+''+path.extname(stream.filename).toLowerCase());
    let saveDir = dir.slice(3).replace(/\\/g, '/');
    let writeStream  = fs.createWriteStream(dir);
    await pump(stream,writeStream);

    formData.id = id
    formData.focusImg = saveDir;
    formData.type = Number(formData.type)
    formData.status = Number(formData.status)
    formData.sort = Number(formData.sort)
    formData.addTime = await this.ctx.service.tools.getTime()
    let result = await this.ctx.service.admin.bannerService.addOne(formData);
    this.ctx.body = {
      code:1,
      message:'添加轮播图成功',
      data:null
    }
    }catch(e){
      console.log(e)
      this.ctx.body = {
        code:0,
        message:'添加轮播图失败',
        data:null
      }
    }
}
  async edit(){
    let id = String(this.ctx.request.query.id)
    let result = await this.ctx.service.admin.bannerService.getOneById(id)
    await this.ctx.render('/admin/banner/edit',{
      result
    })
  }
  async doEdit(){
    let formData = this.ctx.request.body;
   try{
     if(!formData.focusImg){
       delete formData['focusImg']
     }
    formData.type = Number(formData.type)
    formData.status = Number(formData.status)
    formData.sort = Number(formData.sort)
    formData.addTime = await this.ctx.service.tools.getTime();
    let id = formData.id;
    console.log(JSON.stringify(formData))
    let result = await this.ctx.service.admin.bannerService.updateOne(id,formData)
    this.ctx.body = {
      code:1,
      message:'编辑轮播图成功',
      data:null
    }
    }catch(e){
      console.log(e)
      this.ctx.body = {
        code:0,
        message:'编辑轮播图失败',
        data:null
      }
    }
  }


  async delete(){
    let id = this.ctx.request.query.id;
    let result = await this.ctx.service.admin.bannerService.deleteById(id);
    if(result==0){
      this.ctx.body = {
        code:0,
        message:'删除轮播图失败',
        data:null
      }
    }else{
      this.ctx.body = {
        code:1,
        message:'删除轮播图成功',
        data:null
      }
    }
  }
}

module.exports = BannerController;
