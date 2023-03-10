const bcrypt = require("bcryptjs");
import { db } from "../configs/db.config";

//create a new user
const createUser = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(req.password, salt);
  const data = await db.query(
    `INSERT INTO users(username, password) VALUES ($1, $2) RETURNING *`,
    [req.username, hash]
  );
  if (data.rowCount == 0) return false;
  return data.rows[0];
};

//check password for login
const matchPassword = async (password, hashPassword) => {
  const match = await bcrypt.compare(password, hashPassword);
  return match;
};

//checks to see if a user exists
const userExists = async (req, res) => {
  const data = await db.query(`SELECT * FROM users WHERE username=$1`, [
    req.username,
  ]);
  if (data.rowCount == 0) return false;
  return data.rows[0];
};

  module.exports = { userExists, createUser, matchPassword };