/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('article', {
    id: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'title'
    },
    descript: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'descript'
    },
    seoTitle: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'seo_title'
    },
    type: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      field: 'type'
    },
    columnType: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'column_type'
    },
    img: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'img'
    },
    source: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'source'
    },
    tips: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      field: 'tips'
    },
    author: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'author'
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
    tableName: 'article'
  });

  Model.associate = function() {

  }

  return Model;
};
