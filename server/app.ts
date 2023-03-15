require("dotenv").config();
import express from "express";
import { db } from "./configs/db.config";
import { ormDb } from "./configs/db-orm";
import cookieParser from "cookie-parser";
import passport from "passport";
import passportLocal from "passport-local";
import session from "express-session";
import bcrypt from "bcryptjs";
const bcrypt = require("bcryptjs");

const LocalStrategy = passportLocal.Strategy;

//routes import
import { registerFlowers } from "./routes/flowersRoutes";
import { registerProjects } from "./routes/projectsRoutes";
import { registerUsers } from "./routes/usersRoutes";
import { Users } from "db/entities";

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

  //passport
  passport.use(
    new LocalStrategy((username, password, done) => {
      db.query(
        "SELECT * FROM users WHERE username = $1",
        [username],
        (err, user: any) => {
          if (err) throw err;
          if (!user) return done(null, false);
          bcrypt.compare(password, user.password, (err, result) => {
            if (err) throw err;
            if (result === true) {
              return done(null, user);
            } else {
              return done(null, false);
            }
          });
        }
      );
    })
  );
  passport.serializeUser((user: any, cb) => {
    cb(null, user.id);
  });
  passport.deserializeUser((id: string, cb) => {
    db.query("SELECT * FROM users WHERE id = $1", [id], (err, user: any) => {
      const userInformation = {
        username: user.username,
        id: user.id,
      };
      cb(err, userInformation);
    });
  });

  //routes
  app.use("/flowers", registerFlowers());
  app.use("/projects", registerProjects());
  app.use("/auth", registerUsers());

  app.get("/", (req, res) => {
    res.json({ greetings: "hello world" });
  });
};

run();
