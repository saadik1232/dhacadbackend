/**
 * Sequelize Library and Connection Imported
 */
var Sequelize = require("sequelize");
var sequelize = require("../configs/database");

/**
 * Status Model = [ id, name, active ]
 */
const Status = sequelize.define("status", {
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
  active: {
    type: Sequelize.BOOLEAN,
    default: true,
  },
});

module.exports = Status;
