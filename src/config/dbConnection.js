const dbConfig = require('./dbConfig');
const {Sequelize} = require('sequelize');
const sequelize= new Sequelize(dbConfig.DATABASE,dbConfig.USER,dbConfig.PASSWORD,
    {
        host:dbConfig.HOST,
        dialect:dbConfig.DIALECT, 
        pool:{
            min:0,
            max:5,
            idle:10000,
            acquire:30000
        },
        logging: false
    }
)
module.exports=sequelize;