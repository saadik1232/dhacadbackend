var Sequelize = require("sequelize");
var sequelize = require("../configs/database");

const ImageUpload = sequelize.define("ImageUpload", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  image_name: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  image_data: {
    type: Sequelize.BLOB,
    allowNull: true,
  },
});

module.exports = ImageUpload;
