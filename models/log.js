/**
 * Sequelize Library and Connection Imported
 */
var Sequelize = require("sequelize");
var sequelize = require("../configs/database");

/**
 * Log Model = [ id, title, message ]
 */
const Log = sequelize.define("logs", {
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
  message: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  data: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  user: {
    type: Sequelize.INTEGER,
    allowNull: false,
    byDefault: 0,
  },
});

module.exports = Log;
