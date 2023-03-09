// Database connections
import { Pool } from "pg";

const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE, DB_PORT } = process.env;

export const db = new Pool({
  user: DB_USER,
  host: DB_HOST,
  password: DB_PASSWORD,
  port: Number(DB_PORT ?? 0),
  database: DB_DATABASE,
});

// db.connect()
//   .then(() => {
//     console.log("Database connection established.");
//   })
//   .catch((e: any) => {
//     throw new Error(e);
//   });
