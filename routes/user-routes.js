const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/User');


// middleware to check if user isAuthenticated   logged in 

isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/users/login');
    }
};

// login user view

router.get('/login', (req, res) =>  {
    res.render('user/login', {
        error: req.flash('error')
    });
});

// login post request

// router.post('/login', (req, res) =>  {
//     console.log(req.body);
//     // res.json('login in user ...');
// });

router.post('/login', passport.authenticate('local.login', { 
    successRedirect: '/users/profile',
    failureRedirect: '/users/login',
    failureFlash: true 
   }));

// sign up form

router.get('/signup', (req, res) =>  {
    res.render('user/signup', {
        error: req.flash('error')
    });
});

// sign up post request

// router.post('/signup', (req, res) =>  {
//     console.log(req.body);
//     // res.json('register user sign up ...');
// });

router.post('/signup', passport.authenticate('local.signup', { 
                                                              successRedirect: '/users/profile',
                                                              failureRedirect: '/users/signup',
                                                              failureFlash: true 
                                                             }));


// profile

router.get('/profile', isAuthenticated, (req, res) =>  {
    res.render('user/profile', {
        success: req.flash('success')
    });
});

// logout user

router.get('/logout', (req, res) =>  {
    // res.json('logout user');
    req.logout();
    res.redirect('/users/login');
});

module.exports = router;