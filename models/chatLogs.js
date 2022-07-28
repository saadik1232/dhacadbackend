/**
 * Sequelize Library and Connection Imported
 */
var Sequelize = require("sequelize");
var sequelize = require("../configs/database");

/**
 * Geofence Model = [ id, title, message ]
 */

const ChatLogs = sequelize.define("chatlogs", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
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
});
module.exports = ChatLogs;
