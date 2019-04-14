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
        //var pyScript = './node-py-scripts/button0.py';
        var pyScript = './button0.py';
        console.log('Using '+pyScript);
        var spawn = require('child_process').spawn,
            py = spawn('python',[pyScript]);

        py.stdout.on('data',function(data){
            console.log(data.toString());
        });
    }
}
