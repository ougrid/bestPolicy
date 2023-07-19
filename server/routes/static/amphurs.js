const express = require("express");
const router = express.Router(); //creates a router object
const ctrl = require("../../controllers");

// router.get("path", fucntion);
router.get('/all', ctrl.amphurs.showAll);
router.get('/search/:index/:para/:value', ctrl.amphurs.searchByinProvince);
router.get('/:index', ctrl.amphurs.showAllinProvince);
// router.post('/', ctrl.cars.postCar);
// router.delete('/:index', ctrl.cars.removeCar);
// router.put('/:index', ctrl.cars.editCar);

module.exports = router;