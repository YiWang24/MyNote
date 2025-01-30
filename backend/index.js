const express = require("express");
const mongoose = require("mongoose");
const { expressjwt } = require("express-jwt");
const config = require("./config/config");
const routers = require("./routes/index");
const cors = require("cors");
const app = express();

mongoose
  .connect(config.db.url)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error(err);
  });

app.use(cors({ origin: config.cors.origin, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  expressjwt({ secret: config.jwt.secret, algorithms: ["HS512"] }).unless({
    path: ["/api/auth/login", "/api/auth/register"],
  })
);

app.use(`${config.app.apiPrefix}`, routers); // all routes are prefixed with /api

app.listen(config.app.port, () => {
  console.log(`Server started on port ${config.app.port}`);
});
