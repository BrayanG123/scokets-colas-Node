const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control'); 

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    client.on('siguienteTicket', ( data, callback ) => {
        let ticket = ticketControl.siguiente();
        console.log(`El sgte Ticket es: ${ticket}`);
        callback(ticket);
    });
    
    
    client.emit('estadoActual', { //para actualizar la pantalla publica tras reinicio (refresh) de la pagina
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    } );


    client.on('atenderTicket', (data, callback) => {
        if ( !data.escritorio ){
            return callback({
                err: true,
                mensaje: 'El escritorio es necesario'
            })
        }

        let atenderTicket = ticketControl.atenderTicket( data.escritorio );

        callback(atenderTicket);

        // actualizar/notificar cambios en los ultimos 4
        client.broadcast.emit('ultimos4', { //emitir 'ultimos4'
            ultimos4: ticketControl.getUltimos4()
        });
    });


});