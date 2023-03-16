import express from "express";
import passport from "passport";
import bcrypt from "bcryptjs";
import { db } from "../configs/db.config";
import { checkAuth } from '../auth';

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

  //log in
  app.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        res.status(401).send();
      }

      req.logIn(user, (loginErr) => {
        if (loginErr) {
          return next(loginErr);
        }

        res.status(200).send({ username: user.username });
      });
    })(req, res, next);
  });

  app.get("/user", checkAuth, (req: any, res) => {
    res.send(req.session.passport.user.username);
  });

  //log out
  app.post("/logout", (req, res, next) => {
    console.log("smash dat logout button");

    req.logOut((err) => {
      if (err) {
        return next(err);
      }

      res.status(200).send();
    });
  });

  return app;
};
