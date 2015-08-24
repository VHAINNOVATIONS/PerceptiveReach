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
        var ID = req.param("ID");

        // Configure WHERE clause if needed
        var whereClause = '';
        var trueID = '';
        if(ID != null && ID.indexOf("-v") != -1){
            trueID = ID.split("-v")[0];
            whereClause = " WHERE v.VISN = @trueID";
        }
        else if(ID != null && ID.indexOf("-f") != -1){
            trueID = ID.split("-f")[0];
            whereClause = " WHERE s.sta3N = @trueID";
        }

        // Configure Database Query
        var query = '';
        if (trueID && validator.isInt(trueID)) {
            request.input('trueID', sql.Int, trueID);            
        }
        query =  "SELECT vsn.VISN, vsn.NetworkName, vsn.RegionServed,  Count (vsn.VISN) as Total";
		query += " FROM Patient p";
		query += " INNER JOIN PatientStation s ON s.ReachID = p.ReachID";
		query += " INNER JOIN Ref_VAMC v ON s.sta3N = v.STA3N";
		query += " INNER JOIN Ref_VISN vsn ON vsn.VISN = v.VISN";
		query += whereClause;
		query += " GROUP BY vsn.VISN, vsn.NetworkName, vsn.RegionServed";
		query += " Order By vsn.VISN ASC";
    
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
