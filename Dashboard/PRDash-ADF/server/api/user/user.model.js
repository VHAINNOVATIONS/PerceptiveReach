'use strict';

//var mongoose = require('mongoose');
//var Schema = mongoose.Schema;
var Joi = require('joi');
var crypto = require('crypto');
var authTypes = ['github', 'twitter', 'facebook', 'google'];
var _ = require('lodash');
var sql = require('mssql');

/*var UserSchema = new Schema({
  name: String,
  email: { type: String, lowercase: true },
  role: {
    type: String,
    default: 'user'
  },
  hashedPassword: String,
  provider: String,
  salt: String,
  twitter: {},
  google: {},
  github: {}
});*/

var UserSchema = Joi.object().keys({
  UserID: Joi.number().integer().required(),
  UserName: Joi.string().max(50).required(),
  UserRole: Joi.string().max(50),
  UserLocation: Joi.string().max(50),
  FirstName: Joi.string().max(50),
  LastName: Joi.string().max(50),
  UserPassword: Joi.string().max(50)
});

var User = function(data){
  //console.log(data);
  this.salt = this.makeSalt();
  this.data = data; //this.sanitize(data);
  //console.log(this.data);
  Joi.validate(data, UserSchema, console.log);
  ////console.log("\n" + data['UserPassword']);
  this.hashedPassword = this.encryptPassword(data['UserPassword']);
}


User.prototype.data = {};
User.prototype.token = {};
User.prototype.salt = "";
User.prototype.hashedPassword = "";


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
  this.hashedPassword = this.encryptPassword(password);
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
/**
 * Virtuals
 */
/*UserSchema
  .virtual('password')
  .set(function(password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashedPassword = this.encryptPassword(password);
  })
  .get(function() {
    return this._password;
  });

// Public profile information
UserSchema
  .virtual('profile')
  .get(function() {
    return {
      'name': this.name,
      'role': this.role
    };
  });

// Non-sensitive info we'll be putting in the token
UserSchema
  .virtual('token')
  .get(function() {
    return {
      '_id': this._id,
      'role': this.role
    };
  });*/

/**
 * Validations
 */

/*// Validate empty email
UserSchema
  .path('email')
  .validate(function(email) {
    if (authTypes.indexOf(this.provider) !== -1) return true;
    return email.length;
  }, 'Email cannot be blank');

// Validate empty password
UserSchema
  .path('hashedPassword')
  .validate(function(hashedPassword) {
    if (authTypes.indexOf(this.provider) !== -1) return true;
    return hashedPassword.length;
  }, 'Password cannot be blank');

// Validate email is not taken
UserSchema
  .path('email')
  .validate(function(value, respond) {
    var self = this;
    this.constructor.findOne({email: value}, function(err, user) {
      if(err) throw err;
      if(user) {
        if(self.id === user.id) return respond(true);
        return respond(false);
      }
      respond(true);
    });
}, 'The specified email address is already in use.');*/

User.prototype.validatePresenceOf = function(value) {
  return value && value.length;
};

/**
 * Pre-save hook
 */
/*UserSchema
  .pre('save', function(next) {
    if (!this.isNew) return next();

    if (!validatePresenceOf(this.hashedPassword) && authTypes.indexOf(this.provider) === -1)
      next(new Error('Invalid password'));
    else
      next();
  }); */

/**
 * Methods
 */

 User.prototype.authenticate = function(plainText) {
    //console.log("inside user authentication method");
    return this.encryptPassword(plainText) === this.hashedPassword;
  }

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
        ////console.log("This is data: " + data[0]);
        if (err) return callback(null, null);
        if (data == null) return callback(err,null);
        callback(null, new User(data[0]));
      });
      
    //}
  }
  User.findBy = function(key,callback){
    var data = [];

    var dbc = require('../../config/db_connection/development.js');
    var config = dbc.config;

    //var un = req.param("UserName");
    //var pw = req.param("Password");

    var query = '';
    if (key) {
        //console.log("Registering endpoint: /user/findBy/:key is " + key);
        query = "SELECT u.UserID, u.UserName, u.FirstName, u.LastName, r.RoleCode AS UserRole, v.VAMC AS UserLocation, u.UserPassword ";
        query += "FROM prsystem.Users u INNER JOIN prsystem.UserRole r ON u.UserRole = r.RoleID ";
        query += "INNER JOIN dbo.Ref_VAMC v ON u.UserLocation = v.VAMCID ";
        query += "WHERE "+ Object.keys(key)[0] + " =  '" + key[Object.keys(key)[0]] + "'";
        //query += "AND UserPassword =  '" + pw + "'";
        //console.log("Query: " + query);
    } else {
        ////console.log("ERROR: User Name and Password are required."); 
        //res.send("ERROR: User Name and Password are required.");

    }

    var connection = new sql.Connection(config, function(err) {
        // ... error checks
        if (err || !query) { 
        data = "Error: Database connection failed!";
        //console.log("Database connection failed!"); 
        return; 
        }

        // Query
        var request = new sql.Request(connection); // or: var request = connection.request();
        request.query(query, function(err, recordset) {
            // ... error checks
            if (recordset.length < 1){/*console.log("Invalid Key or statement");*/ /*res.send("Invalid key value");*/ return callback("Invalid Key or statement",null);}
            if (err) { 
            //console.log("Query failed!"); 
            return; 
            }

            //console.log(recordset.length);
            //res.send(recordset);
            ////console.log(JSON.stringify(recordset));
            return callback(null,recordset);
        });

    });
  }
//UserSchema.methods = {
  /**
   * Authenticate - check if the passwords are the same
   *
   * @param {String} plainText
   * @return {Boolean}
   * @api public
   */
  //authenticate: function(plainText) {
   // return this.encryptPassword(plainText) === this.hashedPassword;
  //},

  /**
   * Make salt
   *
   * @return {String}
   * @api public
   */
  //makeSalt: function() {
   // return crypto.randomBytes(16).toString('base64');
  //},

  /**
   * Encrypt password
   *
   * @param {String} password
   * @return {String}
   * @api public
   */
  //encryptPassword: function(password) {
  //  if (!password || !this.salt) return '';
  //  var salt = new Buffer(this.salt, 'base64');
  //  return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
  //}
//};

//module.exports = mongoose.model('User', UserSchema);
module.exports = User;