/**
 * @module allowCors
 * @category middleware
 */

/**
 * Permite a esta ruta ignorar la restricción de CORS
 *
 * Modifica la cabecera de la solicitud, agregándole las cabeceras necesarias
 * para que parezca que viene del origen que corresponde. Permitiendo así que
 * pase el filtro de CORS (Cross-Origin Resource Sharing).
 * @param {Object} req Solicitud
 * @param {Object} res Respuesta
 * @param {Function} next Siguiente middleware o controller
 */
const allowCors = function (req, res, next) {
  const origin =
    process.env.NODE_ENV === 'dev'
      ? 'http://localhost:8080'
      : process.env.FRONT_URL

  res.header('Access-Control-Allow-Origin', origin)
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  )
  next()
}

module.exports = { allowCors }
