const express = require("express");
const router = express.Router(); //creates a router object
const ctrl = require("../controllers");

// router.get("path", fucntion);
router.post('/entitynew', ctrl.persons.newEntity);
router.get('/entityget/:id', ctrl.persons.getEntityByid);
router.post('/insureenew', ctrl.persons.newInsuree);
router.get('/insureeget/:id', ctrl.persons.getInsureeByid);
router.post('/insurernew', ctrl.persons.newInsurer);
router.get('/insurerall', ctrl.persons.getInsurerAll);
router.get('/insurerget/:id', ctrl.persons.getInsurerByid);
router.post('/agentnew', ctrl.persons.newAgent);
router.get('/agentget/:id', ctrl.persons.getAgentByid);
router.post('/usernew', ctrl.persons.newUser);
router.get('/userget/:id', ctrl.persons.getUserByid);
router.post('/agentgroupnew', ctrl.persons.newAgentGroup);
router.get('/agentgroupget/:id', ctrl.persons.getAgentGroupByid);

// router.post('/', ctrl.cars.postCar);
// router.delete('/:index', ctrl.cars.removeCar);
// router.put('/:index', ctrl.cars.editCar);

module.exports = router;