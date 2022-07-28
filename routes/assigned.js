const express = require("express");
const router = express.Router();

const con = require("../controllers/panic");

/* APIs */

router.get("/", con.fetchAll);

module.exports = router;
