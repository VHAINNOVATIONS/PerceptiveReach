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
  var containsSql = false;

  function hasSql(value) {
    if (value === null || value === undefined) {
        return false;
    }
    // sql regex reference: http://www.symantec.com/connect/articles/detection-sql-injection-and-cross-site-scripting-attacks
    var sql_meta = new RegExp('(%27)|(\')|(--)|(%23)|(#)', 'i');
    if(sql_meta.test(value)){
        return true;
    }
    var sql_meta2 = new RegExp('((%3D)|(=))[^\n]*((%27)|(\')|(--)|(%3B)|(;))', 'i');
    if(sql_meta2.test(value)){
        return true;
    }
    var sql_typical = new RegExp('w*((%27)|(\'))((%6F)|o|(%4F))((%72)|r|(%52))', 'i');
    if(sql_typical.test(value)){
        return true;
    }
    var sql_union = new RegExp('((%27)|(\'))union', 'i');
    if(sql_union.test(value)){
        return true;
    }

    var sql_keywords = new RegExp('(ALTER|CREATE|DELETE|DROP|EXEC(UTE){0,1}|INSERT( +INTO){0,1}|MERGE|SELECT|UPDATE|UNION( +ALL){0,1})','i');
     if(sql_keywords.test(value)){
        return true;
    }
    return false;
  }

  app.use(function(req, res, next){

    if (req.originalUrl !== null && req.originalUrl !== undefined) {
        if (hasSql(req.originalUrl) === true) {
            containsSql = true;
        }
    }
    
    if(containsSql === false){
        next();
    } else {
        containsSql = false;
        res.send(403);
    }
  });

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