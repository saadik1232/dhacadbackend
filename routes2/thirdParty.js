/**
 * Importing Libraries to Handle Routing
 */
const express = require("express");
const router = express.Router();

/**
 * Importing Controller
 */
const con = require("../controllers2/thirdParty");

/**
 * End Point for => Nature CRUDs
 */
router.get("/", con.fetchAll);
router.post("/", con.create);
router.put("/:id", con.update);
router.post("/delete", con.remove);
router.post("/filter", con.filter);

module.exports = router;
