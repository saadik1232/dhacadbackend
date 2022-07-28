var Sequelize = require("sequelize");
var Op = Sequelize.Op;
var sequelize = require("../configs/database");

/* ORM => Object Relational Model */
const ResponderMapLogs = sequelize.define("responder_map_logs", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  lat: {
    type: Sequelize.STRING,
    allowNull: false
  },
  long: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = ResponderMapLogs;
