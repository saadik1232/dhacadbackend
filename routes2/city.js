/**
 * Importing Libraries to Handle Routing
 */
const express = require("express");
const router = express.Router();

/**
 * Importing Controller
 */
const con = require("../controllers2/city");

/**
 * End Point for => City CRUDs
 */
router.get("/", con.fetchAll);
router.get("/:id", con.fetchSpecific);
router.get("/:id/with-towns", con.fetchSpecificWithTowns);
router.post("/", con.create);
router.put("/:id", con.update);
router.delete("/:id", con.remove);
router.get("/with-towns", con.fetchAllWithTowns);

module.exports = router;
