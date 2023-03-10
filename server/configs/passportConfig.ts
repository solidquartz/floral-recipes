const LocalStrategy = require("passport-local");
const { userExists, createUser, matchPassword } = require("./usersRoutes");

module.exports = (passport) => {
  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password",
      },
      async (username, password, done) => {
        try {
          const checkUserExists = await userExists(username);
          if (checkUserExists) {
            return done(null, false);
          }
          const user = await createUser(username, password);
          return done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
  );
  passport.use(
    "local-login",
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password",
      },
      async (username, password, done) => {
        try {
          const user = await userExists(username);
          if (!user) return done(null, false);
          const isMatch = await matchPassword(password, user.password);
          if (!isMatch) return done(null, false);
          return done(null, { id: user.id, email: user.email });
        } catch (error) {
          return done(error, false);
        }
      }
    )
  );
};
