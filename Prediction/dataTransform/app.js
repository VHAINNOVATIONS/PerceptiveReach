/*global require*/

'use strict';

require('dotenv').load();

var sql = require('mssql');
var config = require('./config');

var connection = new sql.Connection(config, function(err) {
	if (err) {
		console.log(err);
	} else {
    	var request = new sql.Request(connection);
    	request.query('SELECT * FROM information_schema.tables', function(err, result) {
        	console.dir(result);
    	});


		console.log('Success');
	}
});

sql.on('error', function(err) {
	console.log('MSSQL Error.');
	console.log(err);
});