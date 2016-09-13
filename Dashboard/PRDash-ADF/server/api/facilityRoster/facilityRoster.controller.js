'use strict';

var _ = require('lodash');
var validator = require('validator');
var sql = require('mssql');
var praudit = require('../../audit');

exports.index = function(req, res) {
	/*Configure response header */
	//res.header("content-type: application/json");
	
	/*Configure and open database */
	var dbc = require('../../config/db_connection/development.js');
	var config = dbc.config;  var data = [];
	var connection = new sql.Connection(config, function(err) {        
        if (err) { 
            console.dir(err);
            res.send(401, 'DB Connection Error.');
            return; 
        }
        var request = new sql.Request(connection);
        var VISN = req.param("VISN");
        
        var userName = req.headers.prsessionkey != undefined ? req.headers.prsessionkey.split('::')[0] : '';
        var visnId = null;
        if (VISN && validator.isInt(VISN)) {
           visnId =  VISN
        }


        request.input('userNameParam', sql.VarChar(50), userName);
        request.input('visnIdParam', sql.VarChar(25), visnId);
        var query = "exec prsystem.sp_GetFacility @UserName=@userNameParam, @VisnId=@visnIdParam";

    
        // Query the database
        request.query(query, function(err, recordset) {
            if (err) { 
                console.dir(err);
                res.send(401, 'Query Failed.');
                return; 
            }


            var jsonRecordSet = JSON.parse(JSON.stringify(recordset));


            query = 'SELECT VAMC, Upper, Lower, SA_new FROM staging.FacilityResults WHERE Month_no > 14';
            request.query(query, function(err, prrecordset) {
                if (err) {
                    connection.close();
                    console.dir(err);
                    praudit.auditlog('SQL ERROR',err);
                    res.send(401, 'Query Failed.');
                    return;
                }
               var predictionAlert = prrecordset.reduce(function(r, p) {
                    var e = r[p.VAMC];
                    if (! e) {
                        r[p.VAMC] = e = {
                            higher: 0,
                            lower: 0
                        };
                    }
                    if (p.SA_new >= 0) {
                        if (p.SA_new < p.Lower) {
                            ++e.lower;
                        }
                        if (p.SA_new > p.Upper) {
                            ++e.higher;
                        }
                    }
                    return r;
                }, {});

                connection.close();
                jsonRecordSet.forEach(function(r) {
                    var vamc = r.STA3N;
                    if (vamc && predictionAlert[vamc]) {
                        var pa = predictionAlert[vamc];
                        if (pa.higher + pa.lower === 0) {
                            r.Prediction = "Within limits"
                        } else if (pa.higher && pa.lower) {
                            r.Prediction = "Too high and low"
                        } else if (pa.higher) {
                            r.Prediction = "Too high"
                        } else if (pa.lower) {
                            r.Prediction = "Too low"
                        }
                    } else {
                        r.Prediction = "No data"
                    }
                });

                res.send(jsonRecordSet);
            });
        });

    });
}
