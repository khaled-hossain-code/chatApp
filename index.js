/**
 * Created by khaled on 12/4/2016.
 */
const express = require("express");
const app = express();
const http = require('http');
const server = http.createServer(app);
const bodyParser = require("body-parser");
const adminRouter = require("./router/adminRoute");
const roomsApiRouter = require("./api/roomsApi");
const fs = require("fs");
const morgan = require("morgan");
var accessLogStream = fs.createWriteStream(__dirname+'/access.log',{flags:'a'});
//pug & ejs does not require to call explicitely, express does it internally
app.set("views", "./views");
app.set("view engine", "pug");

app.use(morgan('combined',{stream:accessLogStream}));
app.use(express.static('public'));
app.use(express.static("node_modules/bootstrap/dist"));
app.use(express.static("node_modules/jquery/dist"));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.get('/', (req, res, next) => {
    res.render("home", { title: "Home"});
});

app.use('/admin',adminRouter);
app.use('/api/rooms', roomsApiRouter);

server.listen(3000, () => {
    console.log("server on port 3000 running");
});