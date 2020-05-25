//Variable que almacena los usuarios de todas las salas.
const users = [];

//Ingresar un usuario a la sala.
function userJoin(id, username, room){
    
    /**
     * TODO: Crear metodo que se encargue de validar si el nombre de usuario ya existe.
     */

    //Crea el objeto que contiene todos los valores de la sesión.
    const user = {id, username, room};

    //Ingresa el usuario al la lista.
    users.push(user);

    //Retorna el usuario creado
    return user;
}

//Obtiene los valores del usuario actual
function getCurrentUser(id){
    
    //Se retorna los valores del suaurio según su Id
    return users.find(user => user.id === id);
}

//Elmina la sesion de un usuario
function userLeaves(id){
    
    //Se realiza la consulta del usuario en la lista
    const userId = users.findIndex(user => user.id === id);

    //En caso de que no exista
    if(userId !== -1){
        return users.splice(userId, 1)[0];
    }
}

//Obtener usuarios de una sala.
function getRoomUsers(room){

    //Retorna los usuarios que existan en la sala seleccionada.
    return users.filter(user => user.room === room);
}

module.exports = {
    userJoin
    ,getCurrentUser
    ,userLeaves
    ,getRoomUsers
};