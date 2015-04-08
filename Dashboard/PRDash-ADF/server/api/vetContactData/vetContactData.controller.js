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
// Get list of things
exports.index = function(req, res) {
  res.header("content-type: application/json");

  var dbc = require('../../config/db_connection/development.js');
    var config = dbc.config;

    var id = req.param("id");
    var query = '';
    if (id) {
        console.log("Registering endpoint: /vetContactData/:id is " + id);
        query = "SELECT * FROM VeteranRisk ";
        query += "WHERE ReachID =  " + id;
        console.log("Query: " + query);
    } else {
        console.log("ERROR: ReachID Abbreviation is required."); 
        res.send("ERROR: ReachID Abbreviation is required.");
    }

    var connection = new sql.Connection(config, function(err) {
        // ... error checks
        if (err || !query) { 
        data = "Error: Database connection failed!";
        console.log("Database connection failed! " + err); 
        return; 
        }

        // Query
        var request = new sql.Request(connection); // or: var request = connection.request();
        request.query(query, function(err, recordset) {
            // ... error checks
            if (err) { 
            console.log("Query failed! " + err); 
            return; 
            }

            console.log(recordset.length);
            var jsonRecordSet = JSON.parse(JSON.stringify(recordset));
            //console.log(jsonRecordSet);
            for (var record in jsonRecordSet) {
			    jsonRecordSet[record].Phone = dataFormatter.formatData(jsonRecordSet[record].Phone,"phone");
			    jsonRecordSet[record].AltPhone = dataFormatter.formatData(jsonRecordSet[record].AltPhone,"phone");
			    jsonRecordSet[record].SSN = dataFormatter.formatData(jsonRecordSet[record].SSN,"ssn");
			}
            res.send(jsonRecordSet);
            //res.send(recordset);
        });

    });
  
};