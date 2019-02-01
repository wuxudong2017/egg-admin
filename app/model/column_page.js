/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('columnPage', {
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
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'content'
    },
    banner: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'banner'
    },
    status: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'status'
    }
  }, {
    tableName: 'column_page'
  });

  Model.associate = function() {

  }

  return Model;
};
