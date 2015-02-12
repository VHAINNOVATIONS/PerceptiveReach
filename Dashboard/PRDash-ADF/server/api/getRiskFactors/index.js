'use strict';

var express = require('express');
var controller = require('./getRiskFactors.controller');

var router = express.Router();

router.get('/', controller.index);

module.exports = router;