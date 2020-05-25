//Declaración de paquetes
const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const { userJoin, getCurrentUser, userLeaves, getRoomUsers } = require('./utils/users');

const app = express();

//Inicialización del servidor.
const server = http.createServer(app);
const io = socketio(server);

//Establecer el directorio raiz del proyecto.
app.use(express.static(path.join(__dirname, 'public')));

//Nombre de usuario para los mensajes del sistema
const SysName = 'ChatIO';

//Establece conexion con el nuevo cliente.
io.on('connection', socket => {

    //Mensaje en la consola del servidor para verificar el inicio de un usuario.
    console.log('Nueva conexion con el servidor.');

    //Evento al unirse un usuario.
    socket.on('joinRoom', ({ username, room }) => {

        //Crea un objetco usuario
        const user = userJoin(socket.id, username, room);

        //Se ingresa el suaurio a la sala elegida
        socket.join(user.room);

        //Mensaje de bienvenida al nuevo usuario.
        socket.emit('message', formatMessage(SysName, '¡Bienvenido a ChatIO!'));

        //Mensaje grupal de bienvenida al usuario.
        socket.broadcast.to(user.room).emit('message', formatMessage(SysName, `${user.username} ha ingresado al chat`));

        //Emite mensajes a los usuarios de las salas.
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        });

        //Mensaje cuando alguien se desconecta del servidor.
        socket.on('disconnect', () => {

            //Envia 
            const user = userLeaves(socket.id);

            if(user){
                //Envia mensaje a todos los de la sala.
                io.to(user.room).emit('message', formatMessage(SysName, `${user.username} ha abandonado el chat`));
            }

            io.to(user.room).emit('roomUsers', {
                room: user.room,
                users: getRoomUsers(user.room)
            });

        });
    });

    // Esta a la escucha cuando se reciba algun mensaje
    socket.on('chatMessage', msg => {

        //Obtenemos los valores de la sesion ya antes establecidos.
        const user = getCurrentUser(socket.id);

        //Muestra en consola el mensaje recibido
        console.log(`Mensaje recibido: ${msg}`);

        //Envia el mensaje a todos en el chat
        io.to(user.room).emit('message', formatMessage(user.username, msg));
    });

});

//Declaración del puerto que usará el servidor.
const PORT = 3000 || process.env.PORT;

//Mensaje final
server.listen(PORT, () => console.log(`Servidor activo en el puerto ${PORT}`));
