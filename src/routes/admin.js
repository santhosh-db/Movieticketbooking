const {Router} =require('express');
const { adminController,superAdminController } = require("../controllers");
const {verifyToken}=require("../middleware/verifyToken");
const {authorizeAdmin}=require("../middleware/authorization");
const {createMovie,scheduleMovie} = require("../validators/admin.validator");
const {createScreen} = require("../validators/superAdmin.validator");
const adminRoutes = Router();

adminRoutes.post('/createMovie',verifyToken,authorizeAdmin,createMovie,adminController.createMovie);
adminRoutes.post('/scheduleMovie',verifyToken,authorizeAdmin,scheduleMovie,adminController.scheduleMovie);
adminRoutes.post('/createScreen',verifyToken,authorizeAdmin,createScreen,superAdminController.createScreen);
adminRoutes.put('/screenChange',verifyToken,authorizeAdmin,adminController.changeScreen);

module.exports = adminRoutes;