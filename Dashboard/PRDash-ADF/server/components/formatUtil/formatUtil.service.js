/**
 * Error responses
 */

'use strict';

module.exports.formatData = function formatData(data) {
  var correctData = '';

  //Check if SSN and format with xxx-xx-9009
  if(/^\d+$/.test(data) && data.length == 9){
    correctData = "xxx-xx-" + data.substr(5);
  }

  //Check if phone number and format (202)-465-4848
  else if(/^\d+$/.test(data) && data.length == 10){
    correctData = "(" + data.substr(0, 3) + ") " + data.substr(3, 3) + "-" + data.substr(6);
  }

  //Check if date time and format 11/24/2015 (just date) 2004-02-03T00:00:00.000Z
  else if(!isNaN(Date.parse(data))){
    var date = new Date(data); //Date.parse(data);
    correctData = (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear();
  }
  
  else
    correctData = data;

  return correctData;
};