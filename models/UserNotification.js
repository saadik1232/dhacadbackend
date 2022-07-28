var Sequelize = require("sequelize");
var sequelize = require("../configs/database");

const UserNotification = sequelize.define("UserNotification", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  start_date: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  end_date: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  user_name: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  user_address: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});
module.exports = UserNotification;
