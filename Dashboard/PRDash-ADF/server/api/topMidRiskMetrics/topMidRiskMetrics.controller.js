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

		        if (VISN && validator.isInt(VISN)) {
		            request.input('VISN', sql.Int, VISN);
		            whereClause += where + ' v.VISN = @VISN ';
		        }

		        if (STA3N && validator.isInt(STA3N)) {
		            request.input('STA3N', sql.Int, STA3N);
		            if (VISN) {
		                whereClause += and;
		            } else {
		                whereClause += where;
		            }
		            whereClause += ' s.sta3N = @STA3N ';
        }

        // Configure Database Query
        var query = '';

        query += 'SELECT rl.RiskLevelDesc as RiskLevel, COUNT(DISTINCT p.ReachID) as Total FROM dbo.Patient p';
        query += ' INNER JOIN dbo.Ref_RiskLevel rl ON p.RiskLevel = rl.RiskLevelID';
        query += " INNER JOIN PatientStation s ON s.ReachID = p.ReachID";
        query += " INNER JOIN Ref_VAMC v ON s.sta3N = v.STA3N";
        query += whereClause;
        query += ' GROUP BY rl.RiskLevelDesc';

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

