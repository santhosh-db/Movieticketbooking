const { DataTypes } = require('sequelize');
const sequelize=require('../config/dbConnection');
const Movie = require('./Movie');
const Screen = require('./Screen');

//define schema
const Schedule = sequelize.define('schedules', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement:true,
        allowNull: false,
        primaryKey: true,
    },
    movie_id:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    screen_id:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    show_date:{
        type:DataTypes.DATEONLY,
        allowNull:false
    },
    startTime:{
        type:DataTypes.TIME,
        allowNull:false
    },
    intervalTime:{
        type:DataTypes.TIME,
        allowNull:false
    },
    endTime:{
        type:DataTypes.TIME,
        allowNull:false
    },
    status:{
        type:DataTypes.ENUM('active', 'inactive'),
        defaultValue:'active'
    },
    scheduled_by:{
        type:DataTypes.INTEGER,
        allowNull: false
    },
},{
    freezeTableName:true,
    timestamps:true,
});

// Define the association
// Schedule.hasMany(Movie, { onDelete: 'CASCADE' });
// Screen.hasMany(Schedule, { onDelete: 'CASCADE' });
Schedule.belongsTo(Movie, { foreignKey: 'movie_id', allowNull: false });
Schedule.belongsTo(Screen, { foreignKey: 'screen_id', allowNull: false });

//export Schema
module.exports = Schedule;