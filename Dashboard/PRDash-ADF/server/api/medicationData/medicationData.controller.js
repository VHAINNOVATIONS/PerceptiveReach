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

    var id = req.param("id");
    var query = '';
    if (id) {
        query = "SELECT * FROM PatientMedications "
        query += "WHERE ReachID =  " + id;
    } else {
        res.send("ERROR: ReachID  is required.");
    }

    var connection = new sql.Connection(config, function(err) {
        // ... error checks
        if (err || !query) { 
        //data = "Error: Database connection failed!";
        return; 
        }

        // Query
        console.log("Medication Query: "+query);
        var request = new sql.Request(connection);
        request.query(query, function(err, recordset) {
            // ... error checks
            if (err) { 
                console.log("Query failed! " + err); 
            return; 
            }

            console.log(recordset);
            var jsonRecordSet = JSON.parse(JSON.stringify(recordset));
            for (var record in jsonRecordSet) {
                //If formatting is needed in the future...put it here
                //jsonRecordSet[record].ApptDate = dataFormatter.formatData(jsonRecordSet[record].ApptDate,"date");
            }
            res.send(jsonRecordSet);
        });

    });
  
};