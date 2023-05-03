const sequelize = require("../config/connection");
const { User, Favorites, Schedule } = require("../models");

const userData = require("./userData.json");

// TODO: Add Favorites (Many to One) & Schedule (Many to One) to bulk creation (Erik to complete)

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
