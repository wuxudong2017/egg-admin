'use strict';
const fs = require('fs');
const path = require('path');
const md5 = require('md5');
const sd = require('silly-datetime');
const mkDirp = require('mz-modules/mkdirp')
//故名思意 异步二进制 写入流
const awaitWriteStream = require('await-stream-ready').write;
//管道读入一个虫洞。
const sendToWormhole = require('stream-wormhole');
const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    await this.ctx.render('/admin/index.html')
  }
  // 图片验证码
  async captcha(){
   let result =  await this.ctx.service.tools.svgCaptcha();
    this.ctx.response.type = 'image/svg+xml'
    this.ctx.body = result.data
  }
  // 获取现在时间
  async getTime(){
    let d =new Date();
    return d.getTime()
  }
  // 文件上传服务
  async upload(){
      let ctx = this.ctx;
      // 文件上传 操作文件流
      const stream = await ctx.getFileStream(); 
      console.log(stream)
      // 新建一个文件名 ,使用md5 加密
      const filename = md5(stream.filename+stream.length)+path.extname(stream.filename).toLocaleLowerCase();
      // 生成绝对文件路径,存储
      let day = sd.format(new Date(),'YYYYMMDD')
      await mkDirp(path.join(this.app.config.uploadDir,day))
      const target = path.join(this.app.config.uploadDir,day,filename);
      console.log(target)
      // 生成一个文件,写入文件流
      const writeStream = fs.createWriteStream(target);
      try {
          await awaitWriteStream(stream.pipe(writeStream))
   
      } catch (error) {
          await sendToWormhole(stream);
          throw error;
      }
        //文件响应
          ctx.body = {
              link: target.slice(3).replace(/\\/g,'/')
          };
    }
}

module.exports = HomeController;
