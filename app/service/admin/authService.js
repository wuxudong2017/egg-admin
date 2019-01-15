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
  async getUserList(offset){
      let model = this.app.model;
     // 多表关联查询数据,并重新命名字段名
   let result = await this.app.model.User.findAndCountAll({
        include:[{
            model:model.UserRole,
            include:[{
                model:model.Role,
                attributes:[],
                raw:true, 
            }],
            attributes:[],
            raw:true,
        }],
        attributes:{include:[
            [Sequelize.col('userRole.role_id'),'roleId'],
            [Sequelize.col('userRole->role.title'),'roleName'],
        ]},
        raw:true,
        limit:4,
        offset:(offset-1)*4,
       order: [['addTime', 'DESC']]
   })
    return result;
  }
  // 通过username 查询一个用户
  async getUserByUserName(username,opt){
    let result = await this.app.model.User.findOne({
        where:{
            username
        }
    });
   return result
  }
  // 新加用户
  async addOneUser(username,password,mobile,email,roleId){
    let addTime = await this.ctx.service.tools.getTime();
    let result = await this.app.model.User.findOne({
        where:{
            username
        }
    });
    const t = await this.app.model.transaction({autoCommit:true});
    const uuid = await this.ctx.service.tools.uuid()
    if(result === null){
        try {
            await this.app.model.User.create({
                id:uuid,username,password,mobile,email,roleId,addTime
            },{transaction:t})
           await this.app.model.UserRole.create({
               userId:uuid,
               roleId,
           },{transaction:t})
           await t.commit()
           return true;
        }catch(e){
            console.log(e)
            await t.rollback()
            return false
        }
    }else{
        return false
    }
  }
  // 查询一个用户
  async findUser(id){
      let model = this.app.model
      let result = await this.app.model.User.findOne({
          where:{
              id
          },
        include:[{
            model:model.UserRole,
            include:[{
                model:model.Role,
                attributes:[],
                raw:true, 
            }],
            attributes:[],
            raw:true,
        }],
        attributes:{include:[
            [Sequelize.col('userRole.role_id'),'roleId'],
            [Sequelize.col('userRole->role.title'),'roleName'],
        ]},
        raw:true,
       order: [['addTime', 'DESC']]
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
  // 更新一个用户的信息 
  async updateOneUser(id,username,password,mobile,email,roleId){
      console.log(`roleId====>${roleId}`)
      let result = await this.app.model.User.update({
        username,password,mobile,email,roleId,
      },{
        where:{
            id
        }
      })
      await this.app.model.UserRole.update({
        roleId,
      },{
        where:{
            userId:id
        }
      })
      return result;
  }




}

module.exports = AuthService;
