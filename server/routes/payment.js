const express = require("express");
const router = express.Router(); //creates a router object
const ctrl = require("../controllers");

// router.get("path", fucntion);
router.post('/findtransac', ctrl.payments.findTransaction);
router.post('/findpolicyinDue', ctrl.payments.findPolicyByPreminDue);
router.post('/findpolicybyBill', ctrl.payments.findPolicyByBillno);
router.post('/createbill', ctrl.payments.createbilladvisor);
router.post('/findbill', ctrl.payments.findbilladvisor);
router.post('/editbill', ctrl.payments.editbilladvisor);

// router.post('/', ctrl.cars.postCar);
// router.delete('/:index', ctrl.cars.removeCar);
// router.put('/:index', ctrl.cars.editCar);

module.exports = router;