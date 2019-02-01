/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('content', {
    id: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
      field: 'id'
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'content'
    }
  }, {
    tableName: 'content'
  });

  Model.associate = function() {

  }

  return Model;
};
