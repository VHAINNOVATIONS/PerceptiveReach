'use strict';

var _ = require('lodash');
var sql = require('mssql');
var dataFormatter = require('../../components/formatUtil/formatUtil.service.js');

exports.index = function(req, res) {
  //res.header("content-type: application/json");

  var dbc = require('../../config/db_connection/development.js');
    var config = dbc.config;

    var query = 'SELECT DISTINCT me.BranchDesc, COUNT(p.MilitaryBranch) as Total FROM dbo.Patient p';
		query += ' INNER JOIN dbo.Ref_MilitaryBranch me ON p.MilitaryBranch = me.BranchID';
		query += ' GROUP BY me.BranchDesc, p.MilitaryBranch';
  
    var connection = new sql.Connection(config, function(err) {
        if (err) { 
            console.dir(err);
            res.send(401, 'DB Connection Error.');
            return; 
        }

        // Query
        var request = new sql.Request(connection);
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