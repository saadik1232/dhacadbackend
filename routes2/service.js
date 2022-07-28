/**
 * Importing Libraries to Handle Routing
 */
const express = require("express");
const router = express.Router();

/**
 * Importing Controller
 */
const con = require("../controllers2/service");

/**
 * End Point for => Services CRUDs
 */
router.get("/", con.fetchAll);
router.post("/", con.create);
router.put("/:id", con.update);
router.delete("/:id", con.remove);

/**
 * API to Search If a Location is with in the Range
 */
router.post("/search", con.fetchViaAddress);
router.get("/find/applied", con.findCustomerWhoApplied);

module.exports = router;
