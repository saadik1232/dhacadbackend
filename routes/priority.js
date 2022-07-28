const express = require("express");
const router = express.Router();

const con = require("../controllers/priority");

/* APIs */

router.get("/", con.fetchAll);
router.post("/", con.create);
router.put("/:id", con.update);
router.delete("/:id", con.remove);

module.exports = router;
