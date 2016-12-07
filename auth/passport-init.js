const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const users = require('../data/users.json');
const _ = require('lodash');

passport.use(new localStrategy((username, password, done)=>{ //local strategy is a class

    let user = _.find(users, (u)=>{
        return u.name === username;
    });

    if( !user || user.password !== password){
        done(null,false); //done with no error but authentication failed
        return; //this return must be here neither true done will be executed
    }

    done(null, user); //no error and passing the user object to keep it stored in session

}));

passport.serializeUser( (user, done)=>{ 
    done(null, user);  //serialize means use this user object and store it to the user session
});                    // here user comes from the above user passed in done function   

passport.deserializeUser( (user,done)=>{ //this user comes from serializeUser done function
    done(null, user); //deserialize means take the users data from session and attach it to the req object
})