const express = require("express");
const router = express.Router(); //creates a router object
const ctrl = require("../controllers");

router.get('/test', ctrl.bill.test);
router.post("/createCasheir",ctrl.bill.createCashier);
router.post("/findDataByBillAdvisoryNo",ctrl.bill.findDataByBillAdvisoryNo);
router.post("/findbill",ctrl.bill.findbill);
router.post("/saveCasheir",ctrl.bill.saveCashier);
router.post("/submitCasheir",ctrl.bill.submitCashier);


module.exports = router;