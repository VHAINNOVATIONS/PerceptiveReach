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
            whereClause = " WHERE VISN = @trueID";
        }
       

        // Configure Database Query
        var query = '';
        if (trueID && validator.isInt(trueID)) {
            request.input('trueID', sql.Int, trueID);            
        }

        query =  "SELECT [TotalPatients] AS Total"
        query += " ,[AtRisk]"
        query += " ,[VISN]"
        query += " ,[STA3N]"
        query += " ,[VAMC_Name]"
        query += " ,[StateAbbr]"
        query += " FROM [dbo].[vw_FacilityRoster]"
        query += whereClause;
        query += " ORDER BY STA3N ASC";

    
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
