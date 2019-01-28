'use strict';

const Service = require('egg').Service;

class BannerServiceService extends Service {
    // 添加一条数据
  async addOne(formData) {
      console.log(formData)
    let result = await this.app.model.Focus.create(formData);
    return result
  }
  // 查询全部数据,分页
  async getAllData(offset){
      let result = await this.app.model.Focus.findAndCountAll({
        limit:4,
        offset:(offset-1)*4,
       order: [['addTime', 'DESC']]
      });
      return result;
  }
  // 根据id 查询数据
  async getOneById(id){
    let  result = await this.app.model.Focus.findOne({
      where:{
        id
      }
    })
    return result;
  }
  // 根据id 更新 数据
  async updateOne(id,formData){
    return await this.app.model.Focus.update(formData,{
      where:{
        id
      }
    })
  }
  async deleteById(id){
    return await this.app.model.Focus.destroy({
      where:{
        id
      }
    })
  }


}

module.exports = BannerServiceService;
