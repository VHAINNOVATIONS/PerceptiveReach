var sql = require('mssql');

var config = {
    user: 'sa',
    password: 'agile_123',
    server: '54.225.232.25', // You can use 'localhost\\instance' to connect to named instance
    database: 'Reach',

    options: {
        encrypt: false // Use this if you're on Windows Azure
    }
}

var express = require('express');
var app = express();

app.use(function(req, res, next) {
res.setHeader("Access-Control-Allow-Origin", "*");
return next();
});

app.use(express.static(__dirname +'/html'));


var data = [];

var connection = new sql.Connection(config, function(err) {
    // ... error checks
    if (err) {
        data = "Error: Database connection failed!";
        console.log("Database connection failed!"); 
        return; 
    }

    // Query
    var request = new sql.Request(connection); // or: var request = connection.request();
    request.query('SELECT * from dbo.Direct_NotifyQueue where MsgStatus = 1', function(err, data) {
        // ... error checks
        if (err) { 
            console.log("Query failed!"); 
            return; 
        }

        console.log(data.length);
        for (var i = 0; i < data.length; i++) {

              //  $("#send").click(function() {
                    $("#messageForm").ajaxSubmit({  
                      type: "POST",  
                      url: "https://api.demo.careinbox.com/direct/send/format/json",  
                      beforeSend: function(request){
                        start = new Date().getTime();
                        //use this block if you want to send UTC stamp
                        /*var d = Date.now();
                        var currentDate = Math.round(d / 1000);*/
                        //use this block if you want to send normal timestamp with timezone

                        
                        //2015-04-19 Ref: Current Error - Access Control
                        // res.setHeader("Access-Control-Allow-Origin", "*");

                        var d = new Date();
                        var currentDate = d.format("mm/dd/yyyy HH:MM:ss Z");
                    
                        var hashString = CryptoJS.HmacSHA256("POST\n"+currentDate+"\nmultipart/form-data\n/direct/send/format/json","b5a5273e6b71ad60dbb84d04bd33f5d91767fec9da6e737a78b00c1b3915b662");
                        var base64 = encode64(""+hashString);
                        var authorization = "DAAS 8a674074b98cb076cda211b41034560bea5a9f36bed76d7fcb294cd95b9ef137:"+base64;
                        request.setRequestHeader("Authorization", authorization);
                        request.setRequestHeader("X-Daas-Date", currentDate);
                        attempts++;
                        var appendStr = "<div class=\"innerPost break-word\" id=\"post"+attempts+"\">"+
                                                "<div class=\"inner\"><label>"+attempts+".</label></div>"+
                                                "<div class=\"inner\"><label>Custom Request Headers</label></div>"+
                                                "<div class=\"inner indent\"><label>Authentication: </label>"+authorization+"</div>"+
                                                "<div class=\"inner indent\"><label>DaasDate: </label>"+currentDate+"</div>"+
                                                "<div class=\"inner\"><label>Content</label></div>"+
                                                "<div class=\"inner indent\"><label>Mailtype: </label>"+$('#mailtype').val()+"</div>"+
                                                "<div class=\"inner indent\"><label>Priority: </label>"+$('#priority').val()+"</div>"+
                                                "<div class=\"inner indent\"><label>To: </label>"+$('#to').val()+"</div>"+
                                                "<div class=\"inner indent\"><label>Sender: </label>"+$('#sender').val()+"</div>"+
                                                "<div class=\"inner indent\"><label>Subject: </label>"+$('#subject').val()+"</div>"+
                                                "<div class=\"inner indent\"><label>Body: </label>"+$('#body').val()+"</div>"+
                                                "<div class=\"inner\"><label>Files</label></div>";
                        $('.attachmentItem').each(function(){
                            if ($(this).val()){
                                appendStr += "<div class=\"inner indent\"><label>"+$(this).attr('name')+": </label>"+$(this).val().mb_split('\\').pop()+"</div>";
                            }
                        });
                        appendStr += "</div>";
                        $('#postWrapper').append(appendStr);
                      },
                      success: function(data, status, jqXHR) { 
                        $('#success').html(data['message']).slideDown(500).delay(10000).slideUp(500);
                        end = new Date().getTime();
                        $('#responseWrapper').append("<div class=\"inner break-word\"><label>"+attempts+". "+status+" - </label>"+jqXHR.responseText + ", Execution time: "+(end - start)+" ms</div>");
                        $('#post'+attempts).css("background", "#E0FFD6");
                        $('#post'+attempts).css("border", "1px solid #008A1A");
                        $('.add_attach').remove();
                        $('#messageForm')[0].reset();
                        attachments = 0;
                        messagesSent++;
                      },
                      error: function (jqXHR, textStatus, errorThrown) {
                        end = new Date().getTime();
                        $('#error').html('<div class="imageText">' + $.parseJSON(jqXHR.responseText)['message'] + '</div>').slideDown(500).delay(10000).slideUp(500);
                        $('#responseWrapper').append("<div class=\"inner\"><label>"+attempts+". "+textStatus+" - </label>"+jqXHR.responseText+", Execution time: "+(end - start)+" ms</div>");
                        $('#post'+attempts).css("background", "#fef1ec");
                        $('#post'+attempts).css("border", "1px solid #990000");
                        for (var i = 0; i < $.parseJSON(jqXHR.responseText)['fields'].length; i++){
                            $('#'+$.parseJSON(jqXHR.responseText)['fields'][i]).css("background-color", "#fef1ec");
                        }
                      }
                    });
              //  });
        }   

    });

});












app.listen(3000);