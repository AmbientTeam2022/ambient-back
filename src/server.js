/**
 * Módulo principal de la aplicación
 *
 * Punto de entrada de la aplicación que levanta el servidor.
 * Aplica opciones de configuración, acopla las otras partes de la
 * app Express, e inicia el servicio en el puerto indicado.
 *
 * @module server
 */

require('dotenv-safe').config()
const express = require('express')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')

const autogen = require('./swagger')
const apiRouter = require('./api/routes')
const getAdminJs = require('./adminJs')

/* ---------------------------------------------------------------------------------------------- */
const app = express()
app.use(express.json())
app.use(express.static('public'))
app.use(express.static('docs'))

const origin =
  process.env.NODE_ENV === 'dev'
    ? 'http://localhost:8080'
    : process.env.FRONT_URL

/**
 * Habilita CORS (Cross-Origin Resource Sharing) indicando cuáles son
 * las direcciones de confianza desde donde se originarán las solicitudes.
 * Cualquier solicitud proveniente de otras direcciones IP serán rechazadas.
 * Esto solo aplica a los endpoints de la API, y pueden añadirse excepciones.
 *
 * @name enableCors
 * @method
 */
app.use(
  cors({
    credentials: true,
    origin,
  }),
)

app.use('/api/', apiRouter)

/* --------------------------------------- Swagger Autogen -------------------------------------- */
console.log('Generando Swagger UI...')

/**
 * Invoca la librería que autogenera la documentación de la API (Swagger/OpenAPI). Posteriormente
 * genera la ruta que lleva a la documentación y la acopla a la aplicación.
 * @name autogenCallback
 * @method
 */
autogen().then(() => {
  const swaggerDocument = require('./swagger.json')
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
})
/* ---------------------------------------------------------------------------------------------- */

// Auto inserción de datos default
// const Category = require('./api/models/category')
// async function initialData() {
//   for (const cat of categories) {
//     const data = await Category.find({ name: cat.name }).exec()
//     if (data.length !== 0) return

//     const category = new Category(cat)
//     await category.save()
//   }
// }
//
// initialData()

/* ---------------------------------------------------------------------------------------------- */
start()

/**
 * Inicia la aplicación
 *
 * Llama a generar el panel de admin y conectar a la base de datos.
 * Una vez finalizado comienza a escuchar en el puerto indicado, o en el
 * 3000 si no se indicó ningún puerto.
 */
async function start() {
  console.log('Configurando panel AdminJS...')
  const adminJs = await getAdminJs()
  app.use(adminJs)

  const port = process.env.PORT || 3000
  app.listen(port)
  console.log(`App Express iniciada en puerto ${port}`)
}
