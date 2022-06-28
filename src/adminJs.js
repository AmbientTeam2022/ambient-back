/**
 * Módulo de AdminJS y MongoDB
 *
 * Genera la conexión a la base de datos MongoDB utilizando la librería ODM Mongoose,
 * y también configura y levanta el panel de admin usando la librería AdminJS.
 *
 * @module adminJs
 */

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

/**
 * Opciones de MongoDB
 */
const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

/**
 * Opciones de AdminJS
 */
const adminJsOptions = {
  rootPath: '/admin',
  branding: {
    companyName: 'Ambient',
    logo: '/img/logo.png',
    softwareBrothers: false,
  },
}

/**
 * Conecta a MongoDB y genera la ruta al panel de admin
 *
 * Crea la conexión a MongoDB usando la ruta almacenada en una variable de entorno.
 * Luego genera la instancia de AdminJS usando su conector de Mongoose.
 * Finalmente crea el objeto router de AdminJS para acoplarlo a la app.
 *
 * @returns Instancia de Express para ser acoplada a la app principal
 */
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
