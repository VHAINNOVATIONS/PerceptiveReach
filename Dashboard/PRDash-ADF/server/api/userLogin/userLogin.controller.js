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

    var un = req.param("UserName");
    var pw = req.param("Password");

    var query = '';
    if (un || pw) {
        //console.log("Registering endpoint: /userLogin/:un is " + un);
        query = "SELECT u.FirstName, u.LastName, r.RoleCode, v.VAMCID, v.VAMC, v.VISN ";
        query += "FROM prsystem.Users u INNER JOIN prsystem.UserRole r ON u.UserRole = r.RoleID ";
        query += "INNER JOIN dbo.Ref_VAMC v ON u.UserLocation = v.VAMCID ";
        query += "WHERE UserName =  '" + un + "'";
        query += "AND UserPassword =  '" + pw + "'";
        //console.log("Query: " + query);
    } else {
        //console.log("ERROR: User Name and Password are required."); 
        res.send("ERROR: User Name and Password are required.");

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
            if (recordset.length < 1){res.send("Invalid User Name and/or Password"); return;}
            if (err) { 
            //console.log("Query failed!"); 
            return; 
            }

            //console.log(recordset.length);
            res.send(recordset);
        });

    });
    
};