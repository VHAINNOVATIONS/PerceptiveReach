'use strict';

//var mongoose = require('mongoose');
var passport = require('passport');
var config = require('../config/environment');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var compose = require('composable-middleware');
var User = require('../api/user/user.model');
var validateJwt = expressJwt({ secret: config.secrets.session });
var forge = require('node-forge');

/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 */
function isAuthenticated() {
  return compose()
    // Validate jwt
    .use(function(req, res, next) {
      // allow access_token to be passed through query parameter as well
      if(req.query && req.query.hasOwnProperty('access_token')) {
        req.headers.authorization = 'Bearer ' + req.query.access_token;
        //console.log("request access token: " + req.query.access_token);
      }
      validateJwt(req, res, next);
    })
    // Attach user to request
    .use(function(req, res, next) {
      console.log(req);
      User.findById(req.user.UserID, function (err, user) {
        if (err) return next(err);
        if (!user) return res.send(401);

        req.user = user;
        next();
      });
    });
}

/**
 * Checks if the user role meets the minimum requirements of the route
 */
function hasRole(roleRequired) {
  if (!roleRequired) throw new Error('Required role needs to be set');

  return compose()
    .use(isAuthenticated())
    .use(function meetsRequirements(req, res, next) {
      if (config.userRoles.indexOf(req.user.role) >= config.userRoles.indexOf(roleRequired)) {
        next();
      }
      else {
        res.send(403);
      }
    });
}

/**
 * Returns a jwt token signed by the app secret
 */
function signToken(id) {
  return jwt.sign({ UserID: id }, config.secrets.session, { expiresInMinutes: 60*5 });
}

/**
 * Set token cookie directly for oAuth strategies
 */
function setTokenCookie(req, res) {
  if (!req.user) return res.json(404, { message: 'Something went wrong, please try again.'});
  var token = signToken(req.user._id, req.user.role);
  res.cookie('token', JSON.stringify(token));
  res.redirect('/');
}

/**
 * Authenticates user against active directory with NodeSSPI
 * 
 */
function authenticate(req, res, user, callback) {
  console.log("inside authenticate first - nodesspi");
  var nodeSSPI = require('node-sspi');  // To make it work from MAC during development
  var cb = callback;
  var nodeSSPIObj = new nodeSSPI({
    offerSSPI: false,
    maxLoginAttemptsPerConnection: 5,
    offerBasic: false,
    retrieveGroups: true,
    domain: user.data.UserDomain,
    authoritative:false
  });
  
  //Decrypt password
  var decipher = forge.cipher.createDecipher('AES-CBC', forge.util.decode64(config.encryptionObj.key));
  decipher.start({iv: forge.util.decode64(config.encryptionObj.iv)});
  decipher.update(forge.util.createBuffer(forge.util.decode64(user.tempPass)));
  decipher.finish();
  var password = decipher.output.toString();
  //console.log("password before decrypt: ", user.tempPass);
  //console.log("password after decrypt: ", password);

  var username = user.data.UserName;
  //var password = user.tempPass;
  var authdata = new Buffer(username + ":" + password).toString('base64');
  console.log("AuthData Output: ",authdata);
  req.headers["authorization"] = "Basic " + authdata;
  req.rawHeaders.push("authorization");
  req.rawHeaders.push("Basic " + authdata);
  //console.log("Authorization Header: ",req.headers["authorization"]);
  console.log("Before Request Output: ",req);
  try{
    nodeSSPIObj.authenticate(req, res, function(err){
      console.log("After Request Output: ",req);
      if (err){
        console.log("error: ",err);
        //res.json(401, {message: 'This password is not correct.'});
        return cb(err, false);
      }
      var userObj = req.connection.user;
      console.log("userObj:: ",userObj);
      if(userObj !== undefined){
        var userObj = userObj.split("\\");
        var user = {username: userObj[1], domain: userObj[0], userRole: "admin"};
        console.log("userOBJ: ", userObj);
        return cb(null, true);
      }
      return cb("UserObject Null", false);  
      //res.json(user);
    })
  } catch (err){
      console.log("TryCatch error:", err);
      return cb(err, false);
  }
  
}

exports.isAuthenticated = isAuthenticated;
exports.hasRole = hasRole;
exports.signToken = signToken;
exports.setTokenCookie = setTokenCookie;
exports.authenticate = authenticate;