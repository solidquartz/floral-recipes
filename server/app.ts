require("dotenv").config();
import express from "express";

const app = express();

const { PORT } = process.env;
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

//listen
app.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT} 👀`);
});

//routes import
import { registerFlowers } from "./routes/flowersRoutes";
import { registerProjects } from "./routes/projectsRoutes";

//middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(morgan("dev"));

//routes
app.use('/flowers', registerFlowers());
app.use('/projects', registerProjects());

app.get("/", (req, res) => {
  res.json({ greetings: "hello world" });
});
