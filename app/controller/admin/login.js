'use strict';

const Controller = require('egg').Controller;
class LoginController extends Controller {
  async index() {
    await this.ctx.render('/admin/login')
  }
  // post登陆
  async doLogin(){
      let formData = this.ctx.request.body;
      let username = formData.username,
        password= await this.ctx.service.tools.md5(formData.password),
        captcha = formData.captcha;
    let result = await this.ctx.service.admin.auth.doLogin(username,password);
    if(captcha.toLocaleLowerCase() === this.ctx.session.captcha.toLocaleLowerCase()){
      if(result){
        this.ctx.session.userInfo = result
        await this.ctx.redirect('/admin')
    }else{
         this.ctx.body={
           code:0,
           message:'用户名或密码错误',
           data:null

        }
    }
    }else{
      this.ctx.body={
        code:0,
        message:'验证码错误',
        data:null

     }
    }
  }
  async layOut(){
    this.ctx.session.userInfo = null;
    await this.ctx.redirect('/admin/login') 
  }


}

module.exports = LoginController;
