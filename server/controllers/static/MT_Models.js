// const Amphur = require("../../models").Amphur; //imported fruits array
const MT_Model = require("../../models").MT_Model
const { Op, QueryTypes, Sequelize } = require("sequelize");
//handle index request

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

const showAll = (req,res) =>{
    MT_Model.findAll({
      attributes: ['MODELCODE','BRANDCODE','MARKETTHAINAME','MARKETENGNAME']
    }).then((models)=>{
        res.json(models);
    })
}

const showAllinBrand = (req, res) => {

  sequelize.query(
    'select * from static_data."MT_Models" m join static_data."MT_Brands" b on b."BRANDCODE" = m."BRANDCODE" where b."BRANDNAME" = :brandname ',
    {
          replacements: {
            brandname:req.body.brandname,
          },
          type: QueryTypes.SELECT
        }
      ).then((tambon) => {
    res.json(tambon);
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