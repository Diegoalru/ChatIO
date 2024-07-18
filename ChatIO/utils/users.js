//Variable que almacena los usuarios de todas las salas.
const users = [];
const usersOnline = [];

//Ingresar un usuario a la sala.
function userJoin(id, username, room) {
    const user = { id, username, room };
    users.push(user);
    return user;
}

function getCurrentUser(id) {
    return users.find(user => user.id === id);
}

function userLeaves(id) {
    const userId = users.findIndex(user => user.id === id);

    if (userId !== -1) {
        return users.splice(userId, 1)[0];
    }
}

function getRoomUsers(room) {
    return users.filter(user => user.room === room);
}

function Register(username, email, password, passwordConfirmation) {
    if (password !== passwordConfirmation) {
        return -1;
    }

    if (ExisteEmail(email)) {
        return -2;
    }

    if (ExisteUsername(username)) {
        return -3;
    }

    const user = { username, email, password };
    users.push(user);
    return 0;
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

export {
    Register,
    Login,
    userJoin,
    getCurrentUser,
    userLeaves,
    getRoomUsers
};