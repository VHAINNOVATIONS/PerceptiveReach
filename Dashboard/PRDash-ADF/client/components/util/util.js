'use strict';
angular.module('ui.util',[]);
angular.module('ui.util')  
  
    /* jshint ignore:end */
  .factory('Util', function(){

	return {
		makeStorageID: function()
		{
	    	var text = "";
	    	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	    	for( var i=0; i < 9; i++ )
	        	text += possible.charAt(Math.floor(Math.random() * possible.length));

	    	return text;
		}
	}
  })

  /* jshint ignore:end */
  .factory('CipherService', function CipherService($http){

	return {

		getEncryptionObj: function (){
			$http.get('/encryption')
	        .success(function(encryptionObj) {
	          sessionStorage.setItem("encryptionObj", JSON.stringify(encryptionObj));
	        }.bind(this));
		},
		/*
	     * Encrypt a message with a passphrase or password
	     *
	     * @param    string message
	     * @param    string password
	     * @return   object
	     */
	    encrypt: function(message) {
	    	//forge = new forge({disableNativeCode: false});
	    	var encryptionObj = JSON.parse(sessionStorage.getItem("encryptionObj"));
	        var salt = forge.util.decode64(encryptionObj.salt);
	        var key = forge.util.decode64(encryptionObj.key);
	        var iv = forge.util.decode64(encryptionObj.iv);
	        var cipher = forge.cipher.createCipher('AES-CBC', key);
	        cipher.start({iv: iv});
	        cipher.update(forge.util.createBuffer(message));
	        cipher.finish();
	        var cipherText = forge.util.encode64(cipher.output.getBytes());
	        return {cipher_text: cipherText, salt: encryptionObj.salt, iv: encryptionObj.iv};
	    },
	    /*
	     * Decrypt cipher text using a password or passphrase and a corresponding salt and iv
	     *
	     * @param    string (Base64) cipherText
	     * @param    string password
	     * @param    string (Base64) salt
	     * @param    string (Base64) iv
	     * @return   string
	     */
	    decrypt: function(cipherText) {
	    	var encryptionObj = JSON.parse(sessionStorage.getItem("encryptionObj"));
	    	var salt = forge.util.decode64(encryptionObj.salt);
	    	var iv = forge.util.decode64(encryptionObj.iv);
	        var key = forge.util.decode64(encryptionObj.key);
	        var decipher = forge.cipher.createDecipher('AES-CBC', key);
	        decipher.start({iv: forge.util.decode64(iv)});
	        decipher.update(forge.util.createBuffer(forge.util.decode64(cipherText)));
	        decipher.finish();
	        return decipher.output.toString();
	    }
	}
  });  