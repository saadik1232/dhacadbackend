const express = require("express");
const router = express.Router();

const con = require("../controllers/serviceProvider");

/* APIs */

router.get("/", con.fetchAll);
router.post("/search", con.fetchViaAddress);
router.post("/", con.create);

module.exports = router;
