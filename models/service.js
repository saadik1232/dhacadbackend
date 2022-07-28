/**
 * Sequelize Library and Connection Imported
 */
var Sequelize = require("sequelize");
var sequelize = require("../configs/database");

/**
 * Service Model = [ id, name, active ]
 */
const Service = sequelize.define("service", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = Service;
