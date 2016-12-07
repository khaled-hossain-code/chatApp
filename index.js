/**
 * Created by khaled on 12/4/2016.
 */
const express = require("express");
const app = express();
const http = require('http');
const server = http.createServer(app);
const bodyParser = require("body-parser");
const adminRouter = require("./router/adminRoute");
const loginRouter = require("./router/loginRoute");
const logoutRouter = require("./router/logoutRoute");
const roomsApiRouter = require("./api/roomsApi");
const {morgan,accessLogStream} = require("./logger/logger.js");
const session = require('express-session');
const passport = require("passport");
require("./auth/passport-init.js"); //making sure that passport configuration is executed
//pug & ejs does not require to call explicitely, express does it internally
app.set("views", "./views");
app.set("view engine", "pug");

// **********MiddleWares*********\\
//logging MiddleWare
app.use(morgan('combined',{stream:accessLogStream}));

//Serve Static Content Middleware
app.use(express.static('public'));
app.use(express.static("node_modules/bootstrap/dist"));
app.use(express.static("node_modules/jquery/dist"));

//Form Data parsing MiddleWare
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

//session Middleware
app.use(session({
    secret: 'this is a session secret key',
    resave: false,
    saveUninitialized: false
}));

//Authentication Middleware
app.use(passport.initialize());
app.use(passport.session());

//authenticate is first, protecting all other routes bellow it
app.use('/login', loginRouter);

//restricting unauthorized users
app.use((req,res,next)=>{
    if(req.isAuthenticated()){
        next();
        return;
    }
    res.redirect('/login');
})
app.get('/', (req, res, next) => {
    res.render("home", { title: "Home"});
});

app.use('/logout', logoutRouter);
app.use('/admin',adminRouter);
app.use('/api/rooms', roomsApiRouter);

server.listen(3000, () => {
    console.log("server on port 3000 running");
});