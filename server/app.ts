require("dotenv").config();
import express from "express";
import { db } from "./configs/db.config";
import { ormDb } from "./configs/db-orm";

//routes import
import { registerFlowers } from "./routes/flowersRoutes";
import { registerProjects } from "./routes/projectsRoutes";

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

  //listen
  app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT} 👀`);
  });


  //middleware
  app.use(cors());
  app.use(express.json());
  app.use(bodyParser.json());
  app.use(morgan("dev"));

  //routes
  app.use("/flowers", registerFlowers());
  app.use("/projects", registerProjects());

  app.get("/", (req, res) => {
    res.json({ greetings: "hello world" });
  });
};

run();
