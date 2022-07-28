var Sequelize = require("sequelize");
var Op = Sequelize.Op;
var sequelize = require("../configs/database");

/* ORM => Object Relational Model */
const ServiceProvider = sequelize.define("service_provider", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lat: {
    type: Sequelize.STRING,
    allowNull: false
  },
  long: {
    type: Sequelize.STRING,
    allowNull: false
  },
  radius: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

module.exports = ServiceProvider;
