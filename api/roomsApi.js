const express = require("express");
const roomsApiRouter = express.Router();
var rooms = require('../data/rooms.json');
var messages = require('../data/messages.json');
const _ = require('lodash');
const uuid = require("node-uuid");

roomsApiRouter.route('/')
    .get((req, res, next)=>{
        res.json(rooms);
    });

roomsApiRouter.route('/:roomId/messages')
    .all( (req, res, next)=>{
      var roomId = req.params.roomId;

      var room = _.find(rooms, (room)=>{
          return room.id === roomId;
      });
        
        if(!room){
            res.sendStatus(404);
        }

      var message = messages.filter( (message)=>{
          return roomId === message.roomId;
      })
        res.locals.room = room;
        res.locals.messages = message;
        res.locals.roomId = roomId;
        next();
    })
    .get((req, res, next)=>{
        res.send({
            room : res.locals.room,
            messages : res.locals.messages
        });
    })
    .post((req, res, next)=>{
        var message = {
            text: req.body.text,
            roomId: res.locals.roomId,
            userId: "44f885e8-87e9-4911-973c-4074188f408a",
            id: uuid.v4()
        };

        messages.push(message);
        res.sendStatus(200);
    })
    .delete((req, res, next)=>{

    });

module.exports = roomsApiRouter;