const sequelize=require('../config/dbConnection');


const User = require('./User');
const Theatre = require('./Theatre');
const Screen = require('./Screen');
const Schedule = require('./Schedule');
const Ticket = require('./Ticket');
sequelize.models={User,Theatre,Screen,Schedule,Ticket}

module.exports = {sequelize};