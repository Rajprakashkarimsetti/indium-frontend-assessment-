// src/models/users.js

const users = []; // Example in-memory storage

function findUserByUsername(username) {
    return users.find(user => user.username === username);
}

function createUser(user) {
    users.push(user);
    return user;
}

module.exports = {
    findUserByUsername,
    createUser,
};
