'use strict';

var _ = require('lodash');
var sql = require('mssql');
var dataFormatter = require('../../components/formatUtil/formatUtil.service.js');
var praudit = require('../../audit');

exports.index = function(req, res) {
	/*Configure response header */
	//res.header("content-type: application/json");
	
	/*Configure and open database */
	var dbc = require('../../config/db_connection/development.js');
	var config = dbc.config;
    var connection = new sql.Connection(config, function(err) {
		if (err) { 
			return; 
		}
		var request = new sql.Request(connection);
			
		/*Configure database query */
		var query = "SELECT Age, ISNULL(Sex, '--') As Gender, ISNULL(NumericValue, '--') As Value, ISNULL(RaceEthnicity, '--') As Ethnicity FROM dbo.HealthDataSuicideIndicators WHERE Age IS NOT NULL and Locale = 'National' ORDER BY Age, Sex, RaceEthnicity;";

		/*Query database */
		request.query(query, function(err, recordset) {
			if (err) { 
				connection.close();
				console.dir(err);
				praudit.auditlog('SQL ERROR',err);
				res.send(401, "Query Failed");
				return; 
			}

			connection.close();
			/*Parse result into JSON object */
			var jsonRecordSet = JSON.parse(JSON.stringify(recordset));

			/*Send the data */
			res.send(jsonRecordSet);
		});
    });
};