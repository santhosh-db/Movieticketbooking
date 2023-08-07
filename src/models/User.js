const { DataTypes } = require('sequelize');
const sequelize=require('../config/dbConnection');
const { USER_TYPE } = require("../constants");

//define schema
const User = sequelize.define('users',{
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
        email:{
            type:DataTypes.STRING,
            allowNull: false
        },
        location:{
            type:DataTypes.STRING,
            allowNull: false
        },
        phone:{
            type:DataTypes.STRING,
            allowNull: false
        },
        password:{
            type:DataTypes.STRING,
            allowNull: false
        },
        role:{
            type:DataTypes.ENUM(USER_TYPE.USER,USER_TYPE.ADMIN,USER_TYPE.SUPERADMIN),
            allowNull: false
        },
        status:{
            type:DataTypes.ENUM('active', 'inactive'),
            defaultValue:'active'
        }
    },{
        freezeTableName:true,
        timestamps:true,
    }
);
//export Schema
module.exports = User;