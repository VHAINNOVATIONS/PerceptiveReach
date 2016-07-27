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
var rawbody = require('raw-body');
var _ = require('lodash');

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
  app.disable('x-powered-by');

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
    var sql_keywords = new RegExp('\\b(ALTER|CREATE|WHILE|AND|OR|NOT IN|LEFT|RIGHT|DELETE|DECLARE|DROP|EXEC(UTE){0,1}|INSERT( +INTO){0,1}|MERGE|SELECT|UPDATE|UNION( +ALL){0,1})\\b','i');
    if(sql_keywords.test(value)){
        return true;
    }

    var sql_keywords2 = new RegExp('\\b(ADD|EXTERNAL PROCEDURE|ALL|FETCH|PUBLIC|ALTER|FILE|RAISERROR|AND|FILLFACTOR|READ|ANY|FOR|READTEXT|AS|FOREIGN|RECONFIGURE|ASC|FREETEXT|REFERENCES|AUTHORIZATION|FREETEXTTABLE|REPLICATION|BACKUP|FROM|RESTORE|BEGIN|FULL|RESTRICT|BETWEEN|FUNCTION|RETURN|BREAK|GOTO|REVERT|BROWSE|GRANT|REVOKE|BULK|GROUP|RIGHT|BY|HAVING|ROLLBACK|CASCADE|HOLDLOCK|ROWCOUNT|CASE|IDENTITY|ROWGUIDCOL|CHECK|IDENTITY_INSERT|RULE|CHECKPOINT|IDENTITYCOL|SAVE|CLOSE|IF|SCHEMA|CLUSTERED|IN|SECURITYAUDIT|COALESCE|INDEX|SELECT|COLLATE|INNER|SEMANTICKEYPHRASETABLE|COLUMN|INSERT|SEMANTICSIMILARITYDETAILSTABLE|COMMIT|INTERSECT|SEMANTICSIMILARITYTABLE|COMPUTE|INTO|SESSION_USER|CONSTRAINT|IS|SET|CONTAINS|JOIN|SETUSER|CONTAINSTABLE|KEY|SHUTDOWN|CONTINUE|KILL|SOME|CONVERT|LEFT|STATISTICS|CREATE|LIKE|SYSTEM_USER|CROSS|LINENO|TABLE|CURRENT|LOAD|TABLESAMPLE|CURRENT_DATE|MERGE|TEXTSIZE|CURRENT_TIME|NATIONAL|THEN|CURRENT_TIMESTAMP|NOCHECK|TO|CURRENT_USER|NONCLUSTERED|TOP|CURSOR|NOT|TRAN|DATABASE|NULL|TRANSACTION|DBCC|NULLIF|TRIGGER|DEALLOCATE|OF|TRUNCATE|DECLARE|OFF|TRY_CONVERT|DEFAULT|OFFSETS|TSEQUAL|DELETE|ON|UNION|DENY|OPEN|UNIQUE|DESC|OPENDATASOURCE|UNPIVOT|DISK|OPENQUERY|UPDATE|DISTINCT|OPENROWSET|UPDATETEXT|DISTRIBUTED|OPENXML|USE|DOUBLE|OPTION|USER|DROP|OR|VALUES|DUMP|ORDER|VARYING|ELSE|OUTER|VIEW|END|OVER|WAITFOR|ERRLVL|PERCENT|WHEN|ESCAPE|PIVOT|WHERE|EXCEPT|PLAN|WHILE|EXEC|PRECISION|WITH|EXECUTE|PRIMARY|WITHIN GROUP|EXISTS|PRINT|WRITETEXT|EXIT|PROC)\\b','i');
    if(sql_keywords2.test(value)){
        return true;
    }
    return false;
  }

  app.use(['/auth','/api','/encryption'], function(req, res, next){

    var containsSql = false;

    if (req.originalUrl !== null && req.originalUrl !== undefined) {
        if (hasSql(decodeURI(req.originalUrl)) === true) {
            containsSql = true;
        }
    }

    if(containsSql === false)
    {
      _.forEach(req.body, function(n,key){
       if(containsSql) return;
        if(hasSql(n))
        {
          containsSql = true;
        }
      });
    }

    if(containsSql === false){
      next();
    } else {
        res.send(403);
    }

  });

  /*app.use(function(req, res, next){
      res.locals.session = req.session;
      next();
  });*/
  
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
      var timeStampKey = req.headers.prsessionkey.split('::')[1];
      res.header("Access-Control-Allow-Credentials", true);
      if(config.prSessionStore[userName] && config.prSessionStore[userName][timeStampKey])
      {
        var lastPing = config.prSessionStore[userName][timeStampKey];
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
      if(req.url.indexOf("/api/") != -1 && !config.bypassAuth)
      {
        return res.json(401, 'Session Expired/Not authorized');
      }
      else
      {
        next();
      }
    }
    
  });  

  // Configure bypassAuth according to environment
  if(env === 'development')
    config.bypassAuth = true;
  else if(env === 'test')
    config.bypassAuth = true;
  else if(env === 'stable')
    config.bypassAuth = false;
  else if(env === 'production')
    config.bypassAuth = false;
  /*if ('production' === env) {
    app.use(favicon(path.join(config.root, 'public', 'favicon.ico')));
    app.use(express.static(path.join(config.root, 'public')));
    app.set('appPath', config.root + '/public');
    app.use(morgan('dev'));
  }*/

  //if ('development' === env || 'test' === env) {
    //app.use(require('connect-livereload')());
    app.use(express.static(path.join(config.root, '.tmp')));
    app.use(express.static(path.join(config.root, 'client')));
    app.set('appPath', process.env.APP_PATH);
    //console.log('Express config.root %d, appPath %s', config.root, app.get('appPath'));
    app.use(morgan('dev'));
    app.use(errorHandler()); // Error handler - has to be last
  //}
};