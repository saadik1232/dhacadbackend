/**
 * Importing Logs Database Model
 */
const Logs = require("./../models/notificationLogs");

/**
 * Method to Save Logs Against Any Activity in the Project
 */
module.exports.addLogs = async (
  Title,
  Message,
  sendUserId,
  sendUserName,
  recieveUserId,
  recieveUserName,
  data = null
) => {
  console.log(" In Notification Method");

  var data2 = JSON.stringify(data);
  Logs.create({
    Title,
    Message,
    sendUserId,
    sendUserName,
    recieveUserId,
    recieveUserName,
    data: data2,
    status: true,
  })
    .then((result) => console.log("Notification Logs Created Successfully !"))
    .catch((e) => console.log("Notification Log Saving Error !"));
};
