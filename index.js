/**
 * Created by khaled on 12/4/2016.
 */
const express = require("express");
const app = express();
const http = require('http');
const server = http.createServer(app);

var rooms = require("./data/rooms.json");

//pug & ejs does not require to call explicitely, express does it internally
app.set("views", "./views");
app.set("view engine", "pug");

app.use(express.static('public'));
app.use(express.static("node_modules/bootstrap/dist"));

app.get('/', (req, res, next) => {
    res.render("index", { title: "Home"});
});

app.get('/admin/rooms', (req, res, next) => {
    res.render("rooms", { 
        title: "Admin Rooms",
        rooms: rooms
    });
});

app.get('/admin/rooms/add', (req, res, next) => {
    res.render("add");
});

server.listen(3000, () => {
    console.log("server on port 3000 running");
});