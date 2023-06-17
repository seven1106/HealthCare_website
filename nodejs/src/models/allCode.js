"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class allCode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  allCode.init(
    {
      key: DataTypes.STRING,
      type: DataTypes.STRING,
      value_en: DataTypes.STRING,
      value_vi: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "allCode",
    }
  );
  return allCode;
};
