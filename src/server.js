require('dotenv-safe').config()
const express = require('express')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')

const autogen = require('./swagger')
const apiRouter = require('./api/routes')
const mongoose = require('mongoose')

/* ---------------------------------------------------------------------------------------------- */
const mongoDB = process.env.MONGO_DB
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const app = express()
app.use(express.json())
app.use(cors())

/* ------------------------------------------- Routes ------------------------------------------- */
app.use('/api/', apiRouter)

/* --------------------------------------- Swagger Autogen -------------------------------------- */
autogen().then(() => {
  const swaggerDocument = require('./swagger.json')
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
})
/* ---------------------------------------------------------------------------------------------- */

listen()

function listen() {
  const port = process.env.PORT || 3000
  app.listen(port)
  console.log(`Express app started on port ${port}`)
}
