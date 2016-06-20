var EventLogger = require('node-windows').EventLogger;

exports.auditlog = function(action,message,logtype){
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
};