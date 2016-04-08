'use strict';

var _ = require('lodash');
var validator = require('validator');
var sql = require('mssql');
var dataFormatter = require('../../components/formatUtil/formatUtil.service.js');

exports.index = function(req, res) {
  //res.header("content-type: application/json");

    var dbc = require('../../config/db_connection/development.js');
    var config = dbc.config;
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

        query += "SELECT v.VAMC_Name as VAMCName, v.StateAbbr as StateID, v.VISN as VISN, COUNT(v.VAMC_Name) as Total"; 
        query += " FROM dbo.Patient p JOIN dbo.PatientStation ps ON p.ReachID = ps.ReachID JOIN dbo.Ref_VAMC v ON ps.STA3N = v.STA3N";
        query += whereClause;
        query += " AND p.RiskLevel IS NOT NULL GROUP BY v.VAMC_Name, v.StateAbbr, v.VISN ORDER BY Total desc";
        
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
};