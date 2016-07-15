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
        var VISN = req.param("VISN");
        var STA3N = req.param("STA3N");
        var andClause = '';
        var and = ' AND';

        if (VISN && validator.isInt(VISN)) {
            request.input('VISN', sql.Int, VISN);
            andClause += and + ' v.VISN = @VISN';
        }

        if (STA3N && validator.isInt(STA3N)) {
            request.input('STA3N', sql.Int, STA3N);
            andClause += and + ' s.sta3N = @STA3N';
        } 

        // Configure Database Query
        var query = '';
        query += "SELECT v.VAMC_Name as VAMCName, v.StateAbbr as StateID, v.VISN as VISN, COUNT(v.VAMC_Name) as Total"; 
        query += " FROM dbo.Patient p JOIN dbo.PatientStation ps ON p.ReachID = ps.ReachID JOIN dbo.Ref_VAMC v ON ps.STA3N = v.STA3N";
        query += " WHERE p.RiskLevel IS NOT NULL"
        query += andClause;
        query += " GROUP BY v.VAMC_Name, v.StateAbbr, v.VISN ORDER BY Total desc";
        
        // Query the database
        request.query(query, function(err, recordset) {
            if (err) { 
                connection.close();
                console.dir(err);
                res.send(401, 'Query Failed.');
                return; 
            }

            connection.close();
            var jsonRecordSet = JSON.parse(JSON.stringify(recordset));
            res.send(jsonRecordSet);
        });

    });
};