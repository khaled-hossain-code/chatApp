/**
 * Created by khaled on 12/4/2016.
 */
const express = require("express");
const app = express();
const http = require('http');
const server = http.createServer(app);

//pug & ejs does not require to call explicitely, express does it internally
app.set("views", "./views");

app.use(express.static('public'));
app.use(express.static("node_modules/bootstrap/dist"));

app.get('/', (req, res, next) => {
    res.render("index.pug", { title: "Home"});
});

app.get('/admin/rooms', (req, res, next) => {
    res.render("rooms.pug", { title: "Admin Rooms"});
});

server.listen(3000, () => {
    console.log("server on port 3000 running");
});