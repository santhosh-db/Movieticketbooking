const response = require("../middleware/response");
const { statusCodes, messages } = require("../config");
const { USER_TYPE } = require("../constants");

//define authorization
const authorizeUser = (req, res, next) => {
  try {
    if (req.user.role != USER_TYPE.USER) {
      return response.errors(
        req,
        res,
        statusCodes.HTTP_UNAUTHORIZED,
        undefined,
        messages.userAuthority
      );
    }
    next();
  } catch (error) {
    console.log("err", error);
    next(error);
  }
};

const authorizeAdmin = (req, res, next) => {
  try {
    if (req.user.role != USER_TYPE.ADMIN) {
      return response.errors(
        req,
        res,
        statusCodes.HTTP_UNAUTHORIZED,
        undefined,
        messages.adminAuthority
      );
    }
    next();
  } catch (error) {
    console.log("err", error);
    next(error);
  }
};

const authorizeSuperAdmin = (req, res, next) => {
  try {
    if (req.user.role != USER_TYPE.SUPERADMIN) {
      return response.errors(
        req,
        res,
        statusCodes.HTTP_UNAUTHORIZED,
        undefined,
        messages.superAdminAuthority
      );
    }
    next();
  } catch (error) {
    console.log("err", error);
    next(error);
  }
};

//export Authorization
module.exports = { authorizeUser, authorizeAdmin, authorizeSuperAdmin };
