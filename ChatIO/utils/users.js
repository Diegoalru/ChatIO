//Variable que almacena los usuarios de todas las salas.
const users = [];
const usersOnline = [];

//Ingresar un usuario a la sala.
function userJoin(id, username, room) {

    //Crea el objeto que contiene todos los valores de la sesión.
    const user = { id, username, room };

    //Ingresa el usuario al la lista.
    users.push(user);

    //Retorna el usuario creado
    return user;
}

//Obtiene los valores del usuario actual
function getCurrentUser(id) {

    //Se retorna los valores del suaurio según su Id
    return users.find(user => user.id === id);
}

//Elmina la sesion de un usuario
function userLeaves(id) {

    //Se realiza la consulta del usuario en la lista
    const userId = users.findIndex(user => user.id === id);

    //
    if (userId !== -1) {
        return users.splice(userId, 1)[0];
    }
}

//Obtener usuarios de una sala.
function getRoomUsers(room) {

    //Retorna los usuarios que existan en la sala seleccionada.
    return users.filter(user => user.room === room);
}

function Register(username, email, password, passwordConfirmation) {
    if (ValidatePasswords(password, passwordConfirmation)) {
        if (!ExisteEmail(email)) {
            if (!ExisteUsername(username)) {
                const user = { username, email, password };
                users.push(user);
                return 0;
            } else {
                return -3;
            }
        } else {
            return -2;
        }
    } else {
        return -1;
    }
}

function ValidatePasswords(psw1, psw2) {
    if (psw1 !== psw2)
        return false;
    return true;
}

function ExisteEmail(email) {
    const userIndex = users.findIndex(user => user.email === email);
    if (userIndex !== -1)
        return true;
    return false;
}

function ExisteUsername(username) {
    const userIndex = users.findIndex(user => user.username === username);
    if (userIndex !== -1)
        return true;
    return false;
}

function Login(socket, username, password) {
    const userIndex = users.findIndex(user => user.username === username);
    if (userIndex !== -1) {
        result = ValidateCredentials(users[userIndex], username, password);
        if (result === 0) {
            const user = { socket, username };
            usersOnline.push(user);
            return 0;
        } else {
            return result;
        }
    } else {
        return null;
    }
}

function ValidateCredentials(user, username, psw) {
    if (user.username === username) {
        if (user.password === psw) {
            return 0;
        } else {
            return -2;
        }
    } else {
        return -1;
    }
}

//Esta funcion es para eliminar la sesion.
function DeleteSession(socket) {
    const userIndex = users.findIndex(user => user.socket === socket);
    if (userIndex !== -1) {
        return users.splice(userIndex);
    }
}


module.exports = {
    Register
    , Login
    , userJoin
    , getCurrentUser
    , userLeaves
    , getRoomUsers
};