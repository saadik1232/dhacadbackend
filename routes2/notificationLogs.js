/**
 * Importing Libraries to Handle Routing
 */
const express = require("express");
const router = express.Router();

/**
 * Importing Controller
 */
const con = require("../controllers2/notificationLogs");

/**
 * End Point for => Bank Credential Verification
 */
router.get("/", con.fetchAll);
// router.post("/add", con.add);
// router.post("/toString", con.makePolygonString);
// router.post("/toCoords", con.polygonString);
// router.post("/add", con.add);

module.exports = router;
