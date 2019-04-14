var total_num_buttons = 10;
var i;
for(i=0; i<total_num_buttons; i++){
    var input1 = $('<input class="buttonInput" type="number"/>');
    var input2 = $('<input class="buttonInput" type="number"/>');
    var input3 = $('<input class="buttonInput" type="number"/>');
    var button = $('<button/>').attr('id','button'+i).text('Button '+i);
    var buttonSection = $('<div/>').addClass('blockSection actionButtonSection');
    buttonSection.append(input1,input2,input3,button);
    $('main').append(buttonSection);
}


//Button 0 execution -> SUM OF (NUMS TO PI POWER)
$('#button0').text('Sum Of Inputs to PI Power').click(function(){
    var parentDiv = $(this).parent();
    parentDiv.find('.failedExecMsg').remove();
    parentDiv.find('.pyResult').remove();
    var intData = [];
    var inputs = parentDiv.find('.buttonInput');
    var valid = true;
    inputs.each(function(index){
        var inputdata = $(this).val();
        if(isNaN(inputdata) || inputdata > 255 || inputdata < 0){
            valid = false;
            return false;
        }
        else
            intData.push(inputdata);
    });
    if(valid){
        console.log(intData);
        socket.emit('button0',intData);
    } else
        parentDiv.append( $('<p/>').addClass('failedExecMsg').text('Inputs must be between (0,255)') );
});
socket.on('sumToPiPower',function(data){
    $('#button0').parent().append( $('<p/>').addClass('pyResult').text('Sum of values to PI power: '+data) );
});


//Button 1 execution -> PLAYBACK RANDOM SONG
$('#button1').text('Playback random song').click(function(){
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
    $('#button1').parent().append( $('<p/>').addClass('pbStatus').text(pbstatus),$('<br>') );
});
socket.on('playbackProgress',function(progress){
    console.log(progress);
    var progressfield = $('#button1').parent().find('.pbProgress')
    if(progressfield.length==0)
        $('#button1').parent().append( $('<p/>').addClass('pbProgress').text(progress) );
    else
        progressfield.text(progress)
});
socket.on('playbackEnd',function(){
    console.log('playback ended.');
});


socket.on('pythonres',function(data){
    console.log(data);
});
