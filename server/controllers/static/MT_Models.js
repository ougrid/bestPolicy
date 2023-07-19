// const Amphur = require("../../models").Amphur; //imported fruits array
const MT_Model = require("../../models").MT_Model
const { Op } = require("sequelize");
//handle index request
const showAll = (req,res) =>{
    MT_Model.findAll({
      attributes: ['MODELCODE','BRANDCODE','MARKETTHAINAME','MARKETENGNAME']
    }).then((models)=>{
        res.json(models);
    })
}

const showAllinBrand = (req, res) => {
    MT_Model.findAll({
        attributes: ['MODELCODE','BRANDCODE','MARKETTHAINAME','MARKETENGNAME'],
    where: {
        BRANDCODE: req.params.index
    }
  }).then((models) => {
    res.json(models);
  });
};

const searchByinModel = (req,res)=>{
  if (req.params.para === 'EN') {
    MT_Model.findAll({
      attributes: ['MODELCODE','BRANDCODE','MARKETTHAINAME','MARKETENGNAME'],
      where: {
        MARKETENGNAME :{
          [Op.like]:'%'+ req.params.value +'%'
        }
      }
    }).then((models) => {
      res.json(models);
    });
  } else if (req.params.para === 'TH') {
    MT_Brand.findAll({
      attributes: ['MODELCODE','BRANDCODE','MARKETTHAINAME','MARKETENGNAME'],
      where: {
        MARKETTHAINAME :{
          [Op.like]:'%'+ req.params.value +'%'
        }
      }
    }).then((models) => {
      res.json(models);
    });
  }
  
}


module.exports = {
  showAll,
  searchByinModel,
  showAllinBrand
  // postCar,
  // removeCar,
  // editCar,
};