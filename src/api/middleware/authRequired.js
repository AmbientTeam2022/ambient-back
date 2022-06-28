/**
 * @module authRequired
 * @category middleware
 */

const jwt = require('jsonwebtoken')

/**
 * Exige autorización en esta ruta
 *
 * Verifica que la ruta venga con un Token de autorización JWT (_Bearer Token_).
 * El Token debe venir en la cabezera `Authorization` de la solicitud.
 *
 * Si no se envía un Token, es inválido o ha expirado, devuelve un mensaje de error.
 * Caso contrario agrega a la solicitud los datos del usuario encriptados en el Token,
 * para luego continuar con la ruta.
 * @param {Object} req Solicitud
 * @param {Object} res Respuesta
 * @param {Function} next Siguiente middleware o controller
 */
function authRequired(req, res, next) {
  const authHeader = req.header('Authorization')
  const token = authHeader?.split(' ')?.[1]

  if (!token)
    return res
      .status(401)
      .json({ msg: 'No se envió ningún token de autorización' })

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err)
      return res
        .status(401)
        .json({ msg: 'El token de autorización es inválido' })
    req.user = decoded
    next()
  })
}

module.exports = { authRequired }
