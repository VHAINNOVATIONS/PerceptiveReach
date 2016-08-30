'use strict';

var _ = require('lodash');
var sql = require('mssql');
var praudit = require('../../audit');

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
				connection.close();
				praudit.auditlog('SQL ERROR',err);
				console.dir(err);
				res.send(401, "Query Failed");
				return; 
			}

			connection.close();
			/*Send the data*/
			res.send(recordset);
		});
    });
};