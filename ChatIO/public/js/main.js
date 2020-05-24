const chatForm = document.getElementById('chat-form');

//Conexion con el servidor
const socket = io();

//Metodo que recibe los mensajes del servidor.
socket.on('message', message => {
    //Muestra el registro del mensaje recibido.
    console.log(message);

    //Muestra el mensaje.
    outputMessage(message);
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
     
});

//Metodo que muestra en mensaje en la pantalla.
function outputMessage(message){
    const div =  document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `
    <p class="meta">USER <span>TIME</span></p>
    <p class="text">
        ${message}
    </p>`;
    document.querySelector('.chat-messages').appendChild(div);
}
