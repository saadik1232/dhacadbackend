/**
 * Sequelize Library and Connection Imported
 */
var Sequelize = require("sequelize");
var sequelize = require("../configs/database");

/**
 * Subscription Model = [ id, title, description, cost, duration, usersAllowed, devicesAllowed ]
 */
const Subscription = sequelize.define("subscriptions", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  cost: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  duration: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  usersAllowed: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  devicesAllowed: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
});

module.exports = Subscription;
