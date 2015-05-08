'use strict';

var express = require('express');
var passport = require('passport');
var auth = require('../auth.service');

var router = express.Router();

router.post('/', function(req, res, next) {
 passport.authenticate('local', function (err, user, info) {
    var error = err || info;
    if (error) return res.json(401, error);
    if (!user) return res.json(404, {message: 'Something went wrong, please try again.'});

    auth.authenticate(req, res, user, function(error, isAuthenticated){
    	console.log("return error: ", error);
    	console.log("return response: ", isAuthenticated);
    	if (!isAuthenticated)
    		return res.json(401, {message: 'This password is not correct.'}); 
    	else{
    		var token = auth.signToken(user.data.UserID, user.data.UserRole);
    		console.log("signedToken: " + token)
    		delete user['tempPass'];
    		res.json({token: token, user: user});
    	}
    }); 

    //var token = auth.signToken(user.data.UserID, user.data.UserRole);
    //console.log("signedToken: " + token)
    //res.json({token: token, user: user});
  })(req, res, next)
    
});

module.exports = router;