const Entity = require("../models").Entity; //imported fruits array
const Insuree = require("../models").Insuree;
const Insurer = require("../models").Insurer;
const Agent = require("../models").Agent;
const User = require("../models").User;
const Location = require("../models").Location;
const AgentGroup = require("../models").AgentGroup;
const CommOVIn = require("../models").CommOVIn;
const CommOVOut = require("../models").CommOVOut;
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
  Entity.findOne({
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
  Insuree.findOne({
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
        res.json({ ...insuree, ...entity, ...location });
      });

      // res.json(location);
    });
    // res.json({});
  });
};

const getInsurerByid = (req, res) => {
  Insurer.findOne({
    where: {
      insurerCode: req.params.id
    }
  }).then((insuree) => {
    res.json(insuree);
  });
};

const getInsurerAll = (req, res) => {
  sequelize.query(
    `select *,(t."TITLETHAIBEGIN" ||' '|| e."t_ogName"||' '||t."TITLETHAIEND") as fullname FROM static_data."Insurers" ins
     JOIN static_data."Entities" e ON ins."entityID" = e."id"
     join static_data."Titles" t on e."titleID" = t."TITLEID" ;`,
    { type: QueryTypes.SELECT }).then((insurer) => {
      res.json(insurer);
    });
};


//use create insurer
const newInsurer = async (req, res) => {
  const t = await sequelize.transaction();
  try {


    const entity = await Entity.create(req.body.entity, { transaction: t })
    req.body.insurer.entityID = entity.id
    req.body.location.entityID = entity.id
    const insurer = await Insurer.create(req.body.insurer, { transaction: t })
    const location = await Location.create(req.body.location, { transaction: t })
    // console.log(req.body);
    // req.body.commOVIn.forEach(async ele => {
    //   ele.insurerCode = req.body.insurer.insurerCode
    //   const commovin = await CommOVIn.create(ele, { transaction: t })
    // });

    for (let i = 0; i < req.body.commOVIn.length; i++) {
      req.body.commOVIn[i].insurerCode = req.body.insurer.insurerCode
      await  CommOVIn.create(req.body.commOVIn[i], { transaction: t })

    }
    res.json({ ...insurer, ...entity, ...location });
    await t.commit();
    await res.json({
      msg: `created insurer : ${req.body.insurer.insurerCode} success!!`,
    });
  } catch (error) {
    console.log(error);
    await t.rollback();
    await res.status(500).json(error);
  }
};

const getAgentAll = (req, res) => {
  Agent.findAll().then((agent) => {
    res.json(agent);
  });
};

//use create agent
const newAgent = async (req, res) => {
  const t = await sequelize.transaction();
  try {

    const entity = await Entity.create(req.body.entity, { transaction: t })
    req.body.agent.entityID = entity.id
    req.body.location.entityID = entity.id
    const agent = await Agent.create(req.body.agent, { transaction: t })
    const location = await Location.create(req.body.location, { transaction: t })
    // console.log(req.body);
    // req.body.commOVOut.forEach(ele => {
    //   ele.agentCode = req.body.agent.agentCodes
    //   await  CommOVOut.create(ele, { transaction: t })
    // });
    for (let i = 0; i < req.body.commOVOut.length; i++) {
      req.body.commOVOut[i].agentCode = req.body.agent.agentCode
      await  CommOVOut.create(req.body.commOVOut[i], { transaction: t })

    }
    // res.json({...agent, ...entity,...location});
    await t.commit();
    await res.json({
      msg: `created agent : ${req.body.agent.agentCode} success!!`,
    });
  } catch (error) {
    console.log(error);
    await t.rollback();
    await res.status(500).json(error);
  }
};

const getUserByid = (req, res) => {
  User.findOne({
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
  AgentGruop.findOne({
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

const findAgent = async (req, res) =>{
  try {
    

  //insert to deteil of jatw 
  let cond = ''
  if (req.body.agentCode !== '') {
    cond = cond + ` and "agentCode" like '%${req.body.agentCode}%' `
  }
  if (req.body.firstname !== '') {
    cond = cond + ` and (e."t_firstName" like '%${req.body.firstname}%' or e."t_ogName" like '%${req.body.firstname}%') `
  }
  if (req.body.lastname !== '') {
    cond = cond + ` and e."t_lastName"  like '%${req.body.lastname}%' `
  }
    const agents = await sequelize.query(
      ` select a."agentCode" ,
      (case when e."personType" = 'O' then t."TITLETHAIBEGIN"||' '||e."t_ogName" else t."TITLETHAIBEGIN"||' '||e."t_firstName"||' '||e."t_lastName"  end) as "fullName" ,
      e."personType"
      from static_data."Agents" a 
      join static_data."Entities" e on a."entityID"  = e.id 
      join static_data."Titles" t on t."TITLEID"  = e."titleID" 
      where true ${cond} `,
      {
        
        type: QueryTypes.SELECT,
      }
      
    ); 
   
    await res.json(agents);
  } catch (error) {
    console.log(error);
    await res.status(500).json({ msg: "internal server error" });
  }

}
module.exports = {
  //   showAll,
  getEntityByid,
  newEntity,
  getInsureeByid,
  newInsuree,
  getInsurerByid,
  newInsurer,
  getAgentAll,
  newAgent,
  getUserByid,
  newUser,
  getAgentGroupByid,
  newAgentGroup,
  getInsurerAll,
  findAgent,
  // removeCar,AgentditCar,
};