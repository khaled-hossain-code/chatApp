/**
 * Created by khaled on 12/4/2016.
 */
const express= require("express"); 
const app = express();
const http = require('http');
const server = http.createServer(app);

app.use(express.static('public'));
app.use(express.static("node_modules/bootstrap/dist"));

server.listen(3000, ()=>{
    console.log("server on port 3000 running");
})