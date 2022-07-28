/**
 * API Response Standard Format
 */
var RES = require("../helpers/utils").response;

/**
 * Importing Bank Database Model
 */
const Bank = require("./../models/bank");

/**
 * Importing Data Validator
 */
const { CheckIfEmpty } = require("./../helpers/utils");

/**
 * Importing Logs Helper
 */
const { logs } = require("./../helpers/logs");

/**
 * Method to Verify a User Bank Account and Authorize him/her
 */
module.exports.verify = async (req, res, next) => {
  if (
    CheckIfEmpty(req.body.accountName) &&
    CheckIfEmpty(req.body.accountNo) &&
    CheckIfEmpty(req.body.accountPin)
  ) {
    var account = await Bank.findOne({
      where: {
        accountName: req.body.accountName,
        accountNo: req.body.accountNo,
        accountPin: req.body.accountPin,
      },
    });
    if (account) {
      logs(
        "Bank Verification",
        "User ( " +
          req.body.accountName +
          " ) with Account ( " +
          req.body.accountNo +
          " ) and Pin ( " +
          req.body.accountPin +
          " ) Got His/Her Account Verified"
      );
      res.json(RES(200, "Access Granted"));
    } else res.json(RES(403, "Access Denied"));
  } else res.json(RES(403, "Access Denied"));
};
