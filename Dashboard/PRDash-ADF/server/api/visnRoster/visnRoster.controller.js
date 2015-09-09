'use strict';

var _ = require('lodash');
var validator = require('validator');
var sql = require('mssql');

exports.index = function(req, res) {
	/*Configure response header */
	//res.header("content-type: application/json");
	
	/*Configure and open database */
	var dbc = require('../../config/db_connection/development.js');
	var config = dbc.config;  var data = [];
	var connection = new sql.Connection(config, function(err) {        
        if (err) { 
            console.dir(err);
            res.send(401, 'DB Connection Error.');
            return; 
        }
        var request = new sql.Request(connection);

        var query = '';
        query =  "SELECT "
        query += "[VISN]"
        query += ",[NetworkName]"
        query += ",[RegionServed]"
        query += ",[TotalPatients] AS Total"
        query += ",[AtRisk]"
        query += " FROM [Reach_Dev].[dbo].[vw_VISNRoster]"
        query += " ORDER BY VISN"
    
        // Query the database
        request.query(query, function(err, recordset) {
            if (err) { 
                console.dir(err);
                res.send(401, 'Query Failed.');
                return; 
            }

            var jsonRecordSet = JSON.parse(JSON.stringify(recordset));
            res.send(jsonRecordSet);
        });
    });    
}
