'use strict';

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
}

module.exports = HomeController;
