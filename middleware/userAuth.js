const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;


const userAuth = (req, res, next) => {
    let { USER } = req.cookies;
    if (USER) {
        next();
    } else {
        return res.redirect('/login');
    }
}

const localAuth = (passport) => {
    passport.use(new LocalStrategy(async (username, password, done) => {
      try {
        let user = await signIn.findOne({ username: username });
        if (!user) {
          return done(null, false, { message: "Incorrect username." });
        }
        if (user.password !== password) {
          return done(null, false, { message: "Incorrect password." });
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }));
    passport.serializeUser((user, done) => {
      done(null, user.id);
    });
  
    passport.deserializeUser(async (id, done) => {
      try {
        let user = await signIn.findById(id);
        done(null, user);
      } catch (error) {
        done(error);
      }
    });
  }

module.exports = { userAuth, localAuth };