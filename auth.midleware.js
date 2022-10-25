const passport = require('passport');

const authMidlewear = async (req, res, next) => {
    return await passport.authenticate('jwt', { session: false })(req, res, next);
  }

module.exports = authMidlewear;