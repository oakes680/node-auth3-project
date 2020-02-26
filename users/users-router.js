
const express = require('express')
const UsersModel = require('./users-model')
const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../config/secrets')
const restricted = require('../auth/restricted-mw')
const checkDept = require('../auth/check-role')

const router = express()
const bcrypt = require('bcryptjs')
router.use(express.json())


router.get('/users', restricted, checkDept('it'), (req, res) => {
    UsersModel.getUsers()
    .then(user => {
        res.status(200).json(user)
    })
    .catch(err => {
        res.status(500).json({message: 'there was an issue retrieving users'})
    })
})


router.post('/register',  (req, res) => {
    const data = req.body
    const hash = bcrypt.hashSync(data.password, 12)
    data.password = hash

    UsersModel.registerUser(data)
    
    .then(user => {
        res.status(200).json(user)
    })
    .catch(err => {
        res.status(500).json({message: 'error registering new user'})
    })
})


router.post('/login', (req, res) => {
    const{username, password} = req.body
    UsersModel.login({username})
    .first()
    .then(user => {
        if(user && bcrypt.compareSync(password, user.password)) {
            const token = signToken(user)  // generates  a token 

            res.status(200).json({ token })
        } else {
            res.status(401).json({message: 'invalid creds'})
        }
    })
    .catch(err => {
        res.status(500).json({message: 'error'})
    })
    
})




function signToken(user){
    const payload = {
        userId: user.id,
        username: user.username,
        department: user.department
    };

    const options = {
        expiresIn:'1d'
    }

    return jwt.sign(payload, jwtSecret, options)
}


module.exports = router