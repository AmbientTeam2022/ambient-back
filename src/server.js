// Imports
require('dotenv-safe').config()
const express = require('express')

const port = process.env.PORT || 3000

const app = express()

listen()

function listen() {
  app.listen(port)
  console.log(`Express app started on port ${port}`)
}
