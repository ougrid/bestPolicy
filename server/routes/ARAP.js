const express = require("express");
const router = express.Router(); //creates a router object
const ctrl = require("../controllers");

// router.get("path", fucntion);
router.post('/getbilldata', ctrl.arap.getbilldata);
router.post('/getcashierdata', ctrl.arap.getcashierdata);


module.exports = router;