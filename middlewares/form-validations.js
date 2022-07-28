/**
 * Required Helper Files
 */
const RES = require("../helpers/utils").response;
const { CheckIfEmpty } = require("./../helpers/utils");

/**
 * Login Form Validation Check
 */
module.exports.login = (req, res, next) => {
  if (CheckIfEmpty(req.body.username) && CheckIfEmpty(req.body.password))
    next();
  else res.json(RES(403, "Please Enter Valid & Complete Data. Thank you !"));
};

/**
 * Supervisor Closing Validation Check
 */
module.exports.supervisorClosing = (req, res, next) => {
  if (CheckIfEmpty(req.body.remarks) && CheckIfEmpty(req.body.by)) next();
  else res.json(RES(403, "Please Enter Valid & Complete Data. Thank you !"));
};

/**
 * Responder Assignment Validation Check
 */
module.exports.assigningToResponder = (req, res, next) => {
  if (CheckIfEmpty(req.body.responderId)) next();
  else res.json(RES(403, "Please Enter Valid & Complete Data. Thank you !"));
};

/**
 * Registeration Validation Check
 */
module.exports.register = (req, res, next) => {
  if (
    CheckIfEmpty(req.body.firstname) &&
    CheckIfEmpty(req.body.lastname) &&
    CheckIfEmpty(req.body.cnic) &&
    CheckIfEmpty(req.body.contact) &&
    CheckIfEmpty(req.body.email) &&
    CheckIfEmpty(req.body.password) &&
    CheckIfEmpty(req.body.service_provider_id) &&
    CheckIfEmpty(req.body.roleId)
  )
    next();
  else res.json(RES(403, "Please Enter Valid & Complete Data. Thank you !"));
};

/**
 * API Data Validation Sample
 */
module.exports.Validate = () => {
  return null;
};
