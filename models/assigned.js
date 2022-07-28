var Sequelize = require("sequelize");
var Op = Sequelize.Op;
var sequelize = require("../configs/database");

/* ORM => Object Relational Model */
const Assigned = sequelize.define("assigned", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  responder_status: {
    type: Sequelize.INTEGER,
    default: 0
  },
  responderId: {
    type: Sequelize.INTEGER,
    default: 0
  }
});

module.exports = Assigned;
