const express = require("express");
const router = express.Router();
const Speakeasy = require("speakeasy");
const { sendEmailWithHtml } = require("../helpers/email");
const RES = require("./../helpers/utils").response;

router.post("/totp-secret", (request, response, next) => {
  var secret = Speakeasy.generateSecret({ length: 20 });
  response.json(RES(200, "Success", { secret: secret.base32 }));
});

router.post("/totp-generate", (request, response, next) => {
  var detail = {
    token: Speakeasy.totp({
      secret: request.body.secret,
      encoding: "base32",
    }),
    remaining: 30 - Math.floor((new Date().getTime() / 1000.0) % 30),
  };
  var email = request.body.email;
  sendEmailWithHtml(
    email,
    "Cad Verification Token",
    "<b> Click the following Link to Verify Yourself to the Panic Alarm App ... </b><h1>" +
      detail.token +
      "</h1>",
    () => {
      console.log("Email Sent !");
    }
  );
  response.json(RES(200, "Success", request.body.secret, request.body.email));
});

router.post("/totp-validate", (request, response, next) => {
  var valid = Speakeasy.totp.verify({
    secret: request.body.secret,
    encoding: "base32",
    token: request.body.token,
    window: 2,
    step: 30,
  });

  response.json(RES(200, "Success", { valid }));
});

// valid: Speakeasy.totp.verify({
//   secret: request.body.secret,
//   encoding: "base32",
//   token: request.body.token,
//   window: 2,
//   step: 30,
// });
module.exports = router;
