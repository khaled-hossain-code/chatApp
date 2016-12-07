const express = require("express");
const uuid = require("node-uuid");
const _ = require("lodash");
var rooms = require("../data/rooms.json");
const adminRouter = express.Router();

//restricting unauthorized users
adminRouter.use((req,res,next)=>{
    if(req.user.admin){
        next();
        return;
    }
    res.redirect('/login');
})

adminRouter.use((req, res, next)=>{
    res.locals.admin = req.baseUrl;
    next();
});

adminRouter.get('/rooms', (req, res, next) => {
    res.render("rooms", {
        title: "Admin Rooms",
        rooms: rooms,
        admin: req.baseUrl
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

        if (!room) {
            res.sendStatus(404);
        }

        rooms.push(room);
        res.redirect(req.baseUrl + "/rooms");
    });

adminRouter.route('/rooms/edit/:roomId')
    .all((req, res, next) => {
        const roomId = req.params.roomId;
        var room = _.find(rooms, (room) => {
            return roomId === room.id
        });

        if (!room) {
            res.sendStatus(404);
        }

        res.locals.room = room;
        next();
    })
    .get((req, res, next) => {

        res.render("edit");
    })
    .post((req, res, next) => {
        res.locals.room.name = req.body.name;
        res.redirect(req.baseUrl + "/rooms");
    });


adminRouter.get('/rooms/delete/:roomId', (req, res, next) => {
    const roomId = req.params.roomId;
    rooms = rooms.filter((room) => {
        return roomId !== room.id
    });
    res.redirect(req.baseUrl + "/rooms");
});


module.exports = adminRouter;