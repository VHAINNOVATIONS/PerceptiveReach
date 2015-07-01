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

    var query = 'SELECT rl.RiskLevelDesc as RiskLevel, COUNT(rl.RiskLevelDesc) as Total FROM dbo.Patient p'; 
		query += ' INNER JOIN dbo.Ref_RiskLevel rl ON p.RiskLevel = rl.RiskLevelID';
		query += ' GROUP BY rl.RiskLevelDesc';

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

			for (var i = 0; i < recordset.length; i++) {
                data.push({Label: recordset[i].RiskLevel, Value: recordset[i].Total});
				res.send(data);
			};
    });
	});
};

