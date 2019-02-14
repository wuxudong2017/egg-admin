'use strict';

const Service = require('egg').Service;
const Sequelize = require('sequelize')
class ArticleServiceService extends Service {
    async index() {
        let {model} = this.app
        return await this.app.model.Article.findAndCountAll({
          include:[{
              model:model.Nav,
              attributes:[]
          }],
          attributes:{
              include:[
                [Sequelize.col('nav.title'),'navTitle']
              ]
          },
           raw:true
        })
    }
    // 根据id 查询数据
    async getOne(id){
        let { model } = this.app;
        return await this.app.model.Article.findOne({
            include: [{
                model: model.Content,
                attributes:[]
            }],
            attributes: {
                include: [
                    [Sequelize.col('content.content'), 'content']
                ]
            },
            where:{
                id
            },
            raw: true,
        })
    }


    ///添加文章

    async addArticle(title, seoTitle, descript, type, columnType, img, source, author, content) {
        const { model } = this.app;
        const t = await model.transaction();
        let id = await this.ctx.service.tools.uuid();
        let addTime = await this.ctx.service.tools.getTime();
        let tips = 0;
        let status = 2;
        try {
            await model.Article.create({
                id, title, seoTitle, type, columnType, img, source, author, addTime, descript, tips, status
            })
            await model.Content.create({
                id, content
            })
            await t.commit();
            return true;
        } catch (e) {
            console.log(e);
            await t.rollback();
            return false
        }
    }

    // 添加单页面内容
    async addOnePage(id, title, content, status, banner) {
        let { model } = this.app
        let result = await model.ColumnPage.findOne({
            where: {
                id
            }
        })
        if (!result) {
            await model.ColumnPage.create({
                id, title, status, banner, content
            });
            return true
        } else {
            await model.ColumnPage.update({
                title, status, banner, content
            }, {
                    where: {
                        id
                    }
                });
            return true
        }
    }
    async getOnePage(id) {
        let result = await this.app.model.ColumnPage.findOne({
            where: {
                id
            }
        })
        return result
    }
    // 获取栏目列表
    async cloumnList() {
        let result = await this.app.model.Nav.findAll({
            where: {
                type: 2
            }
        });
        return result
    }
    async updateArticle(id,title,seoTitle, descript,type,columnType,img,source,author, content){
        let {model} = this.app;
        const t = await model.transaction();
        try {
            await model.Article.update({
                 title, seoTitle, type, columnType, img, source, author, descript
            },{
                where:{
                    id
                }
            })
            await model.Content.update({
                 content
            },{
                where:{
                    id
                }
            })
            await t.commit();
            return true;
        } catch (e) {
            console.log(e);
            await t.rollback();
            return false
        }



    }
}

module.exports = ArticleServiceService;
