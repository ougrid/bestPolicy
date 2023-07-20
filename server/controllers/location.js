const Location = require("../models").Location; //imported fruits array
// const Package = require("../models").Package;
// const User = require("../models").User;
const { Op } = require("sequelize");
//handle index request
// const showAll = (req,res) =>{
//     Location.findAll({
//     }).then((locations)=>{
//         res.json(locations);
//     })
// }

const getByid = (req, res) => {
  Location.findOne ({
    where: {
        locationID: req.params.id
    }
  }).then((location) => {
    res.json(location);
  });
};

const newLocation = (req, res) => {
    Location.create (req).then((location) => {
      res.json(location);
    });
  };


module.exports = {

  getByid,
  newLocation
  // postCar,
  // removeCar,
  // editCar,
};