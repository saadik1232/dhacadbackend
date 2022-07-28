const express = require("express");
const router = express.Router();

const con = require("../controllers/bank");

/* APIs */

router.post("/verify", con.verify);

module.exports = router;
