/**
 * Sequelize Library and Connection Imported
 */
var Sequelize = require("sequelize");
var sequelize = require("../configs/database");

/**
 * Geofence Model = [ id, title, message ]
 */

const NotificationLogs = sequelize.define("notificationlogs", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  Title: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  Message: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  sendUserId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  sendUserName: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  recieveUserId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  recieveUserName: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  data: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  status: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    default: 0,
  },
});
module.exports = NotificationLogs;
