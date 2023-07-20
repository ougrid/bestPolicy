const express = require("express");
const router = express.Router(); //creates a router object
const ctrl = require("../controllers");

// router.get("path", fucntion);
router.post('/entitynew', ctrl.persons.newEntity);
router.get('/entityget/:id', ctrl.persons.getEntityByid);
router.post('/insureenew', ctrl.persons.newInsuree);
router.get('/insureeget/:id', ctrl.persons.getInsureeByid);

// router.post('/', ctrl.cars.postCar);
// router.delete('/:index', ctrl.cars.removeCar);
// router.put('/:index', ctrl.cars.editCar);

module.exports = router;