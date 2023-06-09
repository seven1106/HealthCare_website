"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  booking.init(
    {
      // id: DataTypes.INTEGER,
      statusId: DataTypes.INTEGER,
      doctorId: DataTypes.INTEGER,
      clientId: DataTypes.INTEGER,
      date: DataTypes.STRING,
      timeType: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "booking",
    }
  );
  return booking;
};
