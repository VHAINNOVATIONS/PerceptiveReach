var express = require('express');
var config = require('../../config/environment');
var User = require('../../api/user/user.model');
var router = express.Router();

router.post('/', function(req, res, next) {
    User.Update({
                UserName: req.body.username,
                Status: 'logout'
             }, function(err, user) {                
                    if (err) return res.json(401, {message: 'ERROR:Updating user record after authentication'}); 
            });
    res.json(null);
});

module.exports = router;