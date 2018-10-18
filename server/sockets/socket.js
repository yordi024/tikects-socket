const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    client.on('siguienteTicket', (data, callback) => {

        let siguiente = ticketControl.siguiente();
        console.log(siguiente);
        callback(siguiente);
    });

    // Emitir un evento 'estadoActual'
    let ticketActual = {
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4Tickets()
    }
    client.emit('estadoActual', ticketActual);

    client.on('atenderTicket', (data, callback) => {
        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'El escritorio es necesario'
            })
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);

        callback(atenderTicket);

        // actualizar/ notificar cambios en los ULTIMOS 4
        // emitir ultimos4
        client.broadcast.emit('ultimos4', ticketActual.ultimos4);

    });

});