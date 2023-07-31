const CommOVIn = require("../models").CommOVIn; //imported fruits array
const InsureType = require("../models").InsureType;
const CommOVOut = require("../models").CommOVOut;


const { Op } = require("sequelize");
//handle index request
// const showAll = (req,res) =>{
//     Location.findAll({
//     }).then((locations)=>{
//         res.json(locations);
//     })
// }

const getInsureTypeByid = (req, res) => {
    InsureType.findOne ({
    where: {
        id: req.params.id
    }
  }).then((insureType) => {
    res.json(insureType);
  });
};


const getInsureTypeAll = (req, res) => {
  InsureType.findAll ().then((insureType) => {
  res.json(insureType);
});
};

const newInsureType = (req, res) => {
    InsureType.create(req.body.insure).then((insureType) => {
      res.json(insureType);
    });
  };
  
const getCommOVOutByid = (req, res) => {
    CommOVOut.findOne ({
    where: {
        id: req.params.id
    }
  }).then((commovOut) => {
    res.json(commovOut);
  });
};

const newCommOVOut = (req, res) => {
    CommOVOut.create(req.body).then((commovOut) => {
      res.json(commovOut);
    });
  };

  const getCommOVInByid = (req, res) => {
    CommOVIn.findOne ({
    where: {
        id: req.params.id
    }
  }).then((commovIn) => {
    res.json(commovIn);
  });
};

const newCommOVIn = (req, res) => {
    CommOVIn.create(req.body).then((commovIn) => {
      res.json(commovIn);
    });
  };

  const newCommOV = (req, res) => {
    CommOVIn.create({...req.body.commIn, ...req.body.insure}).then((commovIn) => {
      // res.json(commovIn);
      CommOVOut.create({...req.body.commOut, ...req.body.insure}).then((commovIn) => {
        res.json(commovIn);
      });
    });
   
  };


module.exports = {
//   showAll,
  getInsureTypeAll,
  getInsureTypeByid,
  newInsureType,
  getCommOVOutByid,
  newCommOVOut,
  getCommOVInByid,
  newCommOVIn,  
  newCommOV

  // removeCar,AgentditCar,
};