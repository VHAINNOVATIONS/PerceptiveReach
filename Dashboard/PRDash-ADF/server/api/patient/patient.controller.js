'use strict';

var _ = require('lodash');
var sql = require('mssql');
var dataFormatter = require('../../components/formatUtil/formatUtil.service.js');

exports.index = function(req, res) {
  res.header("content-type: application/json");
  var data = [];

  var dbc = require('../../config/db_connection/development.js');
  var config = dbc.config;
  
  var connection = new sql.Connection(config, function(err) {
    if (err) { 
      console.dir(err);
      return; 
    }

    var request = new sql.Request(connection); // or: var request = connection.request();
    request.multiple = true;

    var sta3N = req.param("sta3N");
    var query = '';

    var select = "SELECT * FROM [dbo].[vw_PatientRoster] WHERE RiskLevelID in (1,2)"; 
    if (sta3N) {
        request.input('sta3N', sql.Int, sta3N);
        query += select
                + " and sta3N = @sta3N";
        query += " ORDER BY RiskLevel ASC";
    } 
 
    query += "; SELECT * FROM Ref_OutreachStatus";
  
      request.query(query, function(err, recordset) {
          if (err) { 
            console.dir(err);
            res.send(401, 'Query Failed');
            return; 
          }
          var jsonRecordSet = JSON.parse(JSON.stringify(recordset[0]));
          var jsonOutreachStatus = JSON.parse(JSON.stringify(recordset[1]));
          res.send({patients:jsonRecordSet, outreachStatus:jsonOutreachStatus });
      });

  });
    
}

exports.update = function(req, res) {
    res.header("content-type: application/json");
    var data = [];

    var dbc = require('../../config/db_connection/development.js');
    var config = dbc.config;
    var connection = new sql.Connection(config, function(err) {
        // ... error checks
        if (err) { 
        data = "Error: Database connection failed!";
        //console.log("Database connection failed!"); 
        return; 
        }

        // Query
        var request = new sql.Request(connection); // or: var request = connection.request();
        var outreachStatus = req.param("outreachStatus");
        var vetReachID = req.param("vetReachID");
        var userId = req.param("UserID");
        var query = '';

        if (userID) {
          request.input('userID', sql.Int, userID);

        }
        
        if (vetReachID) {
            request.input('vetReachID', sql.Int, vetReachID);
            var value = '';
            if (outreachStatus == null || outreachStatus.length == 0 || outreachStatus == 0)
                value = "NULL";
            else
                value = outreachStatus;

            request.input('value', sql.Int, value);

            //query += "UPDATE Patient SET OutreachStatus = " + value + " WHERE  ReachID=" + vetReachID;
            query += "exec dbo.sp_SaveOutreachStatus @User=@userId, @ReachID=@vetReachID, @Status=@value";
        }
        else {
            res.send("ERROR: vetReach ID is required.");
        }

        request.query(query, function(err, recordset) {
            // ... error checks
            if (err) { 
              console.dir(err);
              res.send(401, 'Query Failed');
              return; 
            }

            data = "Save Completed Successfully!";
            res.send(data);
        });

    });
    
};