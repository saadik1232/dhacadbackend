/**
 * Importing Libraries to Handle Routing
 */
const express = require("express");
const router = express.Router();

/**
 * Importing Controller
 */
const con = require("../controllers2/panic");
// my new rout
router.post("/getsortpanic", con.getSortedPanics);

/**
 * End Point for => Panic CRUDs
 */

router.get("/", con.fetchAll);
router.post("/cancel-panic", con.cancelPanic);
router.get("/cancelled", con.fetchCancelled);
router.get("/except-cancelled", con.fetchExceptCancelled);
router.get("/in-query", con.fetchAll);
router.get("/confirmed-by-operator", con.fetchConfirmedByOperator);
router.get("/assigned-to-responder", con.fetchAssignedToResponder);
router.get("/resolved-by-responder", con.fetchResolvedByResponder);
router.get("/resolved-by-operator", con.fetchResolvedByOperator);
router.get("/closed-by-supervisor", con.fetchClosedBySupervisor);
router.post("/resolver", con.resolver);
router.post("/message", con.sendMessage);
router.put("/operatorAssignPanic", con.operatorAssignPanic);
router.put("/supervisorAssignPanic", con.supervisorAssignPanic);
router.put("/operatorAcceptPanic", con.operatorAcceptPanic);
router.put("/operatorNotAcceptPanic", con.operatorNotAcceptPanic);
router.put("/supervisorAcceptPanic", con.supervisorAcceptPanic);
router.put("/operatorAssignPanicToRes", con.operatorAssignPanicToRes);
router.put("/supervisorAssignPanicToOpr", con.supervisorAssignPanicToOpr);
router.put("/supervisorAssignPanicToRes", con.supervisorAssignPanicToRes);
router.put("/responderAcceptPanic", con.responderAcceptPanic);
router.put("/responderResolvePanic", con.responderResolvePanic);
router.put("/operatorResolvePanic", con.operatorResolvePanic);
router.put("/supervisorResolvePanic", con.supervisorResolvePanic);
router.put("/closePanic", con.closePanic);
router.put("/solvePanic", con.solvePanic);
router.put("/closePanicByCustomer", con.closePanicByCustomer);

router.post("/filter", con.fetchSingle);
router.post("/", con.create);
router.post("/:id", con.create);
router.put("/", con.update);
router.put("/:id", con.update);

router.delete("/:id", con.remove);

module.exports = router;
