'use strict';

var _ = require('lodash');
var validator = require('validator');
var sql = require('mssql');
var dataFormatter = require('../../components/formatUtil/formatUtil.service.js');

exports.index = function(req, res) {
    //res.header("content-type: application/json");

    var dbc = require('../../config/db_connection/development.js');
    var config = dbc.config;
    var connection = new sql.Connection(config, function(err) {        
        if (err) { 
            console.dir(err);
            res.send(401, 'DB Connection Error.');
            return; 
        }
        var request = new sql.Request(connection);
         /*
        var ID = req.param("ID");


        // Configure WHERE clause if needed
        var whereClause = '';
        var trueID = '';
        if(ID != null && ID.indexOf("-v") != -1){
            trueID = ID.split("-v")[0];
            whereClause = " WHERE v.VISN = @trueID";
        }
        else if(ID != null && ID.indexOf("-f") != -1){
            trueID = ID.split("-f")[0];
            whereClause = " WHERE s.sta3N = @trueID";
        }

        // Configure Database Query
        var query = '';
        if (trueID && validator.isInt(trueID)) {
            request.input('trueID', sql.Int, trueID);            
        }

        */

         // Configure WHERE clause if needed
         var query = '';

          var sta3N = req.param("sta3N");
          var VISN = req.param("VISN");
  
          var whereClause = ' ';
  

          
          if(VISN && validator.isInt(VISN)){
              whereClause = " where v.VISN = @VISN ";
              request.input('VISN', sql.Int,VISN);
          }    
          if(sta3N && validator.isInt(sta3N)){
                  whereClause += " and  s.sta3N = @sta3N ";
                  request.input('sta3N', sql.Int,sta3N);
          }
          


        query += "SELECT CASE";
        query += " WHEN DOB < DATEADD(year, -18, getdate()) AND DOB >= DATEADD(year, -29, getdate()) THEN '18 - 29'";
        query += " WHEN DOB < DATEADD(year, -29, getdate()) AND DOB >= DATEADD(year, -44, getdate()) THEN '30 - 44'";
        query += " WHEN DOB < DATEADD(year, -44, getdate()) AND DOB >= DATEADD(year, -69, getdate()) THEN '45 - 69'";
        query += " WHEN DOB < DATEADD(year, -69, getdate()) then '70+'";
        query += " END as AgeRange, d.RiskLevelDesc as RiskLevelDescription, COUNT(DISTINCT p.ReachID) as Total";
        query += " FROM dbo.Patient p INNER JOIN Ref_RiskLevel d ON p.RiskLevel = d.RiskLevelID";
        query += " INNER JOIN PatientStation s ON s.ReachID = p.ReachID";
        query += " INNER JOIN Ref_VAMC v ON s.sta3N = v.STA3N ";
        query += whereClause;
        query += " GROUP BY CASE";
        query += " WHEN DOB < DATEADD(year, -18, getdate()) AND DOB >= DATEADD(year, -29, getdate()) THEN '18 - 29'";
        query += " WHEN DOB < DATEADD(year, -29, getdate()) AND DOB >= DATEADD(year, -44, getdate()) THEN '30 - 44'";
        query += " WHEN DOB < DATEADD(year, -44, getdate()) AND DOB >= DATEADD(year, -69, getdate()) THEN '45 - 69'";
        query += " WHEN DOB < DATEADD(year, -69, getdate()) then '70+'";
        query += " END, d.RiskLevelDesc ORDER BY AgeRange";
        
        // Query the database
        request.query(query, function(err, recordset) {
            if (err) { 
                console.dir(err);
                res.send(401, 'Query Failed.');
                return; 
            }

            var jsonRecordSet = JSON.parse(JSON.stringify(recordset));
            res.send(jsonRecordSet);
        });

    });
  
};