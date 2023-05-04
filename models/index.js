const User = require("./User.js");
const Favorites = require("./Favorites.js");
const Schedule = require("./Schedule.js")

User.hasMany(Favorites, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

User.hasMany(Schedule, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
})

module.exports = { User, Favorites, Schedule };