'use strict';

var _ = require('lodash');
var validator = require('validator');
var sql = require('mssql');

exports.index = function(req, res) {
  var dbc = require('../../config/db_connection/development.js');
  var config = dbc.config;  var data = [];
  var connection = new sql.Connection(config, function(err) {
    if (err) {
            console.dir(err);
            res.send(401, 'DB Connection Error.');
            return;
        }
        var request = new sql.Request(connection);
        request.multiple = true;



        var query = '';
        query =   'SELECT * ' +
                  'FROM ClinOutreach_HighRisk_SPANImport ' +
                  'WHERE ReachID = 10 ' +
                  'ORDER BY Revision desc; '

//High Risk user data entry
        query +=  'SELECT * ' +
                  'FROM ClinOutreach_HighRisk_UserNotes ' +
                  'WHERE ReachID = 10 ' +
                  'ORDER BY Revision desc; '

// Safety Plan system of record
              query += 'SELECT * ' +
                  'FROM ClinOutreach_SafetyPlan_SPANImport ' +
                  'WHERE ReachID = 10 ' +
                  'ORDER BY Revision desc; '
// Safety Plan user data entry
              query += 'SELECT * ' +
              'FROM ClinOutreach_SafetyPlan_UserNotes ' +
              'WHERE ReachID = 10 ' +
              'ORDER BY Revision desc; '

// Primary Health Provider user data entry
              query += 'SELECT * ' +
              'FROM ClinOutreach_PrimaryHealthProvider_UserNotes ' +
              'WHERE ReachID = 10 ' +
              'ORDER BY Revision desc; '

// General Comments
              query += 'SELECT * ' +
              'FROM ClinOutreach_GeneralComments ' +
              'WHERE ReachID = 1 ' +
              'ORDER BY Revision desc; '


        // Query the database
      request.query(query, function(err, recordset) {
         if (err) {
             console.dir(err);
          res.send(401, 'Query Failed.');
             return;
       }

         /*Parse result into JSON object and format the date */
         			var jsonHighRisk_SPANImport = JSON.parse(JSON.stringify(recordset[0]));
         			var jsonHighRisk_UserNotes = JSON.parse(JSON.stringify(recordset[1]));
         			var jsonSafetyPlan_SPANImport = JSON.parse(JSON.stringify(recordset[2]));
              var jsonSafetyPlan_UserNotes = JSON.parse(JSON.stringify(recordset[3]));
              var jsonPrimaryHealthProvider_UserNotes = JSON.parse(JSON.stringify(recordset[4]));
              var jsonGeneralComments = JSON.parse(JSON.stringify(recordset[5]));

      /*Send the data */
      res.send({HighRisk_SPANImport:jsonHighRisk_SPANImport,
        HighRisk_UserNotes:jsonHighRisk_UserNotes,
        SafetyPlan_SPANImport:jsonSafetyPlan_SPANImport,
        SafetyPlan_UserNotes:jsonSafetyPlan_UserNotes,
        PrimaryHealthProvider_UserNotes:jsonPrimaryHealthProvider_UserNotes,
        GeneralComments:jsonGeneralComments
        });
    });
    });
  }

  exports.insert =  function(req,res){
    res.header("content-type: application/json");
    res.send('Saved Successfully');
  }
