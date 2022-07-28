/**
 * Importing Libraries to Handle Routing
 */
const express = require("express");
const router = express.Router();

/**
 * Importing Controller
 */
const con = require("../controllers2/supervisor");

/**
 * End Point for => Supervisor CRUDs
 */
router.get("/", con.fetchAll);
router.get("/:id", con.filter);

module.exports = router;
