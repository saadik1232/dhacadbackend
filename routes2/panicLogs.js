/**
 * Importing Libraries to Handle Routing
 */
const express = require("express");
const router = express.Router();

/**
 * Importing Controller
 */
const con = require("../controllers2/panicLogs");

/**
 * End Point for => Bank Credential Verification
 */
router.get("/", con.fetchAll);
router.post("/fetchAllAgainstPanic", con.fetchAllAgainstPanic);
router.post("/fetchAllAgainstOperator", con.fetchAllAgainstOperator);
router.post("/fetchAllAgainstSupervisor", con.fetchAllAgainstSupervisor);
router.post("/fetchAllAgainstResponder", con.fetchAllAgainstResponder);
// router.post("/add", con.add);
// router.post("/toString", con.makePolygonString);
// router.post("/toCoords", con.polygonString);
// router.post("/add", con.add);

module.exports = router;
