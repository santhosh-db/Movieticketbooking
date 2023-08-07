const { DataTypes } = require('sequelize');
const sequelize=require('../config/dbConnection');
const Theatre = require('./Theatre');

//define schema
const Screen = sequelize.define('screens',
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
        rows:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        columns:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        capacity:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        theatre_id:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        status:{
            type:DataTypes.ENUM('active', 'inactive'),
            defaultValue:'active'
        },
        created_by:{
            type:DataTypes.INTEGER,
            allowNull: false
        },
    },
    {
        freezeTableName:true,
        timestamps:true,
    }
    
);

// Define the association
// Theatre.hasMany(Screen, { onDelete: 'CASCADE' });
Screen.belongsTo(Theatre, { foreignKey: 'theatre_id', allowNull: false});

//export Schema
module.exports = Screen;