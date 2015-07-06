/**
 * Express configuration
 */

'use strict';

var express = require('express');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var compression = require('compression');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var setCookie = require('set-cookie');
var cookieParser = require('cookie-parser');
var errorHandler = require('errorhandler');
var session = require('express-session')
var path = require('path');
var config = require('./environment');
var forge = require('node-forge');

module.exports = function(app) {
  var env = app.get('env');

  var salt = forge.random.getBytesSync(128);
  var key = forge.pkcs5.pbkdf2(config.secrets.session, salt, 4, 16);
  var iv = forge.random.getBytesSync(16);
  var encryptObj = {
    key: forge.util.encode64(key),
    salt: forge.util.encode64(salt),
    iv: forge.util.encode64(iv)
  }
  config.encryptionObj = encryptObj;
  //console.log("encrypt value:",config.encryptionObj);

  app.set('views', config.root + '/server/views');
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');
  app.set(session({
  	cookie : {
		httpOnly: true, secure: true, maxAge: null
  		}
	}));
  app.use(compression());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(cookieParser());

app.use(function(req, res, next){
    res.locals.session = req.session;
    next();
});
  
  app.use(function(req, res, next) {
  setCookie('io', 'connectSIDCookieValue', {
    res: res,
	path: '/socket.io/',
	httpOnly: true, 
	secure:true,
	expires:0 //at the end of the session
  });
  next();
  });

  app.use(function(req,res,next){
    if(req.headers.prsessionkey){
      var userName = req.headers.prsessionkey.split('::')[0];
      var timeStamp = req.headers.prsessionkey.split('::')[1];
      res.header("Access-Control-Allow-Credentials", true);
      if(config.prSessionStore[userName] && config.prSessionStore[userName][timeStamp])
      {
        var lastPing = config.prSessionStore[userName][timeStamp];
        var timeDiff = ((new Date()).getTime() - lastPing)/1000;
        if(timeDiff > 30)
        {
          return res.json(401, 'Session Expired/Not Authorized');
        }
        else
        {
          next();
        }
      }
      else
      {
        return res.json(401, 'Session Expired/Not Authorized');
      }
    }
    else  
    {
      if(req.url.indexOf("/api/") != -1 )
      {
        return res.json(401, 'Session Expired/Not authorized');
      }
      else
      {
        next();
      }
    }
    
  });  


  //app.use(function (req, res, next) {
    /*var nodeSSPI = require('node-sspi');
    var nodeSSPIObj = new nodeSSPI({
      offerSSPI: false,
      maxLoginAttemptsPerConnection: 1,
      //offerBasic: true,
      retrieveGroups: true
    });*/
    
    //if(req.url.indexOf("/api/") != -1 || req.url.indexOf("/auth/local") != -1){
    //if(req.url.indexOf("/auth/local") != -1){
      //req.header("Authorization", "Basic ");
      //console.log("authorization-header before: ", req.header("Authorization"));
      //res.header("WWW-Authenticate", "");
      //console.log("Before-req: ", req);
      //console.log("Before-response: ", res);
      //nodeSSPIObj.authenticate(req, res, function(err){
        //console.log("req: ", req);
        //console.log("response_headers: ", res._headers);
        //res._headers['www-authenticate'] = [ 'xBasic' ]; //res.header("WWW-Authenticate", "");
        //res.removeHeader('WWW-Authenticate'); 
        //res.header("WWW-Authenticate","xBasic");
        //console.log("responseAfter: ", res);
        //req.header("Authorization", "Basic AAAAAAAAAAAAAAAAAAA=");
        
        //console.log("WWW-Authenticate", res.header("WWW-Authenticate"));
        //console.log("authorization-header after: ", req.header("Authorization"));

        /*if(err)
          console.log("NodeSSPI errors: ", err);
        res.finished || next();
      });
    }
    else
      next();    
  });*/
  
  /*app.use(function (req, res, next) {
    if(res._headers['www-authenticate']){
      console.log("response_headers: ", res._headers);
      res._headers['www-authenticate'] = [ 'xBasic' ]; 
      console.log("responseAfter: ", res);  
    }
    
    res.finished || next();  
  });*/
  /*app.use(function (req, res, next) {
    var nodeSSPI = require('node-sspi');
    var nodeSSPIObj = new nodeSSPI({
      offerSSPI: true,
      //offerBasic: true,
      retrieveGroups: true
    });
    nodeSSPIObj.authenticate(req, res, function(err){
      res.finished || next();
    });
  });*/
  

  /*app.use(function (req, res, next) {
    var out = 'Hello ' + req.connection.user + '! You belong to following groups:<br/><ul>';
    if (req.connection.userGroups) {
      for (var i in req.connection.userGroups) {
        out += '<li>'+ req.connection.userGroups[i] + '</li><br/>\n';
      }
    }
    out += '</ul>';
    res.send(out)
  });*/


  /*app.use(function(req, res, next){
    //res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Expose-Headers", "WWW-Authenticate, Content-Type");
    res.header("Access-Control-Allow-Headers", "Authorization, Content-Type");
    //res.header("Access-Control-Allow-Headers", "X-Requested-With");
    if(res.header("WWW-Authenticate"))
      res.header("WWW-AuthenticateX", res.header("WWW-Authenticate"));
      res.removeHeader("WWW-Authenticate");
      //console.log("www-authenticate Header: ",res.header("WWW-Authenticate"));
      console.log("iis user: ",req.header('x-iisnode-auth_user'));
      console.log("iis auth: ",req.header('x-iisnode-auth_type'));
      console.log("iis allrwa: ",req.header('x-iisnode-all_raw'));
    return next();
  });*/

  if ('production' === env) {
    app.use(favicon(path.join(config.root, 'public', 'favicon.ico')));
    app.use(express.static(path.join(config.root, 'public')));
    app.set('appPath', config.root + '/public');
    app.use(morgan('dev'));
  }

  if ('development' === env || 'test' === env) {
    //app.use(require('connect-livereload')());
    app.use(express.static(path.join(config.root, '.tmp')));
    app.use(express.static(path.join(config.root, 'client')));
    app.set('appPath', 'client/');
    //console.log('Express config.root %d, appPath %s', config.root, app.get('appPath'));
    app.use(morgan('dev'));
    app.use(errorHandler()); // Error handler - has to be last
  }
};