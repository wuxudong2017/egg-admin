'use strict';

const Service = require('egg').Service;

class NavServiceService extends Service {
    async getNavList(offset) {
        return await this.app.model.Nav.findAndCountAll({
            include: {
                model: this.app.model.Nav
            },
            where: {
                moduleId: '0'
            },
            // 是否启用分页
            //   limit:4,
            //   offset:(offset-1)*4,
            order: [['sort', 'ASC']]
        })
    }
    // 添加新的栏目
    async addOne(id, title, postion, link, moduleId, status, columnType) {
        let type
        if (moduleId != 0) {
            type = 2
        } else {
            type = 1
        }
        let addTime = await this.ctx.service.tools.getTime();
        let max = await this.app.model.Nav.max('sort');
        if (isNaN(max)) {
            max = 0
        }
        max += 1;
        let name = await this.app.model.Nav.findAll({
            where: {
                title
            }
        });
        if (name == "") {
            let result = await this.app.model.Nav.create({
                id, title, postion, link, moduleId, status, addTime,
                sort: max,
                isOpennew: 1,
                type,
                relation: 1,
                columnType
            })
            return result;

        } else {
            return 0
        }


    }
    // 根据id 删除数据
    async deleteById(id) {
        return await this.app.model.Nav.destroy({
            where: {
                id
            }
        })
    }
    async getFirstL(val) {
        return await this.app.model.Nav.findAll({
            where: val
        })
    }
    async getOne(val) {
        return await this.app.model.Nav.findOne({
            where: val
        })
    }
    // 根据ID 跟新数据
    async updateOne(id, title, postion, link, moduleId, status, columnType) {
        return await this.app.model.Nav.update({
            title, postion, link, moduleId, status, columnType
        },{
            where:{
                id
            }
        })


    }
}

module.exports = NavServiceService;
