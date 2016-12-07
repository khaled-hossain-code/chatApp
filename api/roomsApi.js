const express = require("express");
const roomsApiRouter = express.Router();
var rooms = require('../data/rooms.json');
var messages = require('../data/messages.json');
var users = require('../data/users.json');
const _ = require('lodash');
const uuid = require("node-uuid");

roomsApiRouter.route('/')
    .get((req, res, next)=>{
        res.json(rooms);
    });

roomsApiRouter.route('/:roomId/messages')
    .all( (req, res, next)=>{
      var roomId = req.params.roomId;
      //getting the room object from rooms.json
      var room = _.find(rooms, (room)=>{
          return room.id === roomId;
      });
        
        if(!room){ //if there no room found
            res.sendStatus(404);
        }
    //getting the message for the specific message for the room from messages.json
      var message = messages
      .filter( (message)=>{ //filtering only the roomID specific messages 
          return roomId === message.roomId;
      })
      .map( (m)=>{ //map each message and attach username infront of each message
          let user = _.find(users, (u)=>{ //find user from users.json
              return u.id === m.userId; //if the user id matches return user object
          });

          return { //each message will look like "wes: i am a blogger..."
              text:`${user.name}: ${m.text}`
          };
      });

      //attaching message & room object for further use
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
            userId: req.user.id,
            id: uuid.v4()
        };

        messages.push(message);
        res.sendStatus(200);
    })
    .delete((req, res, next)=>{

        messages = messages.filter( (message)=>{
            return message.roomId !== res.locals.roomId;
        });

        res.sendStatus(200);
    });

module.exports = roomsApiRouter;