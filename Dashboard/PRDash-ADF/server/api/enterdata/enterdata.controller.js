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

        var query = '';
        query =  "SELECT "
        query += "[VISN]"
        query += ",[NetworkName]"
        query += ",[RegionServed]"
        query += ",[TotalPatients] AS Total"
        query += ",[AtRisk]"
        query += " FROM [dbo].[vw_VISNRoster]"
        query += " ORDER BY VISN"
    
        // Query the database
        // request.query(query, function(err, recordset) {
        // if (err) { 
        //     console.dir(err);
        //     res.send(401, 'Query Failed.');
        //     return; 
        // }

        // var jsonRecordSet = JSON.parse(JSON.stringify(recordset));
        // res.send(jsonRecordSet);
      
      var jsonComment = [
                          {
                           value: "This is the first comment",
                           date: "10-01-2015"
                          },
                          {
                           value: "This is the second comment",
                           date: "10-01-2015"
                          },
                          {
                           value: "This is the third comment",
                           date: "10-01-2015"
                          },
                          {
                           value: "This is the 4 comment",
                           date: "10-01-2015"
                          },
                          {
                           value: "This is the 5 comment",
                           date: "10-01-2015"
                          }
                        ];
      var jsonDataEntry = [
                            {
                             entry: "1.High Risk Flag Added",
                             date: "01-01-2016"
                            },
                            {
                             entry: "2.High Risk Flag Removed",
                             date: "12-01-2015"
                            },
                            {
                             entry: "3.High Risk Flag Cleared",
                             date: "11-01-2015"
                            },
                            {
                             entry: "4.High Risk Flag Added",
                             date: "11-01-2015"
                            }
                          ];
      var jsonSorData = [
                          {
                           entry: "1.High Risk Flag ",
                           date: "Date Initiated: 03-02-2001",
                           newdate: "Date Cleared: 02-03-2004"
                          },
                          {
                           entry: "2.High Risk Flag",
                           date: "Date Initiated: 03-02-2001",
                           newdate: "Date Cleared: 02-03-2004"
                          },
                          {
                           entry: "3.High Risk Flag ",
                           date: "Date Initiated: 03-02-2001",
                           newdate: "Date Cleared: 02-03-2004"
                          }
                        ];
      var jsonHealthEntry = [
                              {
                               entry: "1.George Doe, PhD",
                               date: "01-01-2016"
                              },
                              {
                               entry: "2.John Smith, MD",
                               date: "12-01-2015"
                              },
                              {
                               entry: "3.Charlie Brown, DPT",
                               date: "11-01-2015"
                              }
                            ];
      var jsonProviderData = [
                              {
                               entry: "1.John Doe M.D.",
                               date: "10-01-2015"
                              },
                              {
                               entry: "2.Charlie Brown, DPT",
                               date: "10-01-2015"
                              }, 
                              {
                               entry: "3.Bill Brown, DPT",
                               date: "10-01-2015"
                              }
                            ];
      var jsonSafetyEntry = [
                              {
                               entry: "1.Safety Plan Updated",
                               date: "01-01-2016"
                              },
                              {
                               entry: "2.Safety Plan Removed",
                               date: "12-01-2015"
                              },
                              {
                               entry: "3.Safety Plan Cleared",
                               date: "11-01-2015"
                              }
                            ];
      var jsonPlanData =  [
                            {
                             entry: "1.Safety Plan",
                            date: "Date Completed: 06-07-2008",
                            },
                            {
                              entry: "2.Safety Plan",
                            date: "Date Completed: 06-07-2008",
                            },
                            {
                              entry: "3.Safety Plan",
                            date: "Date Completed: 06-07-2008",
                            }
                          ];   
      /*Send the data */
      res.send({comments:jsonComment, dataEntry:jsonDataEntry,sorData:jsonSorData,healthEntry:jsonHealthEntry });

  });        
        
}
