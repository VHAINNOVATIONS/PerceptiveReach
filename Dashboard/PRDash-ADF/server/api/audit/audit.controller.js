'use strict';
var praudit = require('../../audit');

exports.index = function(req, res) {
    var action = req.body.action;
    var message = 'User ' + req.headers.prsessionkey.split('::')[0];
    var logType = 'info';
	praudit.auditlog(action,message,logType);
    res.send('Successfully logged event');
};
