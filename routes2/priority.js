/**
 * Importing Libraries to Handle Routing
 */
const express = require("express");
const router = express.Router();

/**
 * Importing Controller
 */
const con = require("../controllers2/priority");

/**
 * End Point for => Priority CRUDs
 */
router.get("/", con.fetchAll);
router.post("/", con.create);
router.put("/:id", con.update);
router.delete("/:id", con.remove);

module.exports = router;
