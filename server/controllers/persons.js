const Entity = require("../models").Entity; //imported fruits array
const Insuree = require("../models").Insuree;
const Insurer = require("../models").Insurer;
const Agent = require("../models").Agent;
const User = require("../models").User;
const AgentGroup = require("../models").AgentGroup;

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

  const getInsurerByid = (req, res) => {
    Insurer.findOne ({
    where: {
        insurerCode: req.params.id
    }
  }).then((insuree) => {
    res.json(insuree);
  });
};

const newInsurer = (req, res) => {
    Insurer.create(req.body).then((insurer) => {
      res.json(insurer);
    });
  };

  const getAgentByid = (req, res) => {
    Agent.findOne ({
    where: {
        agentCode: req.params.id
    }
  }).then((agent) => {
    res.json(agent);
  });
};

const newAgent = (req, res) => {
    Agent.create(req.body).then((agent) => {
      res.json(agent);
    });
  };

const getUserByid = (req, res) => {
    User.findOne ({
    where: {
        id: req.params.id
    }
  }).then((user) => {
    res.json(user);
  });
};

const newUser = (req, res) => {
    User.create(req.body).then((user) => {
      res.json(user);
    });
  };

  const getAgentGroupByid = (req, res) => {
    AgentGruop.findOne ({
    where: {
      agentGroup: req.params.id
    }
  }).then((agentGroup) => {
    res.json(agentGroup);
  });
};

const newAgentGroup = (req, res) => {
    AgentGruop.create(req.body).then((agentGroup) => {
      res.json(agentGroup);
    });
  };
module.exports = {
//   showAll,
  getEntityByid,
  newEntity,
  getInsureeByid,
  newInsuree,
  getInsurerByid,
  newInsurer,  
  getAgentByid,
  newAgent,
  getUserByid,
  newUser,
  getAgentGroupByid,
  newAgentGroup,
  // removeCar,AgentditCar,
};