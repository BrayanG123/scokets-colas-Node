
// comando para establecer la conexion
var socket = io();

var label = $('#lblNuevoTicket');//en jquery se recomienda hacer una referencia a un elemento html si lo usaremos muchas veces


socket.on('connect', function(){
    console.log('Conectado al SERVIDOR');
});
socket.on('disconnect', function(){
    console.log('Desconectado del SERVIDOR');
});

socket.on('estadoActual', function(resp){
    label.text(resp.actual);
    // console.log(resp);
});


// Esto es jquery: Investigar que es y ver si es importante
$('button').on('click', function(){

    socket.emit('siguienteTicket', null, function(resp) {
        console.log(resp);
        label.text(resp);
    })
});