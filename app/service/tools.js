'use strict';

const Service = require('egg').Service;
const svgCaptcha = require('svg-captcha');
const uuid = require('uuid/v1')
const md5 =require('md5')
class ToolsService extends Service {
  async md5(val) {
    return md5(val)
  }
  async svgCaptcha(){
    let captcha = svgCaptcha.create({
      size:4,
      fontSize: 36, 
      width: 100, 
      height:32,
      background:"#cc9966" 
    })
    this.ctx.session.captcha = captcha.text;
    return captcha
  }
  async getTime(){
    let d = new Date();
    return d.getTime()
  }
  // uuid 生成id
  async uuid(){
    return uuid()
  }


}

module.exports = ToolsService;
