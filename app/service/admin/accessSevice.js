'use strict';

const Service = require('egg').Service;

class AccessSeviceService extends Service {
    // 查询所有权限
  async findAccess(offset) {
    let result = await this.app.model.Access.findAndCountAll({
      include:{
        model:this.app.model.Access,
      },
      where:{
        moduleId:'0'
      },
      limit:4,
      offset:(offset-1)*4,
      order:[['addTime','DESC']]
    });
    return result;


    
    // let result = await this.app.model.Access.findAndCountAll();
    // return result;
  }
  // 根据传值查询
  async findByVal(val){
    let result  =await this.app.model.Access.findAll({
      where:val
    })
    return result
  }
  // 根据传值查询一个数据
  async getOneResult(val){
    let result  =await this.app.model.Access.findOne({
      where:val
    })
    return result
  }

  // 添加一个权限
  async addOneAccess(moduleName,sort,type,url,actionName,moduleId,description){
      let id = await this.ctx.service.tools.uuid();
      let addTime = await this.ctx.service.tools.getTime();

      let val = await this.app.model.Access.findAll({
        where:{moduleName}
      });
      let result = await this.app.model.Access.create({
        id,moduleName,type,url,sort,actionName,moduleId,description,addTime
      })
      return result;
      // if(!val){
      //   let result = await this.app.model.Access.create({
      //     id,moduleName,type,sort,actionName,moduleId,description,addTime
      //   })
      //   return result;
      // }else{
      //   return false
      // }
  }
  // 编辑一个权限
  async updateOneById(id,type,actionName,url,moduleId,sort,description){
    console.log(`service--id------->${id}`)
    const t = await this.app.model.transaction();
    try{
        await this.app.model.Access.findOne({
          where:{
            id
          }
        },{transaction:t});
        await this.app.model.Access.update({type,actionName,url,moduleId,sort,description},{
          where:{id}
        },{transaction:t})
      await  t.commit();
      return true
    }catch(e){
      console.log(e)

      await t.rollback();
      return false
    }
  }
  // 删除一个权限
  async deleteOne(id){
    return await this.app.model.Access.destroy({
      where:{id}
    })
  }

}

module.exports = AccessSeviceService;
