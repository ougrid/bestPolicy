const Amphur = require("../../models").Amphur; //imported fruits array
const Province =require("../../models").Province;
const { Op, QueryTypes, Sequelize  } = require("sequelize");
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

const Joi = require('joi');

const createBank = async (req, res) => {
    // Schema Validation
    const schema = Joi.object({
        bankBrand: Joi.string().required(),
        bankBranch: Joi.string().required(),
        bankNo: Joi.string().required(),
        type: Joi.string().length(1).required(),
        code: Joi.string().required()
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    // Insert Query
    const insertQuery = `INSERT INTO static_data."Bank"("bankBrand", "bankBranch", "bankNo", "type", "code") VALUES (:bankBrand, :bankBranch, :bankNo, :type, :code);`;

    await sequelize.query(insertQuery, {
        replacements: {
            bankBrand: req.body.bankBrand,
            bankBranch: req.body.bankBranch,
            bankNo: req.body.bankNo,
            type: req.body.type,
            code: req.body.code
        },
        type: QueryTypes.INSERT
    })
        .then(result => {
            console.log("Record inserted successfully");
            res.status(200);
        })
        .catch(error => {
            console.log("Error inserting record: ", error);
            res.status(500).json(error);
        });
};
const findAllBanks = async (req, res) => {
    const selectQuery = `SELECT * FROM static_data."Bank";`;

    await sequelize.query(selectQuery, {
        type: QueryTypes.SELECT
    })
        .then(result => {
            if (result.length === 0) {
                return res.status(404).json({ message: "No records found" });
            }
            console.log("All records fetched successfully");
            res.status(200).json(result);
        })
        .catch(error => {
            console.log("Error fetching records: ", error);
            res.status(500).json(error);
        });
};


const findBanksByType = async (req, res) => {
    // Schema Validation for 'type'
    const schema = Joi.object({
        type: Joi.string().length(1).required()
    });

    const { error } = schema.validate(req.query);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    const selectQuery = `SELECT * FROM static_data."Bank" WHERE type = :type;`;

    await sequelize.query(selectQuery, {
        replacements: {
            type: req.query.type
        },
        type: QueryTypes.SELECT
    })
        .then(result => {
            if (result.length === 0) {
                return res.status(404).json({ message: "No records found" });
            }
            console.log("Records by type fetched successfully");
            res.status(200).json(result);
        })
        .catch(error => {
            console.log("Error fetching records: ", error);
            res.status(500).json(error);
        });
};

const findBankAmity = async (req, res) => {
    const selectQuery = `SELECT * FROM static_data."Bank" where type  = 'M';`;

    await sequelize.query(selectQuery, {
        type: QueryTypes.SELECT
    })
        .then(result => {
            if (result.length === 0) {
                return res.status(404).json({ message: "No records found" });
            }
            console.log("All records fetched successfully");
            res.status(200).json(result);
        })
        .catch(error => {
            console.log("Error fetching records: ", error);
            res.status(500).json(error);
        });
};

const findBankAmityBrand = async (req, res) => {
    const selectQuery = `SELECT DISTINCT "bankBrand" FROM static_data."Bank" WHERE type = 'M';`;

    await sequelize.query(selectQuery, {
        type: QueryTypes.SELECT
    })
        .then(result => {
            if (result.length === 0) {
                return res.status(404).json({ message: "No records found" });
            }
            console.log("All records fetched successfully");
            res.status(200).json(result);
        })
        .catch(error => {
            console.log("Error fetching records: ", error);
            res.status(500).json(error);
        });
};
const findBankAmityBranch = async (req, res) => {
    const selectQuery = `SELECT * FROM static_data."Bank" WHERE type = 'M' and "bankBrand" = :brand ;`;

    await sequelize.query(selectQuery, {
        replacements: {
            brand: req.query.brand
        },
        type: QueryTypes.SELECT
    })
        .then(result => {
            if (result.length === 0) {
                return res.status(404).json({ message: "No records found" });
            }
            console.log("All records fetched successfully");
            res.status(200).json(result);
        })
        .catch(error => {
            console.log("Error fetching records: ", error);
            res.status(500).json(error);
        });
};
const findBankAmityNo = async (req, res) => {
    const selectQuery = `SELECT * FROM static_data."Bank" WHERE type = 'M' and "bankBranch" = :branch and "bankBrand" = :brand ;`;

    await sequelize.query(selectQuery, {
        replacements: {
            brand: req.query.brand,
            branch: req.query.branch
        },
        type: QueryTypes.SELECT
    })
        .then(result => {
            if (result.length === 0) {
                return res.status(404).json({ message: "No records found" });
            }
            console.log("All records fetched successfully");
            res.status(200).json(result);
        })
        .catch(error => {
            console.log("Error fetching records: ", error);
            res.status(500).json(error);
        });
};
const findBankPartnerBrand = async (req, res) => {
    const selectQuery = `SELECT DISTINCT "bankBrand" FROM static_data."Bank" WHERE "type" = :type;`;

    await sequelize.query(selectQuery, {
        replacements: {
            type:req.query.type
        },

        type: QueryTypes.SELECT
    })
        .then(result => {
            if (result.length === 0) {
                return res.status(404).json({ message: "No records found" });
            }
            console.log("All records fetched successfully");
            res.status(200).json(result);
        })
        .catch(error => {
            console.log("Error fetching records: ", error);
            res.status(500).json(error);
        });
};
const findBankPartnerBranch = async (req, res) => {
    const selectQuery = `SELECT * FROM static_data."Bank" WHERE type = :type and "bankBrand" = :brand ;`;

    await sequelize.query(selectQuery, {
        replacements: {
            type:req.query.type,
            brand: req.query.brand
        },
        type: QueryTypes.SELECT
    })
        .then(result => {
            if (result.length === 0) {
                return res.status(404).json({ message: "No records found" });
            }
            console.log("All records fetched successfully");
            res.status(200).json(result);
        })
        .catch(error => {
            console.log("Error fetching records: ", error);
            res.status(500).json(error);
        });
};
const findBankPartneryNo = async (req, res) => {
    const selectQuery = `SELECT * FROM static_data."Bank" WHERE type = :type and "bankBranch" = :branch and "bankBrand" = :brand ;`;

    await sequelize.query(selectQuery, {
        replacements: {
            brand: req.query.brand,
            branch: req.query.branch,
            type:req.query.type,
        },
        type: QueryTypes.SELECT
    })
        .then(result => {
            if (result.length === 0) {
                return res.status(404).json({ message: "No records found" });
            }
            console.log("All records fetched successfully");
            res.status(200).json(result);
        })
        .catch(error => {
            console.log("Error fetching records: ", error);
            res.status(500).json(error);
        });
};
module.exports = {
    createBank,
    findBanksByType,
    findAllBanks,
    findBankAmity,
    findBankAmityBrand,
    findBankAmityBranch,
    findBankAmityNo,
    findBankPartnerBranch,
    findBankPartnerBrand,
    findBankPartneryNo
};