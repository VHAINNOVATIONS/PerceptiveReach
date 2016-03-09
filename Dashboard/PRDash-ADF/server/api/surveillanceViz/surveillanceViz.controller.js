'use strict';

var _ = require('lodash');
var sql = require('mssql');

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
		var query = "select * from vw_SurveillanceViz order by VISN";

		/*Query database */
		request.query(query, function(err, recordset) {
			if (err) { 
				console.dir(err);
				res.send(401, "Query Failed");
				return; 
			}

			/*Parse result into JSON object */
			var jsonRecordSet = JSON.parse(JSON.stringify(recordset));

			/*Send the data */
			res.send(jsonRecordSet);
		});
    });
};