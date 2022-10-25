const passport = require('passport');
const passportJWT = require('passport-jwt');
const User = require('./models/userSchema');

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const verifyCallback = (payload, done) => {
  return User.findOne({_id: payload.id})
      .then(user => {
          return done(null, user);
      })
      .catch(err => {
          return done(err);
      });
}
const config = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

passport.use(User.createStrategy());
passport.use(new JWTStrategy(config, verifyCallback));

module.exports = passport;