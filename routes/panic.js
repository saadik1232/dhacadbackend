const express = require("express");
const router = express.Router();

const con = require("../controllers/panic");

/* APIs */

router.get("/", con.fetchAll);
router.post("/", con.create);
router.put("/:id", con.update);
router.post("/:id/confirmed", con.confirmed); // Operator COnfirms Panic
router.post("/:id/assign", con.assigned);
router.get("/:id/resolve", con.resolve);
router.post("/:id/close", con.close);
router.get("/assignments", con.fetchAllAssignments);
router.delete("/:id", con.remove);

router.get("/inQuery", con.queryPanics);
router.get("/freeOperators", con.fetchAllFreeOperator);
router.post("/operatorAssignment", con.operatorAssignments);
router.get("/operatorAll", con.fetchAllWithAll);
router.post("/cancel-panic", con.cancelPanic);

router.post("/getCenter", con.getCenter);

module.exports = router;
