const { DataTypes } = require('sequelize');
const sequelize=require('../config/dbConnection');
const User = require('./User');
const Schedule = require('./Schedule');

//define schema
const Ticket = sequelize.define('tickets',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement:true,
            allowNull: false,
            primaryKey: true,
            },
        schedule_id:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        user_id:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        bookingOn: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        totalSeats: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        seats: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        totalCost: {
            type: DataTypes.FLOAT,
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

// Define the association
Ticket.belongsTo(Schedule, { foreignKey: 'schedule_id', allowNull: false });
Ticket.belongsTo(User, { foreignKey: 'user_id', allowNull: false });

//export Schema
module.exports = Ticket;