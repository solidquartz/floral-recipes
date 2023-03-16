require("dotenv").config();
import express from "express";
import { db, poolConfig } from "./configs/db.config";
import { ormDb } from "./configs/db-orm";
import cookieParser from "cookie-parser";
import passport from "passport";
import session from "express-session";
import pgConnect from "connect-pg-simple";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import { configurePassport } from "./auth";

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

  app.use(bodyParser.json());
  app.use(morgan("dev"));
  app.use(cookieParser());
  app.use(express.json());

  //middleware
  app.use(
    cors({
      origin:
        process.env.NODE_ENV === "production"
          ? "your production url"
          : "http://localhost:5173",
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
      credentials: true,
    })
  );

  const connectStore = pgConnect(session);
  const sessionStore = new connectStore({ conObject: poolConfig });

  app.use(
    session({
      store: sessionStore,
      secret: process.env.SESSION_SECRET,
      resave: true,
      saveUninitialized: false,
      cookie: {
        secure: false,
        httpOnly: false,
        sameSite: false,
        maxAge: 1000 * 60 * 60 * 24,
      },
    })
  );

  configurePassport(passport, app);

  //routes
  app.use("/flowers", registerFlowers());
  app.use("/projects", registerProjects());
  app.use("/auth", registerUsers());

  //listen
  app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT} 👀`);
  });
};

run();
