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
    button0 : function(socket,input){
        var pyScript = 'node-py-scripts/button0.py';
        var spawn = require('child_process').spawn,
            py = spawn('python3',[pyScript,input]);
        var sum = 0.0;

        //Read on stdout flushes
        py.stdout.on('data',function(data){
            var humandata = data.toString();
            console.log(humandata);
            sum = parseFloat(humandata);
            socket.emit('pythonres',humandata);
        });
        //Exec when program finishes execution.
        py.stdout.on('end',function(){
            console.log('Button 0 execution ENDED.');
            socket.emit('sumToPiPower',sum);
        });
        //Errors to help debug
        py.stderr.on('data',function(data){
            var humandata = data.toString();
            console.log('stderr: '+humandata);
        });
    },
    playRandomSong : function(socket,songStatus){
        var pyScript = 'node-py-scripts/playRandomSong.py';
        if(songStatus.isPlaying){
            console.log('Was playing... Killing and playing new');
            songStatus.py.kill('SIGINT');
        }
        var spawn = require('child_process').spawn;
        songStatus['py'] = spawn('python3',[pyScript,'node-py-scripts/']);
        songStatus.isPlaying = true;
        
        songStatus.py.stdout.on('data',function(data){
            var humandata = data.toString();
            if(humandata.startsWith('S:'))
                socket.emit('playbackStatus',humandata.substring(2))
            else
                socket.emit('playbackProgress',humandata.substring(2));
        });
        songStatus.py.stdout.on('end',function(){
            console.log('Playback ENDED.');
            songStatus.isPlaying=false;
            socket.emit('playbackEnd');
        });
        //Errors to help debug
        songStatus.py.stderr.on('data',function(data){
            var humandata = data.toString();
            console.log('stderr: '+humandata);
        });
    }
}
