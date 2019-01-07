/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('role', {
    id: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'user',
        key: 'role_id'
      },
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
    app.model.Role.hasOne(app.model.User,{})
  }

  return Model;
};
