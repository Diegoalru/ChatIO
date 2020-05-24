//Declaración de paquetes
const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();

//Inicialización del servidor.
const server = http.createServer(app);
const io = socketio(server);

//Establecer el directorio raiz del proyecto.
app.use(express.static(path.join(__dirname, 'public')));

//Establece conexion con el nuevo cliente.
io.on('connection', socket => {
    //Mensaje en la consola del servidor para verificar el inicio de un usuario.
    console.log('Nueva conexion con el servidor.');

    //Mensaje de bienvenida al nuevo usuario.
    socket.emit('message', '¡Bienvenido a ChatIO!');

    //Mensaje grupal de bienvenida al usuario.
    socket.broadcast.emit('message', 'Ha ingresado un nuevo usuario al chat');

    //Mensaje cuando alguien se desconecta del servidor.
    socket.on('disconnect', () => {
        io.emit('message', 'Un usuario ha abandonado el chat');
    });

    // Esta a la escucha cuando se reciba algun mensaje
    socket.on('chatMessage', msg => {

        //Muestra en consola el mensaje recibido
        console.log(`Mensaje recibido: ${msg}`);

        //Envia el mensaje a todos en el chat
        io.emit('message', msg);
    });
});

//Declaración del puerto que usará el servidor.
const PORT = 3000 || process.env.PORT;

//Mensaje final
server.listen(PORT, () => console.log(`Servidor activo en el puerto ${PORT}`));
