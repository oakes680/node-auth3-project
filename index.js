const express = require('express')
const userRouter = require('./users/users-router')
const server = express()

server.use(express.json())

server.use('/api', userRouter)

const port = 1983

server.listen(port, () => {
    console.log(`you are on ${port}`)
})