/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('roleAccess', {
    id: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      primaryKey: true,
      field: 'id'
    },
    accessId: {
      type: DataTypes.STRING(255),
      allowNull: false,
      references: {
        model: 'access',
        key: 'id'
      },
      field: 'access_id'
    },
    roleId: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      references: {
        model: 'role',
        key: 'id'
      },
      field: 'role_id'
    }
  }, {
    tableName: 'role_access'
  });

  Model.associate = function() {
      app.model.RoleAccess.hasOne(app.model.Role,{foreignKey:'id',targetKey:'roleId'})
     
  }

  return Model;
};
