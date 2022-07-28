/**
 * Sequelize Library and Connection Imported
 */
var Sequelize = require("sequelize");
var sequelize = require("../configs/database");

/**
 * Geofence Model = [ id, title, message ]
 */
const Geofence = sequelize.define("geofence", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  geofenceId: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Geofence;
