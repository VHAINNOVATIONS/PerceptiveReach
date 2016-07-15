var EventLogger = require('node-windows').EventLogger;
var config = require('../config/environment');

exports.auditlog = function(action,message,logtype){
	if(config.auditEnabled){
		var log = new EventLogger('PerceptiveReach');
		switch(logtype) {
		    case 'info':
		        log.info('Action: ' + action + '; Message: ' + message);
		        break;
		    case 'warn':
		        log.warn('Action: ' + action + '; Message: ' + message);
		        break;
		    case 'error':
		    	log.error('Action: ' + action + '; Message: ' + message);
		    	break;
		    default:
		        log.info('Action: ' + action + '; Message: ' + message);
		}
	}
};