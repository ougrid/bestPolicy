const express = require("express");
const router = express.Router(); //creates a router object
const ctrl = require("../controllers");

// router.get("path", fucntion);
router.get('/usergetall', ctrl.auth.showAll);
router.post('/usergetbyname', ctrl.auth.showByUsername);
router.post('/signup', ctrl.auth.signup);
router.post('/login', ctrl.auth.login);


// router.post('/', ctrl.cars.postCar);
// router.delete('/:index', ctrl.cars.removeCar);
// router.put('/:index', ctrl.cars.editCar);

module.exports = router;