const {Router} =require('express');
const {adminController,superAdminController } = require("../controllers");
const {verifyToken}=require("../middleware/verifyToken");
const {authorizeSuperAdmin}=require("../middleware/authorization");
const {createTheatre,createScreen,createAdmin} = require("../validators/superAdmin.validator");
const {scheduleMovie} = require("../validators/admin.validator");
const superAdminRoutes = Router();

superAdminRoutes.post('/createTheatre',verifyToken,authorizeSuperAdmin,createTheatre,superAdminController.createTheatre);
superAdminRoutes.post('/createScreen',verifyToken,authorizeSuperAdmin,createScreen,superAdminController.createScreen);
superAdminRoutes.post('/createAdmin',verifyToken,authorizeSuperAdmin,createAdmin,superAdminController.createAdmin);
superAdminRoutes.post('/scheduleMovie',verifyToken,authorizeSuperAdmin,scheduleMovie,adminController.scheduleMovie);
module.exports = superAdminRoutes;