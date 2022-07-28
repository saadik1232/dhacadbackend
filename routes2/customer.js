/**
 * Importing Libraries to Handle Routing
 */
const express = require("express");
const router = express.Router();

/**
 * Importing Controller
 */
const con = require("../controllers2/customer");

/**
 * End Point for => Customer CRUDs
 */
router.get("/", con.fetchAll);
router.post("/", con.filter);

module.exports = router;
