/**
 * Error responses
 */

'use strict';

module.exports.formatData = function formatData(data,type) {
  var correctData = '';

  var dataTypes = {
    'ssn': function () {
      //Check if SSN and format with xxx-xx-9009
      if(/^\d+$/.test(data) && data.length == 9){
        correctData = "xxx-xx-" + data.substr(5);
      }
      else{
        console.log("SSN provided is incorrect: " + data);
        correctData = data;
      }
    },
    'phone': function () {
      /*//Check if phone number and format (202)-465-4848
      if(/^\d+$/.test(data) && data.length == 10){
        correctData = "(" + data.substr(0, 3) + ") " + data.substr(3, 3) + "-" + data.substr(6);
      }
      else{
        console.log("Phone number provided is incorrect: " + data);
        correctData = data;
      }*/

      //Remove formatting due to CDW data being in an inconsistent format
      correctData = data;
    },
    'date': function () {
      //Check if date time and format 11/24/2015 (just date) 2004-02-03T00:00:00.000Z
      if(!isNaN(Date.parse(data))){
        var date = new Date(data); //Date.parse(data);
        correctData = (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear();
      }
      else{
        console.log("Date provided is incorrect: " + data);
        correctData = data;
      }
    },
    'unknown': function () {
      console.log("Data type (" + type + ") is unknown for data: " + data);
      correctData = data;
    }
  };

  // invoke it
  (dataTypes[type] || dataTypes['unknown'])();

  return correctData;
};