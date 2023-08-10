const {Router} =require('express');
const { userController } = require("../controllers");
const {verifyToken}=require("../middleware/verifyToken");
const {authorizeUser}=require("../middleware/authorization");
const {movieValid,ticketBook,ticketAvailable} = require("../validators/user.validator");
const userRoutes = Router();

userRoutes.get('/movieList/:date',verifyToken,authorizeUser,movieValid,userController.movieList);
userRoutes.get('/seatAvailabilty',verifyToken,authorizeUser,ticketAvailable,userController.seatAvailabilityList);
userRoutes.get('/bookingHistory',verifyToken,authorizeUser,userController.bookingHistory);
userRoutes.get('/movieList/:date',verifyToken,authorizeUser,movieValid,userController.movieList);
userRoutes.post('/ticketBook',verifyToken,authorizeUser,ticketBook,userController.ticketBook);
userRoutes.delete('/ticketCancel/:id',verifyToken,authorizeUser,userController.ticketCancel);

module.exports = userRoutes;