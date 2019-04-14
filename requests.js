module.exports = {
    authenticate : function(socket,userdata){
        var validUserData = require('./users.json');
        validUserData.forEach(function(validUser){
            if(validUser.username == userdata.username.toLowerCase() && validUser.password == userdata.password){
                socket.handshake.session.username = validUser.username;
                socket.handshake.session.save();
                socket.emit('authenticationSuccess',validUser.username);
            }
        });
        socket.emit('authenticationFailed');
    },
    loggedStatus : function(socket){
        var username = socket.handshake.session.username;
        if(username!=null)
            socket.emit('loggedUserStatus',username);
    },
    button0 : function(socket){
        var spawn = require('child_process').spawn;
        var scriptFolder = require('os').homedir()+'/node-py-scripts';
        console.log("Looking at threads in "+scriptFolder);
        var pyProc = spawn('python',[scriptFolder+'/button0.py']);

        pyProc.stdout.on('data',(data) => {
            socket.emit('pythonres',data);
        });
    }
}
