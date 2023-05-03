const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Favorites extends Model {}

Favorites.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    favorite_dish: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "favorites",
  }
);

module.exports = Favorites;