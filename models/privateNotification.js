var Sequelize = require("sequelize");
var sequelize = require("../configs/database");

const privatenotification = sequelize.define("privatenotification", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  heading: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  Message: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  image_name: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  active: {
    type: Sequelize.BOOLEAN,
    allowNull: true,
  },
  priority: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  FCM_token: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  contact: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  time: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  viewed: {
    type: Sequelize.BOOLEAN,
    allowNull: true,
  },
});
module.exports = privatenotification;
