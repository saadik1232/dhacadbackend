/**
 * Importing Libraries to Handle Routing
 */
const express = require("express");
const router = express.Router();

/**
 * Importing Controller
 */
const con = require("../controllers2/auth");

/**
 * End Point for => Login Authentication
 */
router.post("/login", con.login);

/**
 * End Point for => Login Authentication with FcmToken
 */
router.post("/loginResponder", con.loginWithFcmToken);

/**
 * End Point for => Login Data
 */
router.post("/loginData", con.loginData);

/**
 * End Point for => Login Data for Responder
 */
router.post("/loginData/responder", con.loginDataResponder);

/**
 * End Point for SMS Verification
 */
router.post("/verify-via-sms", con.smsVerification);

/**
 * End Point for Email Verification
 */
router.post("/verify-via-email", con.emailVerification);

/**
 * End Point for Changing Password
 */
router.post("/password/update", con.changePassword);

/**
 * End Point for Renewing Token
 */
router.post("/token/renewal", con.renewToken);

/**
 * End Point for Logout ( Android )
 */
router.post("/logout", con.logout);

/**
 * End Point for Forget Password
 */
router.post("/forget/password", con.forgetPassword);

/**
 * End Point for Forget Password
 */
router.post("/renew/password", con.renewPassword);

module.exports = router;
