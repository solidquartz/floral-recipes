require("dotenv").config();
import express from "express";
import { db } from "./configs/db.config";
import { ormDb } from "./configs/db-orm";
import cookieParser from "cookie-parser";
import passport from "passport";
import passportLocal from "passport-local";
import bcrypt from "bcryptjs";
const bcrypt = require("bcryptjs");

const LocalStrategy = passportLocal.Strategy;

//routes import
import { registerFlowers } from "./routes/flowersRoutes";
import { registerProjects } from "./routes/projectsRoutes";
import { registerUsers } from "./routes/usersRoutes";


const run = async () => {
  try {
    await ormDb.initialize();
    await db.connect();
  } catch (err) {
    console.error(err);
  }

  const app = express();

  const { PORT } = process.env;
  const bodyParser = require("body-parser");
  const cors = require("cors");
  const morgan = require("morgan");
  const session = require("express-session");

  //listen
  app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT} 👀`);
  });

  //middleware
  app.use(cors());
  app.use(express.json());
  app.use(
    session({
      secret: "secretcode",
      resave: true,
      saveUninitialized: true,
    })
  );
  app.use(bodyParser.json());
  app.use(morgan("dev"));
  app.use(cookieParser());
  app.use(passport.initialize());
  app.use(passport.session());

  //routes
  app.use("/flowers", registerFlowers());
  app.use("/projects", registerProjects());
  app.use("/auth", registerUsers());

  app.get("/", (req, res) => {
    res.json({ greetings: "hello world" });
  });
};

run();
