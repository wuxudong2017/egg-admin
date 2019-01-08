'use strict';

const Service = require('egg').Service;
const Sequelize = require('sequelize');
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
     // 多表关联查询数据,并重新命名字段名
   let result = await this.app.model.User.findAndCountAll({
        include:[{
            model:model.UserRole,
            include:[{
                model:model.Role,
                attributes:[],
                raw:true,
                nested: false 
            }],
            attributes:[],
            raw:true,
             all: true, nested: true 
        }],
        attributes:{include:[
            [Sequelize.col('userRole.role_id'),'roleId'],
            [Sequelize.col('userRole->role.title'),'roleName'],
        ]},
        raw:true,
       order: [['addTime', 'DESC']]
   })
    return result;
  }
  // 通过username 插叙一个用户
  async getUserByUserName(username,opt){
    let result = await this.app.model.User.findOne({
        where:{
            username
        }
    });
   if(!result) throw new Error('用户名不存在')
  }
  

  // 新加用户
  async addOneUser(username,password,mobile,email,roleId){
    let addTime = await this.ctx.service.tools.getTime();
    this.app.model.transaction((t) =>{
         this.getUserByUserName(username,{transaction:t});
        this.app.model.User.create({
            username,password,mobile,email,roleId,addTime
        },{transaction:t})
    })

    // let result = await this.app.model.User.findOne({
    //     where:{
    //         username
    //     }
    // });/';
    // let addTime = await this.ctx.service.tools.getTime();
    // if(result === null){
    //     await this.app.model.User.create({
    //         username,password,mobile,email,roleId,addTime
    //     })
    //     return true
    // }else{
    //     return false
    // }
  }
  // 查询一个用户
  async findUser(id){
      let model = this.app.model
      let result = await this.app.model.User.findOne({
        attributes:{include:[
            [Sequelize.col('userRole.role_id'),'roleId'],
        ]},
            include:[{
                model:model.UserRole,
                include:[{
                    model:model.Role,
                    attributes:[[Sequelize.col('title'),'title']],                
                }],
                attributes:[]
            }],
            raw:true,
       })
      return result
  }
  // 删除一个用户
  async deleteUser(id){
      let result = await this.app.model.User.destroy({
          where:{
              id
          }
      })
      return result;
  }




}

module.exports = AuthService;
