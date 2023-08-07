const Entity = require("../models").Entity; //imported fruits array
const Insuree = require("../models").Insuree;
const Insurer = require("../models").Insurer;
const Agent = require("../models").Agent;
const User = require("../models").User;
const Location = require("../models").Location;
const AgentGroup = require("../models").AgentGroup;
const CommOVIn =require("../models").CommOVIn;
const CommOVOut =require("../models").CommOVOut;
const process = require('process');
require('dotenv').config();

const { Op, QueryTypes, Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  port: process.env.DB_PORT,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    },
  },
});
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
  Entity.create(req.body.entity).then((entity) => {
    req.body.insuree.entityID = entity.id
    req.body.location.entityID = entity.id
    Insuree.create(req.body.insuree).then((insuree) => {
      Location.create(req.body.location).then((location) => {
        res.json({...insuree, ...entity,...location});
    });
    
      // res.json(location);
    });
    // res.json({});
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

const getInsurerAll =  (req, res) => {
   sequelize.query(
    'select * FROM static_data."Insurers" ins JOIN static_data."Entities" ent ON ins."entityID" = ent."id";',
    {type: QueryTypes.SELECT}).then((insurer) => {
  res.json(insurer);
});
};



const newInsurer = async (req, res) => {
    const entity = await Entity.create(req.body.entity)
      req.body.insurer.entityID = entity.id
      req.body.location.entityID = entity.id
    const insurer = await Insurer.create(req.body.insurer)
    const location = await Location.create(req.body.location)
  // console.log(req.body);
    req.body.commOVIn.forEach(async ele => {
      ele.insurerCode = req.body.insurer.insurerCode
      const commovin = await CommOVIn.create (ele)
    }); 
  res.json({...insurer, ...entity,...location});
  
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

const newAgent = async (req, res) => {
  const entity = await Entity.create(req.body.entity)
  req.body.agent.entityID = entity.id
  req.body.location.entityID = entity.id
const agent = await Agent.create(req.body.agent)
const location = await Location.create(req.body.location)
// console.log(req.body);
req.body.commOVOut.forEach(async ele => {
  ele.agentCode = req.body.agent.agentCode
  const commovout = await CommOVOut.create (ele)
}); 
res.json({...agent, ...entity,...location});
  
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
  getInsurerAll,
  // removeCar,AgentditCar,
};