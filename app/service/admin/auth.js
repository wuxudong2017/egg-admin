'use strict';

const Service = require('egg').Service;

class AuthService extends Service {
  async doLogin(username,password) {
    let result = await this.app.model.User.findOne({
        where:{
            username,password
        }
    })
    if(result){
        return result
    }else{
        return false
    }
  }
  // 用户管理
  async getUserList(){
      let model = this.app.model;
     
   let result = await this.app.model.User.findAll({

       include:[{
           model:model.Role,
           attributes: ['id', 'title'],
       }],
       order: [['addTime', 'DESC']]
   })
    return result;
  }
  // username 查询用户
  async addOneUser(username,password,mobile,email,roleId){
    let addTime = await this.ctx.service.tools.getTime();
    let result = await this.app.model.User.findOne({
        where:{
            username
        }
    });
    if(result === null){
        await this.app.model.User.create({
            username,password,mobile,email,roleId,addTime
        })
        return true
    }else{
        return false
    }
  }



  // 查询一个用户
  async findUser(id){
      let result = await this.app.model.User.findOne({
          where:{
              id
          }
      })
      return result
  }

  /**
   * 角色管理
   */
  async getRoleList(){
      let result = await this.app.model.Role.findAll({
        order: [['addTime', 'DESC']]
      });
      return result;
  }




}

module.exports = AuthService;
