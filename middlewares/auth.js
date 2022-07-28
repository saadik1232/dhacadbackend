/**
 * Json Web Token => Key
 */
const { KEY } = require("../configs/jwt");
/**
 * Importing Json Web Token
 */
const jwt = require("jsonwebtoken");
/**
 * Standard Response Format
 */
const RES = require("../helpers/utils").response;
/**
 * Data Validator
 */
const { isDataNotEmpty } = require("../helpers/utils");

/**
 * Token Validation Middleware
 */
module.exports.tokenAuth = (req, res, next) => {
  var token = req.headers.authorization;
  isDataNotEmpty(
    token,
    () =>
      jwt.verify(token.split(" ")[1], KEY, (err, decoded) => {
        if (err) res.json(RES(403, "Decoding Error !"));
        else next();
      }),
    () => res.json(RES(403, "No Token Provided !"))
  );
};
