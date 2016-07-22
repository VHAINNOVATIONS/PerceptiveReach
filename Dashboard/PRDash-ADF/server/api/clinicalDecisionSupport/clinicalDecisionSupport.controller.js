'use strict';

var _ = require('lodash');
var validator = require('validator');
var sql = require('mssql');
var dataFormatter = require('../../components/formatUtil/formatUtil.service.js');
var praudit = require('../../audit');

exports.index = function(req, res) {
	/*Configure response header */
    //res.header("content-type: application/json");
	
	/*Configure and open database */
    var dbc = require('../../config/db_connection/development.js');
    var config = dbc.config; var data = [];
	var connection = new sql.Connection(config, function(err) {
		if (err) { 
			data = "Error: Database connection failed!";
			return; 
		}
		var request = new sql.Request(connection); 
		
		/* Request parameters from database */
		var guideType = req.param("guideType");
		var riskLevel = req.param("riskLevel");
		
		/*Configure database query */
		var query = '';
		var select = "SELECT CDSG.CDSG_ID, CDSG.Features, CDSG.Action, CDSG.GuidelineType, CDSG.RiskLevel, RL.RiskLevelDesc, RF.GuidelineURL, RF.ToolkitURL FROM Ref_ClinicalDecisionSupportGuideline As CDSG INNER JOIN  Ref_GuidelineRiskFactors As RF ON CDSG.GuidelineType = RF.RiskFactorCode INNER JOIN Ref_RiskLevel As RL ON RL.RiskLevelID = CDSG.RiskLevel"; 

		if (guideType) {
			request.input('guideType', sql.VarChar(50), guideType);
			query += select
				  + " WHERE CDSG.GuidelineType = @guideType ";
			if (riskLevel && validator.isInt(riskLevel)) {
				request.input('riskLevel', sql.Int, riskLevel);
				query += " AND CDSG.RiskLevel= @riskLevel";
			}
			query += " ORDER BY CDSG.RiskLevel ASC";
		} 
		else if (riskLevel && validator.isInt(riskLevel)) {
			request.input('riskLevel', sql.Int, riskLevel);
			query += select
				  + " WHERE CDSG.RiskLevel = @riskLevel";
				  + " ORDER BY CDSG.RiskLevel ASC";
		}
		else {
			query += select 
				  + " ORDER BY CDSG.RiskLevel ASC";
		}

		/*Query database */
		request.query(query, function(err, recordset) {
			if (err) { 
				connection.close();
				console.dir(err);
				praudit.auditlog('SQL ERROR',err);
				res.send(401, "Query Failed");
				return; 
			}
			
			connection.close();
			/*Send the data */
			res.send(recordset);
		});
    });   
};
