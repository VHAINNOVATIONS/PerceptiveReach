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
        //console.log("Registering endpoint: /facilityByState/:id is " + id);
        query = "SELECT VAMCID, vamc.VAMC, STA3N, visn.NetworkName, visn.RegionServed, COUNT(vet.ReachID) as Veteran_Count_at_facility ";
        query += "FROM Ref_VAMC vamc INNER JOIN Ref_VISN visn ON vamc.VISN = visn.VISN INNER JOIN VeteranRisk vet ON vamc.VAMCID = vet.VAMC ";
        query += "WHERE vamc.StateAbbr =  '" + id +"'";
        query += "GROUP by VAMCID, vamc.VAMC, STA3N, visn.NetworkName, visn.RegionServed";
        //console.log("Query: " + query);
    } else {
        //console.log("ERROR: State Abbreviation is required."); 
        res.send("ERROR: State Abbreviation is required.");

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
            //console.log("Query failed!"); 
            return; 
            }

            //console.log(recordset.length);

            res.send(recordset);
        });

    });
    
};