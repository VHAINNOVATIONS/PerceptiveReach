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
    var data = [];

    var dbc = require('../../config/db_connection/development.js');
    var config = dbc.config;

    var guideType = req.param("guideType");
    var riskLevel = req.param("riskLevel");
    var query = '';
    var select = "SELECT CDSG.CDSG_ID, CDSG.Features, CDSG.Action, CDSG.GuidelineType, CDSG.RiskLevel, RL.Risk_Name, RF.GuidelineURL, RF.ToolkitURL FROM ClinicalDecisionSupoortGuideline As CDSG INNER JOIN  RiskFactors As RF ON CDSG.GuidelineType = RF.RiskFactorCode INNER JOIN Ref_RiskLevel As RL ON RL.Risk_ID = CDSG.RiskLevel"; 
    //query += "ReachID, vamc.VAMC FROM VeteranRisk vet INNER JOIN Ref_VAMC vamc ON vet.VAMC = vamc.VAMCID WHERE ";
    if (guideType) {
        console.log("Registering endpoint: /clinicalDecisionSupport/:guideType is " + guideType);
        //query += "vamc.vamcID = " + id;
        query += select
                + " WHERE CDSG.GuidelineType = " + guideType;
        if (riskLevel) {
            console.log("Registering endpoint: /clinicalDecisionSupport/:guideType&riskLevel is " + riskLevel);
            query += " AND CDSG.RiskLevel= " + riskLevel;
        }
        query += " ORDER BY CDSG.RiskLevel ASC";

    } 
    
    else {
        console.log("Registering endpoint: /clinicalDecisionSupport/:All");
        query += select 
                + " ORDER BY CDSG.RiskLevel ASC";
        //res.send("ERROR: VAMC ID is required.");
        //console.log("ERROR: VAMC ID is required."); 
    }

    var connection = new sql.Connection(config, function(err) {
        // ... error checks
        if (err) { 
        data = "Error: Database connection failed!";
        console.log("Database connection failed!"); 
        return; 
        }

        // Query
        var request = new sql.Request(connection); // or: var request = connection.request();
        request.query(query, function(err, recordset) {
            // ... error checks
            if (err) { 
            console.log("Query failed! -- " + query); 
            return; 
            }

            console.log(recordset.length);
            console.log(recordset);
            
            res.send(recordset);
        });

    });
    
};
