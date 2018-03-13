const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;

const UserModel = require('../models/user-model');

passport.serializeUser((userFormDb, next) => {
  next(null, userFormDb._id);
});

passport.deserializeUser((userId, next) => {
  UserModel.findById(userId, (err, userFormDb) => {
    if (err) {
      next(err);
      return;
    }

    next(null, userFormDb);
  });
});

passport.use(new LocalStrategy({
  usernameField: "loginUsername",
  passwordField: "loginPassword"
},
(theUsername, thePassword, next) => {
  UserModel.findOne({ username: theUsername }, (err, userFormDb) => {
    if (err) {
      next(err);
      return;
    }

    if (userFormDb === null) {
      next(null, false, { message: "Incorrect Username" });
      return;
    }

    if (bcrypt.compareSync(thePassword, userFormDb.encryptedPassword) === false) {
      next(null, false, { message: "Incorrect Password" });
      return;
    }

    next(null, userFormDb);
  });
}));