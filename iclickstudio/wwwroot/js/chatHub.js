///////////////////////////////////////////////////
//// Connection to Chat-hub was established here////
///////////////////////////////////////////////////
'use strict';

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();
///////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////
//// CHAT USING SIGNALR. THE CONNECTION AND SEND MESSAGE FUNCTION IS WRIITEN HERE////
////                START                                                       ////
////////////////////////////////////////////////////////////////////////////////////
connection.start().then(function () {
    console.log("Connection established!");
}).catch(function (err) {
    return console.error(err.toString());
});
var loggedInUser = "";
$(document).ready(function () {
    debugger;
    getAndSaveUserId();
});

function getAndSaveUserId() {
    debugger;
    if (loggedInUser == "") {
        $.ajax({
            type: 'Get',
            url: '/Chat/GetLoggedInUser',
            dataType: 'Json',
            success: function (result) {
                if (!result.isError) {
                    debugger;
                    localStorage.setItem("LoggedInUser", result);
                    loggedInUser = localStorage.getItem("LoggedInUser");
                }
            },
            Error: function (ex) {
                errorAlert(ex);
            }
        });
    }
}
connection.on("ReceiveMessages", function (senderId, message, receiverId, date, currentUserId) {
    var msg = "";
    if (loggedInUser != "") {
        debugger;
        if (loggedInUser == senderId) {
            msg = "<div class='chat chat-right'><div class='chat-body'><div class='chat-bubble'><div class='chat-content'>" +
                "<p>" + message + "</p>" +
                "<span class='chat-time'>" + date + "</span></div></div></div></div>"
        }
        else {
            msg = "<div class='chat chat-left'><div class='chat-body'><div class='chat-bubble'><div class='chat-content'>" +
                "<p>" + message + "</p>" +
                "<span class='chat-time'>" + date + "</span></div></div></div></div>"
        }
        $("#chatMessages").append(msg);
    } else {
       getAndSaveUserId();
        if (loggedInUser == senderId) {
            msg = "<div class='chat chat-right'><div class='chat-body'><div class='chat-bubble'><div class='chat-content'>" +
                "<p>" + message + "</p>" +
                "<span class='chat-time'>" + date + "</span></div></div></div></div>"
        }
        else {
            msg = "<div class='chat chat-left'><div class='chat-body'><div class='chat-bubble'><div class='chat-content'>" +
                "<p>" + message + "</p>" +
                "<span class='chat-time'>" + date + "</span></div></div></div></div>"
        }
        $("#chatMessages").append(msg);
    }
    
});

function chatUser() {
    var chatMessages = {};
    chatMessages.SenderId = $("#senderId").val();
    chatMessages.Name = $("#message").val();
    chatMessages.ReceiverId = $("#receiverId").val();
    $.ajax({
        type: 'POST',
        url: '/Chat/ChatUser',
        dataType: 'Json',
        data:
        {
            messageDetails: JSON.stringify(chatMessages)
        },
        success: function (result) {
            if (!result.isError) {

                document.getElementById("message").value = "";
                connection.invoke("SendMessage", result.data.senderId, result.data.name, result.data.receiverId, result.data.dateSent, result.data.currentUserId).catch(function (err) {

                }).catch(function (err) {
                    return console.error(err.toString());
                });
            }
            else {
                errorAlert(result.msg);
            }
        },
        Error: function (ex) {
            errorAlert(ex);
        }
    });
}
//////////////////////////////////////////////////////////////////////////////////////
//// CHAT USING SIGNALR. THE CONNECTION AND SEND MESSAGE FUNCTION IS WRIITEN HERE////
////            END                                                             ////
////////////////////////////////////////////////////////////////////////////////////