const { DataTypes } = require('sequelize');
const sequelize=require('../config/dbConnection');

//define schema
const Theatre = sequelize.define('theatres',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement:true,
            allowNull: false,
            primaryKey: true,
            },
        name:{
            type:DataTypes.STRING,
            allowNull: false
        },
        location:{
            type:DataTypes.STRING,
            allowNull: false
        },
        status:{
            type:DataTypes.ENUM('active', 'inactive'),
            defaultValue:'active'
        },
        created_by:{
            type:DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        freezeTableName:true,
        timestamps:true,
    }
    
);

//export Schema
module.exports = Theatre;