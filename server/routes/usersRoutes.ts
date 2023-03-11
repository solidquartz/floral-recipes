import express from "express";
const passport = require("passport");
require("../configs/passportConfig")(passport);

export const registerUsers = () => {
  const app = express.Router();

  //routes for login and signup
  app.post(
    "/signup",
    passport.authenticate("local-signup", { session: false }),
    (req, res, next) => {
      res.status(204).json({
        status: "success",
      });
    }
  );

  app.post(
    "/login",
    passport.authenticate("local-login", { session: false }),
    (req, res, next) => {
      res.status(204).json({
        status: "success",
      });
    }
  );

};
