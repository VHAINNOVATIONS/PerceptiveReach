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

    var dbc = require('../../config/db_connection/development.js');
    var config = dbc.config;

    var id = req.param("id");
    var score = req.param("score");
    var query = '';
    query = "SELECT FirstName, MiddleName, LastName, SSN, Phone, DateIdentifiedRisk, "; 
    query += "ReachID, vamc.VAMC FROM VeteranRisk vet INNER JOIN Ref_VAMC vamc ON vet.VAMC = vamc.VAMCID WHERE ";
    if (id) {
        console.log("Registering endpoint: /veteransByVAMC/:id is " + id);
        query += "vamc.vamcID = " + id;
        if (score) {
            console.log("Registering endpoint: /veteransByVAMC/:score is " + score);
            query += "AND vet.Score >= " + score;
        }
    } else {
        res.send("ERROR: VAMC ID is required.");
        console.log("ERROR: VAMC ID is required."); 
    }

    var connection = new sql.Connection(config, function(err) {
        // ... error checks
        if (err || !id) { 
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