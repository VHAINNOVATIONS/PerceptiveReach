'use strict';

var _ = require('lodash');
var validator = require('validator');
var sql = require('mssql');
var dataFormatter = require('../../components/formatUtil/formatUtil.service.js');
var praudit = require('../../audit');

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
        var whereClause = '';
        var where = ' WHERE';
        var and = ' AND';

        var query = 'SELECT SUM(total) AS Total,AgeRange,RiskLevelDescription FROM [dbo].[vw_AgeSummary_VISN] '
                    +'group by ageRange,RiskLevelDescription';

        if (VISN && validator.isInt(VISN)) {
            request.input('VISN', sql.Int, VISN);
            query  = 'SELECT SUM(total) AS Total,AgeRange,RiskLevelDescription FROM [dbo].[vw_AgeSummary_VISN] '
                    +'where visn = @VISN '
                    +'group by ageRange,RiskLevelDescription';
        }

        if (STA3N && validator.isInt(STA3N)) {
            request.input('STA3N', sql.Int, STA3N);
            query  = 'SELECT SUM(total) AS Total,AgeRange,RiskLevelDescription FROM [dbo].[vw_AgeSummary_VAMC] '
                    +'where sta3n = @STA3N '
                    +'group by ageRange,RiskLevelDescription';
        }         
        
        // Query the database
        request.query(query, function(err, recordset) {
            if (err) { 
                connection.close();
                console.dir(err);
                praudit.auditlog('SQL ERROR',err);
                res.send(401, 'Query Failed.');
                return; 
            }
            connection.close();
            var jsonRecordSet = JSON.parse(JSON.stringify(recordset));
            res.send(jsonRecordSet);
        });

    });
  
};