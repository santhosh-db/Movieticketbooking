const initializeRoutes = (app) => {
  app.use("/api/user", require("./user"));
  app.use("/api/admin", require("./admin"));
  app.use("/api/superAdmin", require("./superAdmin"));
  app.use("/api", require("./auth"));
};

module.exports = initializeRoutes;
