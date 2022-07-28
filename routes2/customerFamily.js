/**
 * Importing Libraries to Handle Routing
 */
const express = require("express");
const router = express.Router();

/**
 * Importing Controller
 */
const con = require("../controllers2/customerFamily");

/**
 * End Point for => Customer Family CRUDs
 */
router.get("/", con.fetchAll);
router.get("/:id", con.filter);
router.post("/customerFamilyFilter", con.customerFamilyFilter);

module.exports = router;
