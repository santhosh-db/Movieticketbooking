const express = require('express'); 
const cors =require('cors');
const routers= require('./src/routes');
const db = require('./src/config/dbConnection');
const morgan=require('morgan')
require ('dotenv').config();
const {sequelize}=require("./src/models")

const app=express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

// Use morgan middleware to log incoming requests
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send('Hello, world!');
  });

//healthcheck
app.use("/api/healthCheck", (req, res) => {
  res.status(200).json({ status: "success", message: "App Running successfully" })
});

//routes
routers(app);

//unknown routes
app.use('/api/v1/*', (req, res) => {
    res.status(404).json({
      status: 404,
      message: 'Ohh you are lost, Please read the API documentation!'
    });
});

//db Connect
db.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
});

//db sync
sequelize.sync({alter:true})
.then(() => {
    console.log("Table updations done");
}).catch(err=>{
    console.log("DB Sync Error",err);
})

//NODE_ENV
console.log(`Node env is ${process.env.NODE_ENV}`);


//PORT
const PORT=process.env.APP_PORT || 5000;
app.listen(PORT,()=>{
    console.log(`App listening on port ${PORT}`)
})

module.exports=app;