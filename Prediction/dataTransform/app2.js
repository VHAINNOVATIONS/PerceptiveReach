/*global require, console*/

'use strict';

require('dotenv').load();

var sql = require('mssql');
var config = require('./config');
var csv = require('csv');
var fs = require('fs');
var async = require('async');
var util = require('util');

var connection = new sql.Connection(config, function(err) {
	if (err) {
		console.log(err);
	} else {
    	var request = new sql.Request(connection);

    	request.query("SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'FacilityResults'", function(err, result) {
        	if (err) {
				console.log('MSSQL Error.');
				console.log(err);
        	} else {
        		console.log('Success');
				console.dir(result);
    		}
    		connection.close();
    	});
	}
});

sql.on('error', function(err) {
	console.log('MSSQL Error.');
	console.log(err);
});
