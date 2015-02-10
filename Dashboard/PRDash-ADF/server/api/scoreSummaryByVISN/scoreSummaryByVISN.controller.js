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

/*var config = {
    user: 'sa',
    password: 'agile_123',
    server: '54.225.232.25', // You can use 'localhost\\instance' to connect to named instance
    database: 'Reach',

    options: {
        encrypt: false // Use this if you're on Windows Azure
    }
}*/

// Get list of things
exports.index = function(req, res) {
    res.header("content-type: application/json");
    var data = [];
    //var config = require('../../config/db_connection/development.config');
    var dbc = require('../../config/db_connection/development.js');
    var config = dbc.config;
    var id = req.param("id");
    var query = '';
    if (id) {
        console.log("Registering endpoint: /scoreSummaryByVISN/:id is " + id);
        query = "SELECT sum(CASE when Score >= 95 then 1 else 0 END) as ExtremeRisk, ";
        query += "sum(CASE when Score < 95 and Score >= 80 then 1 else 0 END) as HighRisk, ";
        query += "sum(CASE when Score < 80 and Score >= 50 then 1 else 0 END) as MediumRisk, ";
        query += "sum(CASE when Score < 50 then 1 else 0 END) as LowRisk "
        query += "FROM VeteranRisk vet INNER JOIN Ref_VAMC vamc ON vet.VAMC = vamc.VAMCID ";
        query += "WHERE vamc.VISN =  " + id;
        console.log("Query: " + query);
    } else {
        console.log("ERROR: VISN ID is required."); 
        res.end("ERROR: VISN ID is required.");

    }

    var connection = new sql.Connection(config, function(err) {
        // ... error checks
        if (err || !query) { 
        data = "Error: Database connection failed!";
        console.log("Database connection failed!"); 
        return; 
        }

        // Query
        var request = new sql.Request(connection); // or: var request = connection.request();
        request.query(query, function(err, recordset) {
            // ... error checks
            if (err) { 
            console.log("Query failed!"); 
            return; 
            }

            console.log(recordset.length);

            res.send(recordset);
        });

    });
    
};