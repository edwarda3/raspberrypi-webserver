var socket = io();


$('#userInfoSubmit').bind('click',function(){
    var username = $('#usernameInput').val();
    var password = $('#passwordInput').val();
    socket.emit('authenticate',{'username':username,'password':password});
});

var loggeduser = null;
socket.emit('getLoggedStatus');
socket.on('loggedUserStatus',function(data){
    isLogged(data);
});
socket.on('authenticationSuccess',function(data){
    isLogged(data);
});
    
function isLogged(loggedusername){
    //Remove sign up and log in and replace with logout button
    loggeduser = loggedusername;

    $('#usernameInput').remove();
    $('#passwordInput').remove();
    $('#userInfoSubmit').remove();
    $('main').prepend( $('<a/>',{text:"Log Out",href:"/logout"}) );
    $('main').prepend( $('<p/>').text("Logged in as "+loggedusername) );
 }
