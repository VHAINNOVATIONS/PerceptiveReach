var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

exports.setup = function (User, config) {
  passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password' // this is the virtual field on the model
    },
    function(email, password, done) {
      User.findOne({
        UserName: email.toLowerCase()
      }, function(err, user) {                
        if (err) return done(err);

        if (!user) {
          return done(null, false, { message: 'This user is not registered or does not exist.' });
        }
       /* if (Auth.authenticate(user, password)) {
          return done(null, false, { message: 'This password is not correct.' });
        }*/
        if(user){
          user['tempPass'] = password;          
        }
        console.log("UserObj: ", user);
        return done(null, user);
      });
    }
  ));
};