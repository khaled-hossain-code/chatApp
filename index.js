/**
 * Created by khaled on 12/4/2016.
 */
const express= require("express"); 
const app = express();
const http = require('http');
const server = http.createServer(app);

//pug & ejs does not require to call explicitely, express does it internally
app.set("views", "./views");

app.use(express.static('public'));
app.use(express.static("node_modules/bootstrap/dist"));

app.get('/rooms', (req, res, next)=>{
    res.render("rooms.pug");
})

server.listen(3000, ()=>{
    console.log("server on port 3000 running");
})