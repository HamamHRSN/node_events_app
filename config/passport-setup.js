// npm install passport passport-local bcrypt-nodejs

const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/User');

// saving user object in the session

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  // signup strategy

passport.use('local.signup', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true // to get all req.body from the from 
}, (req, username, password, done) => {
    // console.log(req.body);

    if (req.body.password != req.body.confirm_password) {
        return done(null, false, req.flash('error', 'Passwords is not a match..'));
    } else {
        User.findOne({email: username}, (err, user) => {
            if (err) {
                return done(err);
            }
            if (user) {
                return done(null, false, req.flash('error', 'Email already exist..'));
            }
            if (!user) {
                // create user
                let newUser = new User();
                newUser.email = req.body.email;
                newUser.password = newUser.hashPassword(req.body.password);
                newUser.avatar = "profile.png"
                newUser.save((err, user) => {
                    if (!err) {
                      return done(null, user, req.flash('success', 'Your register is success..'));  
                    } else {
                        console.log(err);
                    }
                });
            }
        })
    }
}));


// login strategy

passport.use('local.login', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true 
}, (req, username, password, done) => {
    // find user
    User.findOne({email: username}, (err, user) => {
       if (err) {
        return done(null, false, req.flash('error', 'Passwords is not right'));
       }
       if (!user) {
        return done(null, false, req.flash('error', 'No user exist on this account'));
       }
       if (user) {
             if (user.comparePasswords(password, user.password)) {
                 return done(null, user, req.flash('success', 'Welcome back'));
             } else {
                return done(null, false, req.flash('error', 'Password is wrong'));               
             }
       }
    });
}));
