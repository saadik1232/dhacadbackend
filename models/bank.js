/**
 * Sequelize Library and Connection Imported
 */
var Sequelize = require("sequelize");
var sequelize = require("../configs/database");

/**
 * Bank Model = [ id, title, message ]
 */
const Bank = sequelize.define("bank", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  accountName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  accountNo: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  accountPin: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Bank;
