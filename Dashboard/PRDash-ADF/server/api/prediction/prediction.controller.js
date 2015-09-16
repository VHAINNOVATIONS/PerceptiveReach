'use strict';

var _ = require('lodash');
var validator = require('validator');
var sql = require('mssql');
var dataFormatter = require('../../components/formatUtil/formatUtil.service.js');

var generatePredictionData = function(groups, points) { //# groups,# points per group
    var data = [];
    //var shapes = ['circle', 'cross', 'triangle-up', 'triangle-down', 'diamond', 'square'];
    var random = Math.random;
    data = [{
      key: 'Upper Limit',
      values: []
    }, {
      key: 'Lower Limit',
      values: []
    }, {
      key: 'Prediction',
      values: []
    }, {
      key: 'Actual',
      values: []
    }, {
      key: 'Comparison',
      values: []
    }];
    for (var ju = 1; ju < 16; ++ju) {
      var yu = 70.0 + 30.0 * (ju / 16.0);
      data[0].values.push({
        x: ju,
        y: yu
      });
    }
    for (var jl = 1; jl < 16; ++jl) {
      var yl = 30.0 - 30.0 * (jl / 16.0);
      data[1].values.push({
        x: jl,
        y: yl
      });
    }
    for (var jp = 1; jp < 16; ++jp) {
      data[2].values.push({
        x: jp,
        y: 50
      });
    }
    for (var ja = 1; ja < 13; ++ja) {
        var ya = 30.0 + random() * 40;
        data[3].values.push({
            x: ja,
            y: ya
        });
    }
    for (var jc = 13; jc < 16; ++jc) {
        var yc = 30.0 + random() * 40;
        data[4].values.push({
            x: jc,
            y: yc
        });
    }
    return data;
};

exports.index = function(req, res) {
    var data = generatePredictionData(4, 40);
    console.log(req.param("ID"));
    res.send(data);

    /*
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

        query += 'SELECT rl.RiskLevelDesc as RiskLevel, COUNT(DISTINCT p.ReachID) as Total FROM dbo.Patient p'; 
        query += ' INNER JOIN dbo.Ref_RiskLevel rl ON p.RiskLevel = rl.RiskLevelID';
        query += " INNER JOIN PatientStation s ON s.ReachID = p.ReachID";
        query += " INNER JOIN Ref_VAMC v ON s.sta3N = v.STA3N";
        query += whereClause;
        query += ' GROUP BY rl.RiskLevelDesc';
        
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
*/
};

