'use strict';

const Service = require('egg').Service;

class NavServiceService extends Service {
  async getNavList() {
    return await this.app.model.Nav.findAndCountAll({
        include:{
            model:this.app.model.Nav
        },
        where:{
            moduleId:'0'
          },
        order:[['sort','ASC']]
    })
  }
  // 添加新的栏目
  async addOne(id,title,postion,link,moduleId,status){
      let type 
      if(moduleId !=0){
          type=2
      }else{
          type = 1
      }
      let addTime = await this.ctx.service.tools.getTime();
        let max = await this.app.model.Nav.max('sort') ;
       if(isNaN(max) ){
           max = 0
       }
        max+=1;
        let name = await this.app.model.Nav.findAll({
            where:{
                title
            }
        });
        if(name==""){
            let result = await this.app.model.Nav.create({
                id,title,postion,link,moduleId,status,addTime,
                sort:max,
                isOpennew:1,
                type,
                relation:1
            })
            return result;
           
        }else{
            return 0
        }
   

  }
// 根据id 删除数据
async deleteById(id){
    return await this.app.model.Nav.destroy({
        where:{
            id
        }
    })
}
async getFirstL(val){
    return await this.app.model.Nav.findAll({
        where:val
    })
}

}

module.exports = NavServiceService;
