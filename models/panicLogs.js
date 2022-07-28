/**
 * Sequelize Library and Connection Imported
 */
var Sequelize = require("sequelize");
var sequelize = require("../configs/database");

/**
 * Geofence Model = [ id, title, message ]
 */

const PanicLogs = sequelize.define("paniclogs", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  panicId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    default: 0,
  },
  operator: {
    type: Sequelize.INTEGER,
    allowNull: true,
    default: 0,
  },
  supervisor: {
    type: Sequelize.INTEGER,
    allowNull: true,
    default: 0,
  },
  responder: {
    type: Sequelize.INTEGER,
    allowNull: true,
    default: 0,
  },
  groupId: {
    type: Sequelize.INTEGER,
    allowNull: true,
    default: 0,
  },
  action: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});
module.exports = PanicLogs;
