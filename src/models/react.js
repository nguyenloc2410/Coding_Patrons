"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class React extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      React.belongsTo(models.Post, { foreignKey: "postid" });
      React.belongsTo(models.Post, { foreignKey: "userid" });
    }
  }
  React.init(
    {
      quantity: DataTypes.INTEGER,
      postid: DataTypes.INTEGER,
      userid: DataTypes.ARRAY(DataTypes.INTEGER),
    },
    {
      sequelize,
      modelName: "React",
    }
  );
  return React;
};
