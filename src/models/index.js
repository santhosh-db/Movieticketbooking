const sequelize=require('../config/dbConnection');


const User = require('./User');
const Theatre = require('./Theatre');
const Screen = require('./Screen');
const Schedule = require('./Schedule');
const Ticket = require('./Ticket');

sequelize.models={User,Theatre,Screen,Schedule,Ticket}


sequelize.sync({ force: false })
.then(() => {
    console.log('Table already exists')
}).catch(err=>{
    console.log("DB Sync Error",err);
})




module.exports = sequelize;