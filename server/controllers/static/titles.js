const Title = require("../../models").Title; //imported fruits array
// const Package = require("../models").Package;
// const User = require("../models").User;
const { Op } = require("sequelize");
//handle index request
const showAllCompany = (req,res) =>{
    Title.findAll({
        attributes: ['TITLEID','TITLETHAIBEGIN','TITLEABTHAIBEGIN','DHIPTITLE'],
        where: {
            TITLETYPE: "C"
        }
    }).then((tambon)=>{
        res.json(tambon);
    })
}

const showAllPerson = (req, res) => {
  Title.findAll ({
    attributes: ['TITLEID','TITLETHAIBEGIN','TITLEABTHAIBEGIN','DHIPTITLE','GENDER'],
    where: {
        TITLETYPE: "P"
    }
  }).then((tambon) => {
    res.json(tambon);
  });
};

const searchByCompany = (req,res)=>{
  Title.findAll({
    attributes: ['TITLEID','TITLETHAIBEGIN','TITLEABTHAIBEGIN','DHIPTITLE'],
    where: {
        TITLETYPE: "C",
      [req.params.para] :{
        [Op.like]:'%'+ req.params.value +'%'
      }
    }
  }).then((tambon) => {
    res.json(tambon);
  });
}

const searchByPerson = (req,res)=>{
    Title.findAll({
      attributes: ['TITLEID','TITLETHAIBEGIN','TITLEABTHAIBEGIN','DHIPTITLE','GENDER'],
      where: {
        TITLETYPE: "P",
        [req.params.para] :{
          [Op.like]:'%'+ req.params.value +'%'
        }
      }
    }).then((tambon) => {
      res.json(tambon);
    });
  }
  
  const showById = (req,res) =>{
    Title.findOne({
        attributes: ['TITLEID','TITLETHAIBEGIN','TITLEABTHAIBEGIN','DHIPTITLE','GENDER'],
      where: {
        TITLEID:req.params.index
      }
    }).then((title) => {
      res.json(title);
    });
    
  }


module.exports = {
  showAllCompany,
  showAllPerson,
  searchByCompany,
  searchByPerson,
  showById
  // postCar,
  // removeCar,
  // editCar,
};