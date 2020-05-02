var socket = io();

var searchParams = new URLSearchParams( window.location.search );

if (! searchParams.has('escritorio') ){
    window.location = 'index.html'; //para salir de la pantalla si no hay el escritorio
    throw new Error('El escritorio es necesario');
}


//en este punto quiere decir que viene informacion sobre el escritorio
var escritorio = searchParams.get('escritorio');
var label = $('small');

console.log(escritorio);
$('h1').text('Escritorio ' + escritorio);

$('button').on('click ', function() {

    socket.emit('atenderTicket', {escritorio: escritorio}, function(resp) {
        
        console.log(resp);

        if ( resp === 'No hay tickets para atender'){//el texto viene de la function atenderTicket de ticket-contrl
            label.text(resp)
            alert(resp);
            return;
        }

        label.text('Ticket: ' + resp.numero);
    
    })

});

