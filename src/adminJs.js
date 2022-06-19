const express = require('express')
const mongoose = require('mongoose')
const AdminJS = require('adminjs')
const AdminJSExpress = require('@adminjs/express')
const AdminJSMongoose = require('@adminjs/mongoose')
require('./api/models/category')
require('./api/models/device')
require('./api/models/folder')
require('./api/models/habitat')
require('./api/models/location')
require('./api/models/organization')
require('./api/models/role')
require('./api/models/user')

const app = express()

const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

const adminJsOptions = {
  rootPath: '/admin',
  branding: {
    companyName: 'Ambient',
    logo: '/img/logo.png',
    softwareBrothers: false,
  },
}

async function getAdminJs() {
  const mongoDB = process.env.MONGO_DB
  const conn = await mongoose.connect(mongoDB, mongoOptions)
  const db = mongoose.connection
  db.on('error', console.error.bind(console, 'MongoDB connection error:'))

  AdminJS.registerAdapter(AdminJSMongoose)
  const adminJs = new AdminJS({ ...adminJsOptions, databases: [conn] })

  const router = AdminJSExpress.buildRouter(adminJs)
  app.use(adminJs.options.rootPath, router)
  return app
}

module.exports = getAdminJs
