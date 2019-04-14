var fs = require('fs');
var express = require('express');
var requests = require('./requests.js');

var app = require('express')(),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    session = require('express-session')({
        secret: 'randomsecret1234',
        resave: true,
        saveUninitialized: true
    }),
    sharedsession = require('express-socket.io-session');
app.use(session);
io.use(sharedsession(session,{
        autoSave:true
}));


const server_port = 15421;
http.listen(server_port, function(){
    console.log("server running on port " + this.address().port);
});

app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/index.html' );
});
app.get('/testing', function(req, res){
    res.sendFile(__dirname + '/public/testing.html' );
});
app.get('/logout',function(req,res){
    req.session.destroy();
    res.redirect('/');
});
app.use(express.static('public'));

var songStatus = {'isPlaying':false};

io.on('connection',function(socket){
    socket.on('getLoggedStatus',function(){
        requests.loggedStatus(socket);
    });
    socket.on('authenticate',function(userinfo){
        requests.authenticate(socket,userinfo);
    });
    socket.on('button0',function(input){
        requests.button0(socket,input);
    });
    socket.on('playRandomSong',function(input){
        requests.playRandomSong(socket,songStatus);
    });
});
