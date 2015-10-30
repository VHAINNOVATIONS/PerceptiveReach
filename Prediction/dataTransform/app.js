/*global require, console*/

'use strict';

require('dotenv').load();

var sql = require('mssql');
var config = require('./config');
var csv = require('csv');
var fs = require('fs');
var async = require('async');
var util = require('util');

var vamcMap = {
	1: [656, 23],
	2: [636, 23],
	3: [618, 23],
	4: [756, 18],
	5: [678, 18],
	6: [649, 18],
	8: [501, 18],
	9: [671, 17],
	10: [674, 17],
	11: [549, 17]
};

var filename = '/Work/git/PerceptiveReach/Prediction/R/output2.csv';
var data = fs.readFileSync(filename).toString();
csv.parse(data, function(err, input) {
	var tbInserted = input.reduce(function(r, line) {
		//var facility = line[7];
		//if (vamcMap[facility]) {
			//var replacements = vamcMap[facility];
			//line[7] = replacements[0];
			//line[8] = replacements[1];
			[5, 6].forEach(function(index) {
				if (line[index] === 'NA') {
					line[index] = -1;
				}
			});
			r.push(line);
		//}
		return r;
	}, []);

	var connection = new sql.Connection(config, function(err) {
		if (err) {
			console.log(err);
		} else {
	    	var request = new sql.Request(connection);

	    	var insertOne = function(line, cb) {
				//var sqlq = "INSERT INTO FacilityResults (Month_no, LogMonth, Pred, Lower, Upper, IPWResponse, SA_New, VAMC, VISN) VALUES ?"
				console.log(line);
				var sqlq = util.format("INSERT INTO staging.FacilityResults (Month_no, LogMonth, Pred, Lower, Upper, IPWResponse, SA_New, VAMC, VISN) VALUES (%s)", line.join(','));
	    		request.query(sqlq, cb);
	    	};

	    	async.eachSeries(tbInserted, insertOne, function(err) {
	    		if (err) {
	    			console.log('FAILIURE');
	    			console.log(err);
	    		} else {
	    			console.log('SUCCESS');
	    		}
	    	});


	    	/*
			var sqlq = "INSERT INTO FacilityResults (Month_no, LogMonth, Pred, Lower, Upper, IPWResponse, SA_New, VAMC, VISN) VALUES ?";


	    	//request.query('SELECT * FROM information_schema.tables', function(err, result) {
	    	//request.query('SELECT COLUMN_NAME,DATA_TYPE FROM information_schema.columns where TABLE_NAME=\'FacilityResults\'', function(err, result) {
	    	request.query(sqlq, [tbInserted], function(err, result) {
	        	if (err) {
					console.log('MSSQL Error.');
					console.log(err);
	        	} else {
	        		console.log('Success');
					console.dir(result);
	    		}
	    		connection.close();
	    	});
			*/
		}
	});

	sql.on('error', function(err) {
		console.log('MSSQL Error.');
		console.log(err);
	});
});