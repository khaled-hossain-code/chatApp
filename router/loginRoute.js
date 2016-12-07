const express = require('express');
const loginRouter = express.Router();
const passport = require("passport");
const users = require("../data/users.json");

loginRouter.route('/')
    .get((req, res, next)=>{
        if(req.app.get("env") === "development"){
            let user = users[0];
            req.login(user, (err)=>{
                if(err){
                    next(err);
                }
                return res.redirect('/');
            });
        }
        res.render('login');
    })
    .post( passport.authenticate('local',{
        successRedirect: '/',
        failureRedirect: '/login'
    }));

module.exports = loginRouter;