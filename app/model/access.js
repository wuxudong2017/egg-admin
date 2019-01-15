/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('access', {
    id: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
      field: 'id'
    },
    moduleName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'module_name'
    },
    actionName: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'action_name'
    },
    type: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'type'
    },
    status: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      field: 'status'
    },
    moduleId: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'module_id'
    },
    sort: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'sort'
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'description'
    },
    url: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'url'
    },
    addTime: {
      type: DataTypes.BIGINT,
      allowNull: false,
      field: 'add_time'
    }
  }, {
    tableName: 'access'
  });

  Model.associate = function() {
    // 自关联查询
    app.model.Access.hasMany(app.model.Access, {foreignKey: 'moduleId',targetKey:'id', through: null });
  }

  return Model;
};
