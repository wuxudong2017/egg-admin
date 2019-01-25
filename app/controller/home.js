'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'hi, egg';
  }
  // 测试页面
  async test(){
    await this.ctx.render('test',{
      result:'Hello Wrold'
    })
  }
}

module.exports = HomeController;
