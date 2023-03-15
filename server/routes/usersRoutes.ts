import express from "express";
import bcrypt from "bcryptjs";
const passport = require("passport");
const bcrypt = require("bcryptjs");
import { db } from "../configs/db.config";

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
