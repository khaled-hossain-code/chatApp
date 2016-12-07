const express = require('express');
const loginRouter = express.Router();
const passport = require("passport");

loginRouter.route('/')
    .get((req, res, next)=>{
        res.render('login');
    })
    .post( passport.authenticate('local',{
        successRedirect: '/',
        failureRedirect: '/login'
    }));

module.exports = loginRouter;