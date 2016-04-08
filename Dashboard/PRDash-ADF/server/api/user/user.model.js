'use strict';

//var mongoose = require('mongoose');
//var Schema = mongoose.Schema;
var Joi = require('joi');
var crypto = require('crypto');
var authTypes = ['github', 'twitter', 'facebook', 'google'];
var _ = require('lodash');
var sql = require('mssql');

var UserSchema = Joi.object().keys({
  UserID: Joi.number().integer().required(),
  UserName: Joi.string().max(50).required(),
  UserRole: Joi.string().max(50),
  UserStateLocation: Joi.string().max(2),
  FirstName: Joi.string().max(50),
  LastName: Joi.string().max(50),
  UserHomeFacility: Joi.string().max(50),
  UserDomain: Joi.string().max(50),
  isActive: Joi.string().max(10)
});

var User = function(data){
  this.salt = this.makeSalt();
  this.data = data; //this.sanitize(data);
  Joi.validate(data, UserSchema, console.log);
}


User.prototype.data = {};
User.prototype.token = {};
User.prototype.salt = "";

User.prototype.getData = function(name){
  return this.data[name];
}
User.prototype.setData = function(name,value){
  this.data[name] = value;
}

User.prototype.getPassword = function(){
  return this.userPassword;
}
User.prototype.setPassword = function(password){
  this.userPassword = password;
  this.salt = this.makeSalt();
}

User.prototype.getProfile = function(){
  return {'name': this.getData("UserName"),
          'role' : this.getData("UserRole")
  };
}

User.prototype.getToken = function(){
  return {'_id': this.getData("UserID"),
          'role' : this.getData("UserRole")
  };
}

User.prototype.validatePresenceOf = function(value) {
  return value && value.length;
};


User.prototype.makeSalt = function() {
  return crypto.randomBytes(16).toString('base64');
}

User.prototype.encryptPassword = function(password) {
  //console.log("inside encrypt password: " + password);
  if (!password || !this.salt) return '';
  var salt = new Buffer(this.salt, 'base64');
  return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
}

User.prototype.sanitize = function(data) {
  data = data || {};
  return _.pick(_.defaults(data,UserSchema), _.keys(UserSchema));
}

User.findById = function(id, callback){
  //console.log("findById: " + id);
  /*this.findBy({UserID: id},function(err, data) {
      ////console.log(err);
      ////console.log("This is data: " + data[0]);
      if (err) return callback(null, null);
      if (data == null) return callback(err,null);
      callback(null, new User(data[0]));
    });  */
}

User.findOne = function(param, callback){
  //if(param.UserName){
    this.findBy(param,function(err, data) {
      ////console.log(err);
      if (err) return callback(err, null);
      if (data == null) return callback(err,null);
      callback(null, new User(data[0]));
    });
    
  //}
}

User.findBy = function(key,callback){
  var data = [];

  var dbc = require('../../config/db_connection/development.js');
  var appConfig = require('../../config/environment');
  var config = dbc.config;
  var sessionStore = appConfig.prSessionStore;
  var userSessions = sessionStore[key[Object.keys(key)[0]]];
  var sessioncount = 0;
  if(userSessions)
  {
    sessioncount = Object.keys(userSessions).length;
  }

      var connection = new sql.Connection(config, function(err) {
      // ... error checks
      if (err) { 
      data = "Error: Database connection failed!";
      console.log("Database connection failed!", err); 
      return; 
      }
      var request = new sql.Request(connection); // or: var request = connection.request();

      var userName = key[Object.keys(key)[0]];
      request.input('userNameParam', sql.VarChar(50), userName);
      request.input('sessioncount', sql.Int, sessioncount);

      var query = '';
      if (key) {
          query = "exec prsystem.sp_GetUser @UserName=@userNameParam, @ExistingSessionCount=@sessioncount";
      } else {
          ////console.log("ERROR: User Name and Password are required."); 
          //res.send("ERROR: User Name and Password are required.");
      }        

      // Query
      request.query(query, function(err, recordset) {
          // ... error checks
          if (err) { 
            //console.log("Query failed!", err); 
            return callback(err.message,null);
          }

          if (recordset.length < 1){
            return callback("Invalid Key or statement",null);
          }
          
          recordset[0].DashboardData = JSON.parse(recordset[0].DashboardData);
          //console.log("User.findBy - full record", recordset);
          return callback(null,recordset);
      });
  });
}

User.Update = function(key,callback){
  var dbc = require('../../config/db_connection/development.js');
  var config = dbc.config;

  var connection = new sql.Connection(config, function(err) {

      if (err) { 
        console.dir(err); 
        return; 
      }
      var request = new sql.Request(connection);   

      var userName = key[Object.keys(key)[0]];
      var status = key[Object.keys(key)[1]];
      request.input('userNameParam', sql.VarChar(50), userName);
      request.input('statusParam', sql.VarChar(25), status);
      var query = "exec prsystem.sp_UpdateUser @UserName=@userNameParam, @Status=@statusParam";

      request.query(query, function(err, recordset) {
        if(err)
        {
          return callback(err.message,null);
        }
        return callback(null,recordset);
      });
  });
}

module.exports = User;
