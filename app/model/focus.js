/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('focus', {
    id: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
      field: 'id'
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'title'
    },
    type: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      field: 'type'
    },
    focusImg: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'focus_img'
    },
    link: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'link'
    },
    sort: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      field: 'sort'
    },
    status: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      field: 'status'
    },
    addTime: {
      type: DataTypes.BIGINT,
      allowNull: false,
      field: 'add_time'
    }
  }, {
    tableName: 'focus'
  });

  Model.associate = function() {

  }

  return Model;
};
