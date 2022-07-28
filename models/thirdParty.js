/**
 * Sequelize Library and Connection Imported
 */
var Sequelize = require("sequelize");
var sequelize = require("../configs/database");

/**
 * Bank Model = [ id, title, message ]
 */
const thirdParty = sequelize.define("thirdParty", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  code: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  custId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    default: 0,
  },
});

module.exports = thirdParty;
