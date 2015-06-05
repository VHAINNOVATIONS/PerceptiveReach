'use strict';

var _ = require('lodash');
var config = require('../config/environment');

// Get list of things
exports.index = function(req, res) {
  res.json(config.encryptionObj);
};