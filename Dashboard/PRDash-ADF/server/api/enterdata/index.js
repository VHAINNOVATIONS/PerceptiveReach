'use strict';

var express = require('express');
var controller = require('./enterdata.controller');

var router = express.Router();

router.get('/', controller.index);
router.put('/', controller.insert);

module.exports = router;
