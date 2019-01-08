/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('role', {
    id: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'title'
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'description'
    },
    status: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'status'
    },
    addTime: {
      type: DataTypes.BIGINT,
      allowNull: true,
      field: 'add_time'
    }
  }, {
    tableName: 'role'
  });

  Model.associate = function() {

    app.model.Role.belongsToMany(app.model.UserRole,{foreignKey:"id",targetKey:"roleId",through:'role'})
  }

  return Model;
};
