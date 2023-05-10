const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Schedule extends Model {}

// Add week number field if we add more multiple weeks

Schedule.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    meal: {
      type: DataTypes.ENUM("Breakfast", "Lunch", "Dinner"),
      allowNull: true,
    },
    day: {
      type: DataTypes.ENUM("Mon", "Tues", "Weds", "Thurs", "Fri", "Sat", "Sun"),
      allowNull: true
    },
    dish: {
      type: DataTypes.STRING,
      allowNull: true
    },
    user_id: {
      type:DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "schedules",
  }
);

module.exports = Schedule;