import express from "express";
import bcrypt from "bcryptjs";
const passport = require("passport");
const bcrypt = require("bcryptjs");
import { db } from "../configs/db.config";
import passportLocal from "passport-local";

const LocalStrategy = passportLocal.Strategy;

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

export const registerUsers = () => {

  const app = express.Router();

  //register
  app.post("/register", async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const results = await db.query(
      `INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *`,
      [req.body.username, hashedPassword]
    );
    console.log(results);
    res.status(201).json({
      status: "created",
      data: {
        users: results.rows,
      },
    });
  });

  return app;
};
