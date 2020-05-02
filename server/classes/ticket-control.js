
const fs = require('fs'); 


class Ticket { //no hace falta exportarla porque solamente la usaremos internamente

    constructor( numero, escritorio ){
        this.numero = numero;
        this.escritorio = escritorio;

    }
}

class TicketControl {

    constructor(){

        this.ultimo = 0;    //para saber el ultimo ticket
        this.hoy = new Date().getDate(); //para saber la fecha de hoy LOL
        this.tickets = []; //para los tickets pendientes
        this.ultimos4 = [];
        /*grabaremos estos datos en un txt para recuperar los datos en caso de interrupciones al
         funcionamiento como apagones o desconexion con el servidor, pero lo IDEAL seria grabar
         esto en un BD*/
        

        let data = require('../data/data.json'); //leyendo el archivo json

        if (this.hoy === data.hoy){

            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;

        }else{

            this.reiniciarConteo();
        }
    
        // console.log(data);
    }

    siguiente() { //para el sgte Ticket
        
        this.ultimo += 1;
        
        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);

        this.grabarArchivo();

        return `Ticket: ${this.ultimo}`;
    }

    getUltimoTicket(){
        return `Ticket: ${this.ultimo}`;
    }

    getUltimos4(){
        return this.ultimos4;
    }

    atenderTicket( escritorio ){

        if ( this.tickets.length === 0 ){
            return 'No hay tickets para atender';
        }

        let numeroTicket = this.tickets[0].numero;
        this.tickets.shift(); //Remueve el 1er elemento

        let atenderTicket = new Ticket(numeroTicket, escritorio);

        //para agregar al inicio es unshift
        this.ultimos4.unshift(atenderTicket);

        if ( this.ultimos4.length > 4 ){
            this.ultimos4.splice(-1,1); //esto borra el ultimo
        }
        
        console.log('Ultimos 4');
        console.log(this.ultimos4);

        this.grabarArchivo();

        return atenderTicket;
    }

    reiniciarConteo(){

        this.ultimo = 0;
        this.tickets = [];
        this.ultimos4 = [];

        console.log('Se ha inicializado el Sistema');
        this.grabarArchivo();

    }

    grabarArchivo(){ //para grabar en el json
        let jsonData = {
            ultimo  : this.ultimo,
            hoy     : this.hoy,
            tickets : this.tickets,
            ultimos4: this.ultimos4
        };

        let jsonDataString = JSON.stringify(jsonData);

        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }

}


module.exports = {
    TicketControl
}