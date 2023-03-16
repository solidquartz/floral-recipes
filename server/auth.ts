import { Strategy as LocalStrategy } from "passport-local";
import { Users } from "./db/entities";
import bcrypt from "bcryptjs";
import { PassportStatic } from "passport";
import { Express } from 'express';

export const checkAuth = (req, res, next) => {
  console.log('session', req.session);

  if (req.isAuthenticated()) {
    return next();
  }

  console.log('no auth');
  // res.status(401).send();
};

const authUser = async (username, password, done) => {
  const user = await Users.findOneBy({
    username,
  });

  if (!user) {
    return done(null, false);
  }

  bcrypt.compare(password, user.password, (err, result) => {
    if (err) {
      throw err;
    }
    if (result === true) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  });
};

export const configurePassport = (passport: PassportStatic, app: Express) => {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(new LocalStrategy(authUser));

  passport.serializeUser((user: any, done) => {
    process.nextTick(() => {
      done(null, { id: user.id, username: user.username });
    });
  });

  passport.deserializeUser((user, done) => {
    process.nextTick(() => {
      return done(null, user);
    });
  });
};
