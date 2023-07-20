const Entity = require("../../models").Entity; //imported fruits array
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
    Entity.findOne ({
    where: {
        locationID: req.params.id
    }
  }).then((location) => {
    res.json(location);
  });
};

const newEntity = (req, res) => {
    Entity.create (req).then((location) => {
      res.json(location);
    });
  };


module.exports = {
//   showAll,
  getByid,
  newEntity
  // postCar,
  // removeCar,
  // editCar,
};