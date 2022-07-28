/**
 * Importing Logs Database Model
 */
const Log = require("./../models/log");

module.exports.baseURL = "192.168";
/**
 * Method to Save Logs Against Any Activity in the Project
 */
module.exports.logs = async (title, message, data = null, id = 0) => {
  var data2 = JSON.stringify(data);
  await Log.create({ title, message, data: data2, user: id })
    .then((result) => console.log("Logs Created Successfully !"))
    .catch((e) => console.log("Log Saving Error !"));
};

/**
 * Method to Save Logs Against Any Activity in the Project Asyncronously
 */
module.exports.logsAsync = (title, message, cb = null) => {
  Log.create({ title, message })
    .then((result) => cb())
    .catch((e) => console.log("Log Saving Error !"));
};
