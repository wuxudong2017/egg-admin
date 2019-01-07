'use strict';

const BaseController = require('./base');

class RoleController extends BaseController {
  async index() {
    await this.ctx.render('/admin/role/index')
  }
  async add() {
    await this.ctx.render('/admin/role/add')
  }
}

module.exports = RoleController;
