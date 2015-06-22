/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var config = require('./config/environment');
// Setup server
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

io.on('connection', function (socket) {
	socket.on('sessionKeyUpsert', function (data) {
	  var userName = data.sessionkey.split('::')[0];
	  var timeStamp = data.sessionkey.split('::')[1];
	  if(config.prSessionStore[userName] && config.prSessionStore[userName][timeStamp])
	  {
	  	 config.prSessionStore[userName][timeStamp] = (new Date()).getTime();
	  }
	});
});


setInterval(function() {
	for (var key in config.prSessionStore) {
	   if (config.prSessionStore.hasOwnProperty(key)) {

	   	  for(var userkey in config.prSessionStore[key])
	   	  {
	   	  	if(config.prSessionStore[key].hasOwnProperty(userkey))
	   	  	{
	   	  		var obj = config.prSessionStore[key][userkey];
				var timeDiff = ((new Date()).getTime() - obj)/1000;
				if(timeDiff > 30)
				{
				 delete config.prSessionStore[key][userkey];
				 console.log('deleted object '+ key+"::"+userkey);
				}
	   	  	}
	   	  }
	   }
	}
 }, 15000);

/* var socketio = require('socket.io')(server, {
  serveClient: (config.env === 'production') ? false : true,
  path: '/socket.io-client'
}); */
//var models = require("./models");
//require('./config/socketio')(socketio);
require('./config/express')(app);
require('./routes')(app);

// Start server
//models.sequelize.sync().then(function () {
	server.listen(config.port, config.ip, function () {
		console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
	});	
//});

// Expose app
exports = module.exports = app;

