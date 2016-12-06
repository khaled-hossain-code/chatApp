const express = require("express");
const uuid = require("node-uuid");
const _ = require("lodash");
var rooms = require("../data/rooms.json");
const adminRouter = express.Router();

adminRouter.get('/rooms', (req, res, next) => {
    res.render("rooms", { 
        title: "Admin Rooms",
        rooms: rooms
    });
});

adminRouter.route('/rooms/add')
    .get((req, res, next) => {
        res.render("add");
    })
    .post((req, res, next) => {
        const room = {
            name: req.body.name,
            id: uuid.v4()
        };

        if(!room){
            res.sendStatus(404);
        }

        rooms.push(room);
        res.redirect("/admin/rooms");
   });

adminRouter.route('/rooms/edit/:roomId')
  .get( (req, res, next) => {
    const roomId = req.params.roomId;
    var room = _.find( rooms, (room) => {
        return roomId === room.id
    });

    if(!room){
        res.sendStatus(404);
    }

    res.render("edit",{room});
    })
  .post( (req, res, next) => {
    const roomId = req.params.roomId;
    const roomName = req.body.name;
    var room = _.find( rooms, (room) => {
        return roomId === room.id
    });

    room.name = roomName;

    res.redirect("/admin/rooms");
});


adminRouter.get('/rooms/delete/:roomId', (req, res, next) => {
    const roomId = req.params.roomId;
    rooms = rooms.filter( (room) => {
        return roomId !== room.id
    });
    res.redirect("/admin/rooms/");
});





module.exports = adminRouter;