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
	
        var query = 'SELECT * FROM vw_OutReachSummary_Total';


		if (VISN && validator.isInt(VISN)) {
			request.input('VISN', sql.Int, VISN);
			query = 'SELECT * FROM vw_OutReachSummary_VISN WHERE VISN = @VISN';
		}

		if (STA3N && validator.isInt(STA3N)) {
			request.input('STA3N', sql.Int, STA3N);
			query = 'SELECT * FROM vw_OutReachSummary_VAMC WHERE sta3n = @STA3N';
        }

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