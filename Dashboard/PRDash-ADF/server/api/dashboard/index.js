'use strict';

var express = require('express');
var controller = require('./dashboard.controller');

var router = express.Router();

router.get('/', controller.index);
router.post('/', controller.create);
//router.put('/', controller.update);

module.exports = router;