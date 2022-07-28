/**
 * Importing Libraries to Handle Routing
 */
const express = require("express");
const router = express.Router();

/**
 * Importing Controller
 */
const con = require("../controllers2/subscription");

/**
 * End Point for => Subscription CRUDs
 */
router.get("/", con.fetchAll);
router.post("/", con.create);
router.put("/:id", con.update);
router.delete("/:id", con.remove);
router.post("/filter", con.filter);
router.post("/subscriptionServiceFilter", con.subscriptionServiceFilter);
router.post("/subscriptionUserFilter", con.subscriptionUserFilter);

module.exports = router;
