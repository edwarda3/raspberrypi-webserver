var total_num_buttons = 10;
var i;
for(i=0; i<total_num_buttons; i++){
    $('main').append( $('<button/>').attr('id','button'+i) );
}

$('#button0').text('Testing Button 0').click(function(){
    socket.emit('button0');
});



socket.on('pythonres',function(data){
    console.log(data);
});
