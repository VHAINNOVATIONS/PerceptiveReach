'use strict';

var _ = require('lodash');
var sql = require('mssql');

exports.index = function(req, res) {
	/*Configure response header */
    //res.header("content-type: application/json");

	/*Configure and open database */
    var dbc = require('../../config/db_connection/development.js');
    var config = dbc.config;    var data = [];
	var connection = new sql.Connection(config, function(err) {
		if (err) { 
			data = "Error: Database connection failed!";
			return; 
		}
		var request = new sql.Request(connection);

		/*Configure database query */
		var query = '';
		query = "SELECT STA3N, VAMC_Name FROM Ref_VAMC"; 

		/*Query the database */
		request.query(query, function(err, recordset) {
			if (err) { 
				console.dir(err);
				res.send(401, "Query Failed");
				return; 
			}

			/*Send the data*/
			res.send(recordset);
		});
    });
};