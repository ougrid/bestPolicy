const express = require("express");
const router = express.Router(); //creates a router object
const ctrl = require("../controllers");

// router.get("path", fucntion);
router.post('/policynew', ctrl.policies.newPolicy);
router.post('/policyget', ctrl.policies.getPolicy);
router.post('/transectionnew', ctrl.policies.newTransaction);
router.get('/transectionget/:id', ctrl.policies.getTransactionByid);

// router.post('/', ctrl.cars.postCar);
// router.delete('/:index', ctrl.cars.removeCar);
// router.put('/:index', ctrl.cars.editCar);

module.exports = router;