/**
 * Sequelize Library and Connection Imported
 */
var Sequelize = require("sequelize");
var sequelize = require("../configs/database");

/**
 * Panic Model = [ id, lat, lng, address, contact, cancellation, remarks, closedBy ]
 */
const Panic = sequelize.define("panic", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  lat: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lng: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  contact: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  isCancelled: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    default: false,
  },
  operatorInvolved: {
    type: Sequelize.INTEGER,
    allowNull: true,
    default: 0,
  },
  responderInvolved: {
    type: Sequelize.INTEGER,
    allowNull: true,
    default: 0,
  },
  supervisorInvolved: {
    type: Sequelize.INTEGER,
    allowNull: true,
    default: 0,
  },
  supervisorClosingRemarks: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  operatorRemarks: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  customerRating: {
    type: Sequelize.FLOAT,
    allowNull: true,
    default: 0,
  },
  customerRemarks: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  responderRemarks: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  panicGeneratedDate: {
    type: Sequelize.DATE,
    allowNull: true,
  },
  panicConfirmedOprDate: {
    type: Sequelize.DATE,
    allowNull: true,
  },
  panicConfirmedSuprDate: {
    type: Sequelize.DATE,
    allowNull: true,
  },
  panicAssignedResDate: {
    type: Sequelize.DATE,
    allowNull: true,
  },
  panicResolvedResDate: {
    type: Sequelize.DATE,
    allowNull: true,
  },
  panicResolvedOprDate: {
    type: Sequelize.DATE,
    allowNull: true,
  },
  panicClosedSuprDate: {
    type: Sequelize.DATE,
    allowNull: true,
  },
  panicConfirmedResDate: {
    type: Sequelize.DATE,
    allowNull: true,
  },
  panicClosedCusDate: {
    type: Sequelize.DATE,
    allowNull: true,
  },
  isClose: {
    type: Sequelize.BOOLEAN,
    allowNull: true,
    default: false,
  },
  isResolved: {
    type: Sequelize.BOOLEAN,
    allowNull: true,
    default: false,
  },
  isGSM: {
    type: Sequelize.BOOLEAN,
    allowNull: true,
    default: false,
  },
  panicType: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  utility_type: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  comment: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

module.exports = Panic;
