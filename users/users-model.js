
const data = require('../data/db-config')

module.exports = {
    getUsers,
    registerUser,
    login
}

function getUsers() {
    return data('users')
    .select('*')

}

function registerUser(userData) {
    return data('users')
    .insert(userData)
}

function login(userName){
    return data('users')
    .where(userName)

}