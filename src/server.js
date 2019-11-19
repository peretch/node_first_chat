// Libreria nativa de node para HTTP
const http      = require('http');
const express   = require('express');
const io        = require('sopcket.io');

const expressApp    = express();
const httpServer    = http.createServer(expressApp);
const webSocketServer   = io(httpServer);

const clients = {};


webSocketServer.on('connection', (socket) => {
    // Cada socket de conexion tiene un id unico que lo identifica.
    // Este id lo podemos utilizar para garantizar que se trata de una misma conexion

    socket.on('username', (payload) => {
        // Asigna lo que llegó en el evento username a la variable clients
        // socket io, nos brinda un id para cada socket
        clients[socket.id] = payload;
    });

    socket.on('message', (payload) => {
        socket.broadcast.emit('message', `[${clients[socket.id]}]: ${payload}`)
    });

    socket.on('close', () => {
        delete clients[socket.id]
    });
});

// Inicio servidor
httpServer.listen(3000, () => {

});










// expressApp.get('/', (req, res) => {

// });

