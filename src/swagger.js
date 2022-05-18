const swaggerAutogen = require('swagger-autogen')()

const spec = {
  host: 'localhost:3000',
  basePath: '/api/',
  info: {
    title: 'Ambient REST API',
    description: 'Backend del proyecto Ambient',
  },
  tags: [
    {
      name: 'Auth',
      description: 'Autentificación y cuentas de usuario',
    },
  ],
}

const outputFile = './src/swagger.json'
const endpointsFiles = ['./src/api/routes/index.js']

module.exports = () => {
  return swaggerAutogen(outputFile, endpointsFiles, spec)
}
