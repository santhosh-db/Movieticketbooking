const { Router } = require("express");
const { authController } = require("../controllers");

const {signUp,signIn } = require("../validators/auth.validator");
const authRoutes = Router();

//signUp
authRoutes.post(
  "/createUser",
  signUp,
  authController.register
);

//signIn
authRoutes.post(
    "/login",
    signIn,
    authController.login
);

module.exports = authRoutes;
