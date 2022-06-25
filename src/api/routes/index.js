const express = require('express')
// const { adminJs, router } = require('./adminJs')
const authRouter = require('./auth')
const deviceRouter = require('./device')
const habitatRouter = require('./habitat')

const app = express()

app.use('/auth/', authRouter)
app.use('/device/', deviceRouter)
app.use('/habitat/', habitatRouter)

module.exports = app
