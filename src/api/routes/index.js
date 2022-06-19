const express = require('express')
// const { adminJs, router } = require('./adminJs')
const authRouter = require('./auth')
const deviceRouter = require('./device')

const app = express()

app.use('/auth/', authRouter)
app.use('/device/', deviceRouter)

module.exports = app
