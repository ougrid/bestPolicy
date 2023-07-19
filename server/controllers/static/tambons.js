const Tambon = require("../../models").Tambon; //imported fruits array
// const Package = require("../models").Package;
// const User = require("../models").User;
const { Op } = require("sequelize");
//handle index request
const showAll = (req,res) =>{
    Tambon.findAll({
      attributes: ['tambonid','t_tambonname','e_tambonname','amphurid','postcodeall']
    }).then((tambon)=>{
        res.json(tambon);
    })
}

const showAllinAmphur = (req, res) => {
  Tambon.findAll ({
    attributes: ['tambonid','t_tambonname','e_tambonname','amphurid'],
    where: {
        amphurid: req.params.index
    }
  }).then((tambon) => {
    res.json(tambon);
  });
};

const searchByinAmphur = (req,res)=>{
  Tambon.findAll({
    attributes: ['tambonid','t_tambonname','e_tambonname','amphurid'],
    where: {
        amphurid: req.params.index,
      [req.params.para] :{
        [Op.like]:'%'+ req.params.value +'%'
      }
    }
  }).then((tambon) => {
    res.json(tambon);
  });
}

const showZipinTambon = (req, res) => {
    Tambon.findOne ({
      attributes: ['postcodeall'],
      where: {
        tambonid: req.params.index
      }
    }).then((tambon) => {
      let data = tambon.postcodeall.split('/')
      res.json({zipcode: data});
    });
  };
  


module.exports = {
  showAll,
  showAllinAmphur,
  searchByinAmphur,
  showZipinTambon
  // postCar,
  // removeCar,
  // editCar,
};