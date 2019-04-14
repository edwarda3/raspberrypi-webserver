var playbutton = $('<button/>').attr('id','play').text('PLAY');
var repeatbutton = $('<button/>').attr('id','repeat').text('Repeat OFF');
$('main').append(playbutton)
$('main').append(repeatbutton)

var repeat = false;

//Button 1 execution -> PLAYBACK RANDOM SONG
playbutton.click(function(){
    socket.emit('playRandomSong');
    var parentDiv = $(this).parent();
    parentDiv.find('.pbStatus').remove();
    parentDiv.find('.pbProgress').remove();
});
socket.on('errorSongInProgress',function(){
    console.log('Error starting playback, song in progress');
});
socket.on('playbackStatus',function(pbstatus){
    console.log(pbstatus);
    $('main').append( $('<p/>').addClass('pbStatus').text(pbstatus),$('<br>') );
});
socket.on('playbackProgress',function(progress){
    console.log(progress);
    var progressfield = $('main').find('.pbProgress')
    if(progressfield.length==0)
        $('main').append( $('<p/>').addClass('pbProgress').text(progress) );
    else
        progressfield.text(progress)
});
socket.on('playbackEnd',function(){
    console.log('playback ended.');
    if(repeat)
        socket.emit('playRandomSong');
});

repeatbutton.click(function(){
    repeat = !repeat;
    if(repeat)
        $(this).text('Repeat ON');
    else
        $(this).text('Repeat OFF');
});




socket.on('pythonres',function(data){
    console.log(data);
});
