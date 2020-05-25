//Variable que contiene el formulario de los mensajes.
const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

//Obtener el nombre de usuario desde la Url (metodo get del form)
const {username, room} = Qs.parse(location.search, {
    //Ignora los signos de ? y & de la Url
    ignoreQueryPrefix: true
});

//Muestra en consola el nombre de usuario y sala a la que entro
console.log(username, room);

//Conexion con el servidor
const socket = io();

//Envia el nombre de usuario y sala al servidor.
socket.emit('joinRoom', {username, room});

//Muestra la informacion de las salas.
socket.on('roomUsers', ({room, users}) => {
    outputRoomName(room);
    outputUsers(users);
});


//Metodo que recibe los mensajes del servidor.
socket.on('message', message => {
    //Muestra el registro del mensaje recibido.
    console.log(message);

    //Muestra el mensaje recibido.
    outputMessage(message);

    //Se realiza un focus al nuevo mensaje.
    chatMessages.scrollTop = chatMessages.scrollHeight;

});

//Mensaje a la hora de enviar datos al servidor.
chatForm.addEventListener('submit', (e) => {

    //TODO: Buscar documentacion del siguiente metodo.
    e.preventDefault();

    //Obtiene el mensaje del usuario
    const msg = e.target.elements.msg.value;

    //Muestra en consola el mensaje enviado
    console.log(`Mensaje: ${msg}`);

    //Envia el mensaje al servidor.
    socket.emit('chatMessage',msg);

    //Limpiar mensaje.
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
     
});

//Metodo que muestra en mensaje en la pantalla.
function outputMessage(message){

    //Crea un nuevo div que contendrá el mensaje.
    const div =  document.createElement('div');

    //Se le agrega la propiedad del tipo de clase al que pertenece.
    div.classList.add('message');

    //Se crea el objeto.
    div.innerHTML = `
    <p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">
        ${message.text}
    </p>`;

    //Se adjunta a la lista de mensajes.
    document.querySelector('.chat-messages').appendChild(div);
}

//Establece el nombre de la sala
function outputRoomName(room){

    //Asignacion del nombre de la sala.
    roomName.innerText = room;
}

function outputUsers(users){
    userList.innerHTML = 
    `${users.map(user => `<li>${user.username}</li>`).join('')}`;
}
