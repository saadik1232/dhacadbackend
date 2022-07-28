/**
 * Importing Libraries to Handle Routing
 */
const express = require("express");
const router = express.Router();

/**
 * Importing Controller
 */
const con = require("../controllers2/responder");

/**
 * End Point for => Responder
 */
router.get("/busy", con.fetchAllBuzy);
router.get("/free", con.fetchAllFree);
router.get("/", con.fetchAll);
router.post("/all", con.fetchAllResponders);
router.get("/:id", con.filter);
router.post("/sendLocation", con.sendLocation);

module.exports = router;
