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
        query += "SELECT r.RiskLevelDesc as RiskLevel, Gender, COUNT(Gender) as Total"
        query += " FROM dbo.Patient p INNER JOIN dbo.Ref_RiskLevel r "
        query += " ON p.RiskLevel = r.RiskLevelID "
        query += " INNER JOIN PatientStation s ON s.ReachID = p.ReachID";
        query += " INNER JOIN Ref_VAMC v ON s.sta3N = v.STA3N ";
        query += " WHERE Gender IS NOT NULL";
        query += andClause;
        query += " GROUP BY r.RiskLevelDesc, p.Gender";
        
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