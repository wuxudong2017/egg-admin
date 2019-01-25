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

}

module.exports = BannerServiceService;
