'use strict';

var express = require('express');
var passport = require('passport');
var auth = require('../auth.service');
var config = require('../../config/environment');
var User = require('../../api/user/user.model');
var forge = require('node-forge');


var router = express.Router();

router.post('/', function(req, res, next) {
 passport.authenticate('local', function (err, user, info) {
    var error = err || info;
    if (error) return res.json(401, error);
    if (!user) return res.json(404, {message: 'Something went wrong, please try again.'});

    if(!config.bypassAuth){  
        auth.authenticate(req, res, user, function(error, isAuthenticated){
            console.log("return error: ", error);
            console.log("return response: ", isAuthenticated);
            if (!isAuthenticated)
            {
                User.Update({
                        UserName: user.data.UserName,
                        Status: 'loginerror'
                     }, function(err, user) {                
                            if (err) return res.json(401,'ERROR:Updating user record after authentication'); 
                    });
                return res.json(401, 'This password is not correct.'); 
            }
            else{
                User.Update({
                        UserName: user.data.UserName,
                        Status: 'loginsuccess'
                     }, function(err, user) {                
                            if (err) return res.json(401,'ERROR:Updating user record after authentication'); 
                    });
                var token = auth.signToken(user.data.UserID, user.data.UserRole);
                console.log("signedToken: " + token);
                delete user['tempPass'];
                var timeStampKey = forge.util.bytesToHex(forge.random.getBytesSync(16));//(new Date().getTime());
                var lowercasename = user.data.UserName.toLowerCase();
                var sessionKey = lowercasename+'::'+timeStampKey;
                if(!config.prSessionStore[lowercasename])
                {
                 config.prSessionStore[lowercasename] = {};
                }
                config.prSessionStore[lowercasename][timeStampKey] = (new Date()).getTime();
                //config.prSessionStore[sessionKey] = (new Date()).getTime();
                res.json({token: token, user: user, prSessionKey:sessionKey });
            }
        }); 
    }
    else{

        User.Update({
                        UserName: user.data.UserName,
                        Status: 'loginsuccess'
                     }, function(err, user) {                
                            if (err) return res.json(401,'ERROR:Updating user record after authentication'); 
                    });
        var token = auth.signToken(user.data.UserID, user.data.UserRole);
        console.log("signedToken: " + token)
        delete user['tempPass'];
        var timeStampKey = forge.util.bytesToHex(forge.random.getBytesSync(16));//(new Date().getTime());
        var lowercasename = user.data.UserName.toLowerCase();
        var sessionKey = lowercasename+'::'+timeStampKey;
        if(!config.prSessionStore[lowercasename])
        {
         config.prSessionStore[lowercasename] = {};
        }
        config.prSessionStore[lowercasename][timeStampKey] = (new Date()).getTime();
        console.log("sessionkey:", sessionKey);
        //config.prSessionStore[sessionKey] = (new Date()).getTime();
        res.json({token: token, user: user, prSessionKey:sessionKey });
    }    
  })(req, res, next)
    
});


module.exports = router;