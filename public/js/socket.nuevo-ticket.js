// Comand para establecer la conexion
var socket = io();

var label = $('#lblNuevoTicket');

socket.on('connect', function() {
    console.log('Conexion establecida con el servidor');
});

socket.on('disconnet', function() {
    console.log('Conexion perdida con el servidor');
});

socket.on('estadoActual', function(res) {
    label.text(res.actual);
})

$('button').on('click', function() {

    socket.emit('siguienteTicket', null, function(siguienteTicket) {
        label.text(siguienteTicket);
    });

})