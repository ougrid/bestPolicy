const Province = require("../../models").province; //imported fruits array
// const Package = require("../models").Package;
// const User = require("../models").User;
const { Op } = require("sequelize");
//handle index request
const showAll = (req,res) =>{
    Province.findAll({
      attributes: ['provinceid', 't_provincename','e_provincename']
    }).then((province)=>{
        res.json(province);
    })
}

const showOne = (req, res) => {
  Province.findOne ({
    attributes: ['provinceid', 't_provincename','e_provincename'],
    where: {
        provinceid: req.params.index
    }
  }).then((province) => {
    res.json(province);
  });
};

const searchBy = (req,res)=>{
  Province.findAll({
    attributes: ['provinceid', 't_provincename','e_provincename'],
    where: {
      [req.params.para] :{
        [Op.like]:'%'+ req.params.value +'%'
      }
    }
  }).then((province) => {
    res.json(province);
  });
}


module.exports = {
  showAll,
  showOne,
  searchBy
  // postCar,
  // removeCar,
  // editCar,
};