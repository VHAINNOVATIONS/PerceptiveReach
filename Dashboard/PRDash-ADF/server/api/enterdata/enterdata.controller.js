'use strict';

var _ = require('lodash');
var validator = require('validator');
var sql = require('mssql');
var praudit = require('../../audit');

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
        var ReachID = req.param("reachID");


        var query = '';

        query =   'SELECT * ' +
                  'FROM ClinOutreach_HighRisk_SPANImport ' +
                  'WHERE ReachID =  '+ReachID +
                  'ORDER BY Revision desc; '

//High Risk user data entry
        query +=  'SELECT * ' +
                  'FROM ClinOutreach_HighRisk_UserNotes ' +
                  'WHERE ReachID =  '+ReachID +
                  'ORDER BY Revision desc; '

// Safety Plan system of record
              query += 'SELECT * ' +
                  'FROM ClinOutreach_SafetyPlan_SPANImport ' +
                  'WHERE ReachID = '+ReachID +
                  'ORDER BY Revision desc; '
// Safety Plan user data entry
              query += 'SELECT * ' +
              'FROM ClinOutreach_SafetyPlan_UserNotes ' +
              'WHERE ReachID = '+ReachID +
              'ORDER BY Revision desc; '

// Primary Health Provider user data entry
              query += 'SELECT * ' +
              'FROM ClinOutreach_PrimaryHealthProvider_UserNotes ' +
              'WHERE ReachID = '+ReachID +
              'ORDER BY Revision desc; '

// General Comments
              query += 'SELECT * ' +
              'FROM ClinOutreach_GeneralComments ' +
              'WHERE ReachID =  '+ReachID +
              'ORDER BY Revision desc; '

//Outreach Status
            query +=   'SELECT * ' +
            'FROM PatientOutReachStatus ' +
            'WHERE ReachID =  '+ReachID +'; '


        // Query the database
      request.query(query, function(err, recordset) {
      if (err) {
        connection.close();
        console.dir(err);
        praudit.auditlog('SQL ERROR',err);
        res.send(401, 'Query Failed.');
        return;
      }
      connection.close();
         /*Parse result into JSON object and format the date */
 			var jsonHighRisk_SPANImport = JSON.parse(JSON.stringify(recordset[0]));
 			var jsonHighRisk_UserNotes = JSON.parse(JSON.stringify(recordset[1]));
 			var jsonSafetyPlan_SPANImport = JSON.parse(JSON.stringify(recordset[2]));
      var jsonSafetyPlan_UserNotes = JSON.parse(JSON.stringify(recordset[3]));
      var jsonPrimaryHealthProvider_UserNotes = JSON.parse(JSON.stringify(recordset[4]));
      var jsonGeneralComments = JSON.parse(JSON.stringify(recordset[5]));
      var jsonOutreachStatus = JSON.parse(JSON.stringify(recordset[6]));

      /*Send the data */
      res.send({HighRisk_SPANImport:jsonHighRisk_SPANImport,
        HighRisk_UserNotes:jsonHighRisk_UserNotes,
        SafetyPlan_SPANImport:jsonSafetyPlan_SPANImport,
        SafetyPlan_UserNotes:jsonSafetyPlan_UserNotes,
        PrimaryHealthProvider_UserNotes:jsonPrimaryHealthProvider_UserNotes,
        GeneralComments:jsonGeneralComments,
        OutreachStatus: jsonOutreachStatus
        });
    });
    });
  }

  exports.insert =  function(req,res){
    var dbc = require('../../config/db_connection/development.js');
    var config = dbc.config;  var data = [];
    var connection = new sql.Connection(config, function(err) {
        var request = new sql.Request(connection);
        request.multiple = true;

        res.header("content-type: application/json");
        var UpdatedUserData = req.param("UpdatedUserData");
        var ReachID = req.param("reachID");
        var query = "";
        if(UpdatedUserData.hrUserNotes.isNew)
        {
          //insert hrData
         var param1 = ReachID;
         var param2 = UpdatedUserData.hrUserNotes.entry;

         request.input('reachID', sql.Int, param1);
         request.input('userNotes',sql.NVarChar(sql.MAX),param2);

          query += 'INSERT INTO [dbo].[ClinOutreach_HighRisk_UserNotes] ([ReachID],[EntryDate],[UserNotes]) VALUES (@reachID,getdate(),@userNotes);'

        }
        if(UpdatedUserData.mhUserNotes.isNew)
        {
          //insert hrData
         var param1 = ReachID;
         var param2 = UpdatedUserData.mhUserNotes.entry;

         request.input('reachID', sql.Int, param1);
         request.input('userNotes',sql.NVarChar(sql.MAX),param2);

          query += 'INSERT INTO [dbo].[ClinOutreach_PrimaryHealthProvider_UserNotes] ([ReachID],[EntryDate],[UserNotes]) VALUES (@reachID,getdate(),@userNotes);'

        }
        if(UpdatedUserData.spUserNotes.isNew)
        {
          //insert spData
          var param1 = ReachID;
          var param2 = UpdatedUserData.spUserNotes.entry;

          request.input('reachID', sql.Int, param1);
          request.input('userNotes',sql.NVarChar(sql.MAX),param2);

           query += 'INSERT INTO [dbo].[ClinOutreach_SafetyPlan_UserNotes] ([ReachID],[EntryDate],[UserNotes]) VALUES (@reachID,getdate(),@userNotes);'

        }
        if(UpdatedUserData.gcUserNotes.isNew)
        {
          //insert gcData
          var param1 = ReachID;
          var param2 = UpdatedUserData.gcUserNotes.entry;

          request.input('reachID', sql.Int, param1);
          request.input('Comment',sql.NVarChar(sql.MAX),param2);

           query += 'INSERT INTO [dbo].[ClinOutreach_GeneralComments] ([ReachID],[EntryDate],[Comment]) VALUES (@reachID,getdate(),@Comment);'

        }

        request.query(query, function(err, recordset) {
          if (err) {
            connection.close();
            console.dir(err);
            praudit.auditlog('SQL ERROR',err);
            res.send(401, 'Query Failed.');
            return;
          }

          var action = 'Enter Data Widget updated for ReachID: ' + ReachID;
          var message = 'Updated by User ' + req.headers.prsessionkey.split('::')[0];
          praudit.auditlog(action,message,'info');
          connection.close();
          res.send('Inserted Successfully');
        });
    });

  }
