'use strict';

var _ = require('lodash');
var validator = require('validator');
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
		
		/*Request parameters from database */
		var reachID = req.param("reachID");
		
		/*Configure database query */
		var query = '';
		if (reachID && validator.isInt(reachID)) {
			request.input('reachID', sql.Int, reachID);
			query = "SELECT * FROM Appointments a LEFT OUTER JOIN Ref_VistACancelNoShowCode r ON a.CancelNoShowCode = r.CancelNoShowCodeID "
			query += "WHERE a.ReachID = @reachID";
		} else {
			res.send("ERROR: ReachID  is required.");
		}

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
			/*Parse result into JSON object and format the date */
			var jsonRecordSet = JSON.parse(JSON.stringify(recordset));
			for (var record in jsonRecordSet) {
				jsonRecordSet[record].ApptDate = dataFormatter.formatData(jsonRecordSet[record].ApptDate,"date");
			}
			
			/*Send the data */
			res.send(jsonRecordSet);
		});
    });
};