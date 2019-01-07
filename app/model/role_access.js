/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('roleAccess', {
    id: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      field: 'id'
    },
    accessId: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'access_id'
    },
    roleId: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'role_id'
    }
  }, {
    tableName: 'role_access'
  });

  Model.associate = function() {

  }

  return Model;
};
