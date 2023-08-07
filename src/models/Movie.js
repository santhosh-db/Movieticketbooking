const { DataTypes } = require('sequelize');
const sequelize=require('../config/dbConnection');

//define schema
const Movie = sequelize.define('movies',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement:true,
            allowNull: false,
            primaryKey: true,
            },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        director: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        releaseDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        language: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        duration: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        status:{
            type:DataTypes.ENUM('active', 'inactive'),
            defaultValue:'active'
        }
    },
    {
        freezeTableName:true,
        timestamps:true,
    }
    
);

//export Schema
module.exports = Movie;