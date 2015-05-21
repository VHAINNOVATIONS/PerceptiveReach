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
  }); 