/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var sql = require('mssql');
var dataFormatter = require('../../components/formatUtil/formatUtil.service.js');

exports.index = function(req, res) {
  res.header("content-type: application/json");

  var dbc = require('../../config/db_connection/development.js');
    var config = dbc.config;

    var query = 'SELECT m.Status as Status, d.RiskLevelDesc, m.Total as Total FROM(';
		query += " SELECT CASE WHEN os.StatusDesc IS NULL THEN 'Uninitiated'";
		query += ' ELSE os.StatusDesc END as Status, COUNT(p.ReachID) Total, p.RiskLevel';
		query += ' FROM dbo.Patient p LEFT JOIN dbo.Ref_OutreachStatus os';
		query += ' ON p.OutreachStatus = os.OutReachStatusID GROUP BY os.StatusDesc, p.RiskLevel) m';
		query += ' INNER JOIN dbo.Ref_RiskLevel d ON m.RiskLevel = d.RiskLevelID';
		query += ' GROUP BY Status, Total, d.RiskLevelDesc ORDER BY Status';

    var connection = new sql.Connection(config, function(err) {
        // ... error checks
        if (err || !query) { 
        //data = "Error: Database connection failed!";
        return; 
        }

        // Query
        var request = new sql.Request(connection);
        request.query(query, function(err, recordset) {
            // ... error checks
            if (err) { 
                console.log("Query failed! " + err); 
            return; 
            }
			
            var jsonRecordSet = JSON.parse(JSON.stringify(recordset));
            res.send(jsonRecordSet);
        });

    });
  
};