const sequelize = require("../config/connection");
const { User, Favorites, Schedule } = require("../models");

const userData = require("./userData.json");
const favoritesData = require("./favoritesData.json");
const schedulesData = require("./scheduleData.json");


// TODO: Add Favorites (Many to One) & Schedule (Many to One) to bulk creation (Erik to complete)

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Favorites.bulkCreate(favoritesData, {
    individualHooks: false,
    returning: true,
  });

  await Schedule.bulkCreate(schedulesData, {
    individualHooks: false,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
