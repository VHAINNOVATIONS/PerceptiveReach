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

// Get list of things
exports.index = function(req, res) {
    res.header("content-type: application/json");
    var data = [];

    var dbc = require('../../config/db_connection/production.js');
    var config = dbc.config;
    var id = req.param("id");
    var query = '';

    if (id) {
            //console.log("Registering endpoint: /RiskFactors/:id is " + id);
            query = "SELECT * FROM RiskFactors ";
            query += "WHERE RiskFactorCode = '" + id + "'";
            //console.log("Query: " + query);
        } else {
            //console.log("Registering endpoint: /RiskFactors/");
            query = "SELECT * FROM RiskFactors";
            //console.log("Query: " + query);
        }

    var connection = new sql.Connection(config, function(err) {
        // ... error checks
        if (err || !query) { 
        data = "Error: Database connection failed!";
        //console.log("Database connection failed!"); 
        return; 
        }

        // Query
        var request = new sql.Request(connection); // or: var request = connection.request();
        request.query(query, function(err, recordset) {
            // ... error checks
            if (err) { 
            //console.log("Query failed! " + err); 
            return; 
            }

            //console.log(recordset.length);

            res.send(recordset);
        });

    });
    
};