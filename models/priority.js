/**
 * Sequelize Library and Connection Imported
 */
var Sequelize = require("sequelize");
var sequelize = require("../configs/database");

/**
 * Priority Model = [ id, name, active ]
 */
const Priority = sequelize.define("priority", {
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

module.exports = Priority;
