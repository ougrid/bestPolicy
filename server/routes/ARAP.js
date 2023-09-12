const express = require("express");
const router = express.Router(); //creates a router object
const ctrl = require("../controllers");

// router.get("path", fucntion);
router.post('/getbilldata', ctrl.arap.getbilldata);
router.post('/getcashierdata', ctrl.arap.getcashierdata);
router.post('/savearpremin', ctrl.arap.saveARPremin);
router.post('/submitarpremin', ctrl.arap.submitARPremin);
router.post('/getartrans', ctrl.arap.getARtrans);
router.post('/getartransdirect', ctrl.arap.findARPremInDirect);




module.exports = router;