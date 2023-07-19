const Amphur = require("../../models").Amphur; //imported fruits array
// const Package = require("../models").Package;
// const User = require("../models").User;
const { Op } = require("sequelize");
//handle index request
const showAll = (req,res) =>{
    Amphur.findAll({
      attributes: ['amphurid', 't_amphurname','e_amphurname','provinceid']
    }).then((amphur)=>{
        res.json(amphur);
    })
}

const showAllinProvince = (req, res) => {
  Amphur.findAll ({
    attributes: ['amphurid', 't_amphurname','e_amphurname','provinceid'],
    where: {
        provinceid: req.params.index
    }
  }).then((amphur) => {
    res.json(amphur);
  });
};

const searchByinProvince = (req,res)=>{
  Amphur.findAll({
    attributes: ['amphurid', 't_amphurname','e_amphurname','provinceid'],
    where: {
        provinceid: req.params.index,
      [req.params.para] :{
        [Op.like]:'%'+ req.params.value +'%'
      }
    }
  }).then((amphur) => {
    res.json(amphur);
  });
}


module.exports = {
  showAll,
  showAllinProvince,
  searchByinProvince
  // postCar,
  // removeCar,
  // editCar,
};