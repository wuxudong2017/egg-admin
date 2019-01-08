/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('user', {
    id: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'username'
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'password'
    },
    mobile: {
      type: DataTypes.BIGINT,
      allowNull: false,
      field: 'mobile'
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'email'
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
    },
    isSuper: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'is_super'
    }
  }, {
    tableName: 'user'
  });

  Model.associate = function() {
   
    console.log(app.model.User)
     app.model.User.belongsTo(app.model.UserRole,{foreignKey:"id",targetKey:"userId"})
  }

  return Model;
};
