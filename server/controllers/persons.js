const Entity = require("../models").Entity; //imported fruits array
const Insuree = require("../models").Insuree;
const Insurer = require("../models").Insurer;
const Agent = require("../models").Agent;

const { Op } = require("sequelize");
//handle index request
// const showAll = (req,res) =>{
//     Location.findAll({
//     }).then((locations)=>{
//         res.json(locations);
//     })
// }

const getEntityByid = (req, res) => {
    Entity.findOne ({
    where: {
        id: req.params.id
    }
  }).then((entity) => {
    res.json(entity);
  });
};

const newEntity = (req, res) => {
    Entity.create(req.body).then((entity) => {
      res.json(entity);
    });
  };
  
const getInsureeByid = (req, res) => {
    Insuree.findOne ({
    where: {
        insureeCode: req.params.id
    }
  }).then((insuree) => {
    res.json(insuree);
  });
};

const newInsuree = (req, res) => {
    Insuree.create(req.body).then((insuree) => {
      res.json(insuree);
    });
  };

module.exports = {
//   showAll,
  getEntityByid,
  newEntity,
  getInsureeByid,
  newInsuree, 
  // removeCar,
  // editCar,
};