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

const origin =
  process.env.NODE_ENV === 'dev'
    ? 'http://localhost:8080'
    : process.env.FRONT_URL
app.use(
  cors({
    credentials: true,
    origin,
  }),
)

/* ------------------------------------------- Routes ------------------------------------------- */
app.use('/api/', apiRouter)

/* --------------------------------------- Swagger Autogen -------------------------------------- */
autogen().then(() => {
  const swaggerDocument = require('./swagger.json')
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
})
/* ---------------------------------------------------------------------------------------------- */

// Crear categorías aquí
// const categories = [
//   {
//     name: 'Acuario',
//     icon: '00',
//     params: [
//       { name: 'temperature', min: 0, max: 0 },
//       { name: 'waterLevel', min: 0, max: 0 },
//     ],
//   },
//   {
//     name: 'Insectario',
//     icon: '00',
//     params: [
//       { name: 'temperature', min: 21, max: 24 },
//       { name: 'humidity', min: 0, max: 50 },
//     ],
//   },
//   {
//     name: 'Terrario Reptiles',
//     icon: '00',
//   },
//   {
//     name: 'Terrario Anfibios',
//     icon: '00',
//     params: [
//       { name: 'Temperatura', min: 0, max: 0 },
//       { name: 'Humedad', min: 0, max: 0 },
//     ],
//   },
// ]

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

start()

async function start() {
  const adminJs = await getAdminJs()
  app.use(adminJs)

  const port = process.env.PORT || 3000
  app.listen(port)
  console.log(`Express app started on port ${port}`)
}
