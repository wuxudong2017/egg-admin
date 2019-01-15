'use strict';

const Service = require('egg').Service;

class RoleService extends Service {
 
    /**
     * 角色管理
     */
    async index(offset){
        let result = await this.app.model.Role.findAndCountAll({
        limit:4,
        offset:(offset-1)*4,
        order: [['addTime', 'DESC']]
        });
        return result;
    }
    // 新加一个角色
    async addOneRole(title,description,status){
        let addTime = await this.ctx.service.tools.getTime();
        let result = await this.app.model.Role.findOne({
            where:{
                title
            }
        });
        if(result === null){
            await this.app.model.Role.create({
                title,description,status,addTime
            })
            return true
        }else{
            return false
        }
    }
    // 根据id 查询一个角色
    async getOneRole(id){
        let result = await this.app.model.Role.findOne({
            where:{
                id
            }
        })
        return result
    }
    // 编辑一个角色信息
    async editRole(id,title,description,status){
        let result = await this.app.model.Role.update({
            title,description,status
        },{
            where:{
                id
            }
        })
        return result
    }
    // 查询不被禁用的角色
    async usedRole(){
        let result = await this.app.model.Role.findAll({
          where:{
              status:{
                $gt:0
              }
          },
          order: [['addTime', 'DESC']]
        })
        return result
    }
    // 根据id 删除一个角色
    async deleteOne(id){
        let result = await this.app.model.Role.destroy({
            where:{
                id
            }
        })
        return result
    }
    // 查询用户角色
    async getAuth(id){
        console.log(id)
    }
    // 为角色添加权限
    async addAccess(roleId,res){
        const t = await this.app.model.transaction();
        let result = await this.app.model.RoleAccess.findOne({
            where:{roleId}
        });
        console.log(res)
        if(result){
            try{
                await this.app.model.RoleAccess.destroy({
                    where:{
                        roleId
                    }
                });
                await this.app.model.RoleAccess.bulkCreate(res,{
                    ignoreDuplicates : true
                });
                await t.commit();
                return true
            }catch(e){
                console.log(e)
                await t.rollback();
                return false;
    
            }
        }else{
            await this.app.model.RoleAccess.bulkCreate(res,{
                ignoreDuplicates : true
            });
        }
    }
    async getRoleAccess(id){
        let result =await this.app.model.RoleAccess.findAll({
            where:{
                roleId:id
            }
        })

        return result;
    }
    //数据处理
    async dataBase(result,accessList){
        let json = accessList;
        let json2 = result;
        json2.forEach(item => {
            json['rows'].forEach(itemA => {
                if(itemA.id === item.accessId){
                    itemA.checked = true
                }
                itemA['accesses'].forEach(itemB =>{
                    if(itemB.id ===item.accessId ){
                         itemB.checked = true
                    }
                })
            })
         })
         return json
    }


}

module.exports = RoleService;
