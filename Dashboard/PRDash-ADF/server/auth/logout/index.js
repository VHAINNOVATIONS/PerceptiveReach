var express = require('express');
var config = require('../../config/environment');
var User = require('../../api/user/user.model');
var router = express.Router();
var praudit = require('../../audit');

router.post('/', function(req, res, next) {
	if(req.headers.prsessionkey){
      var userName = req.headers.prsessionkey.split('::')[0];
      var timeStamp = req.headers.prsessionkey.split('::')[1];
      if(config.prSessionStore[userName] && config.prSessionStore[userName][timeStamp])
      {
       	delete config.prSessionStore[userName][timeStamp];
      }
    }
    User.Update({
                UserName: req.body.username,
                Status: 'logout'
             }, function(err, user) {                
                    if (err) return res.json(401, {message: 'ERROR:Updating user record after authentication'}); 
            });
    praudit.auditlog('LOGOUT','LOGOUT successful for ' + req.body.username);
    res.json(null);
});

module.exports = router;