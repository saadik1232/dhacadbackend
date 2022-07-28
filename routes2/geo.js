/**
 * Importing Libraries to Handle Routing
 */
const express = require("express");
const router = express.Router();

/**
 * Importing Controller
 */
const con = require("../controllers2/geo");

/**
 * End Point for => Getting Center of Various Lat & Lng
 */
router.post("/find-center", con.getCenter);
router.post("/find-distance", con.getDistance);

module.exports = router;
