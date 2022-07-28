/**
 * Sequelize Library and Connection Imported
 */
var Sequelize = require("sequelize");
var sequelize = require("../configs/database");

/**
 * Bysrypt
 */
const bcrypt = require("bcrypt");

/**
 * User Model = [ id, firstname, lastname, cnic, contact, email, password,
 * lat, lng, approval, city, town, block, street, house ]
 */
const User = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: true,
    primaryKey: true,
  },
  firstname: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  lastname: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  cnic: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  contact: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  lat: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  lng: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  city: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  town: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  street: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  house: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  approval: {
    type: Sequelize.BOOLEAN,
    allowNull: true,
    default: false,
  },
  approvedBy: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  userActivation: {
    type: Sequelize.BOOLEAN,
    allowNull: true,
    default: true,
  },
  userAssignment: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    default: true,
  },
  serviceId: {
    type: Sequelize.INTEGER,
    allowNull: true,
    default: 0,
  },
  subscriptionId: {
    type: Sequelize.INTEGER,
    allowNull: true,
    default: 0,
  },
  subscriptionExpiry: {
    type: Sequelize.DATE,
    allowNull: true,
  },
  subscriptionDuration: {
    type: Sequelize.INTEGER,
    allowNull: true,
    default: 0,
  },
  mapAddress: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  deviceId: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  fcmToken: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  custId: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  groupId: {
    type: Sequelize.INTEGER,
    default: 0,
  },
  image: {
    type: Sequelize.TEXT("long"),
    allowNull: true,
  },
  userToken: {
    type: Sequelize.TEXT("long"),
    allowNull: true,
  },
  forgetToken: {
    type: Sequelize.TEXT("long"),
    allowNull: true,
  },
  trackingId: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  uniqueId: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  block: {
    type: Sequelize.BOOLEAN,
    allowNull: true,
    default: false,
  },
  isSubmitted: {
    type: Sequelize.BOOLEAN,
    allowNull: true,
    default: false,
  },
  extNumber: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  extPass: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  type: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

module.exports = User;
