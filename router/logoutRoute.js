const express = require('express');
const logoutRouter = express.Router();

logoutRouter.route('/')
    .get((req, res, next)=>{
        req.logout();
        res.redirect('/login');
    });

module.exports =  logoutRouter;