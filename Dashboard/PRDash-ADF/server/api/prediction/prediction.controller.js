'use strict';

var _ = require('lodash');
var validator = require('validator');
var sql = require('mssql');

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
        var ID = req.param("ID");

        // Configure WHERE clause if needed
        var whereClause = '';
        var trueID = '';
        if (ID !== null && ID.indexOf("-f") !== -1){
            trueID = ID.split("-f")[0];
            whereClause = " WHERE VAMC = @trueID";
        } else {
            res.send(401, []);
            return;
        }

        // Configure Database Query
         if (trueID && validator.isInt(trueID)) {
            request.input('trueID', sql.Int, trueID);
        }

        var query = 'SELECT * FROM staging.FacilityResults ' + whereClause;
        // Query the database
        request.query(query, function(err, recordset) {
            if (err) { 
                console.dir(err);
                res.send(401, 'Query Failed.');
                return; 
            }

            var jsonRecordSet = JSON.parse(JSON.stringify(recordset));
            if (jsonRecordSet && jsonRecordSet.length) {
                var result = jsonRecordSet.reduce(function(r, v, index) {
                    r[0].values.push({
                        x: index,
                        y: v.Upper
                    });
                    r[1].values.push({
                        x: index,
                        y: v.Lower
                    });
                    r[2].values.push({
                        x: index,
                        y: v.Pred
                    });
                    if (v.IPWResponse > -1) {
                        r[3].values.push({
                            x: index,
                            y: v.IPWResponse
                        });
                    }
                    if (v.SA_new > -1) {
                        r[4].values.push({
                            x: index,
                            y: v.SA_new
                        });
                    }
                    return r;
                }, [
                {
                    key: 'Upper Limit',
                    values: [],
                    color: "#000000"
                }, {
                    key: 'Lower Limit',
                    values: [],
                    color: "#000000"
                }, {
                    key: 'Prediction',
                    values: [],
                    color: "#000000"
                }, {
                    key: 'Actual',
                    values: [],
                    color: "#0000FF"
                }, {
                    key: 'Comparison',
                    values: [],
                    color: "#FF0000"
                }]);
                console.log(result);
                res.send(result);
            } else {
                res.send([]);
            }
        });

    });
};

