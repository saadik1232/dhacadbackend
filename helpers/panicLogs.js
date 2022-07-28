/**
 * Importing Logs Database Model
 */
const panicLogs = require("./../models/panicLogs");

/**
 * Method to Save Logs Against Any Activity in the Project
 */
module.exports.addPanicLogs = async (
  panicId,
  operator = 0,
  supervisor = 0,
  responder = 0,
  groupId = 0,
  action
) => {
  console.log(" In Panic Log Notification Method");

  panicLogs
    .create({
      panicId,
      operator,
      supervisor,
      responder,
      groupId,
      action,
    })
    .then((result) => console.log("Panic Logs Created Successfully !"))
    .catch((e) => console.log("Panic Log Saving Error !", e));
};
