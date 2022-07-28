/**
 * Sequelize Library & Connection Imported
 */
var Sequelize = require("sequelize");
var sequelize = require("../configs/database");

/**
 * Role Database Model = [ id, name, active ]
 */
const Role = sequelize.define("role", {
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
    allowNull: false,
  },
});

module.exports = Role;
