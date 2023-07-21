const Policy = require("../models").Policy; 
const Transaction = require("../models").Transaction; 
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

const getPolicy = (req, res) => {
  Policy.findOne ({
    where: {
      policyNo: req.body.policyNo
    }
  }).then((policy) => {
    res.json(policy);
  });
};

const newPolicy = (req, res) => {
  Policy.create (req).then((policy) => {
      res.json(policy);
    });
  };

const getTransactionByid = (req, res) => {
  Transaction.findOne ({
    where: {
      id: req.params.id
    }
  }).then((transection) => {
    res.json(transection);
  });
};

const newTransaction = (req, res) => {
  Transaction.create (req).then((transection) => {
      res.json(transection);
    });
  };

module.exports = {

  getPolicy,
  newPolicy,
  getTransactionByid,
  newTransaction
  // postCar,
  // removeCar,
  // editCar,
};