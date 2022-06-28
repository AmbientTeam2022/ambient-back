/**
 * Utilidad de Autentificación / Autorización
 *
 * @module auth
 * @category util
 * @memberof util
 */

const jwt = require('jsonwebtoken')

/**
 * Genera el Token de autorización
 *
 * Genera un Bearer Token JWT que permite al cliente enviar solicitudes
 * autorizadas al servidor. El Token se genera a partir de una clave secreta,
 * y de los datos del usuario. De esta forma cualquier proceso de autorización
 * llevará sus datos, roles y organización.
 *
 * @param {*} payload Objeto JSON a utilizar para crear el Token
 * @param {String | Number} expiresIn Tiempo de duración del Token.
 * Transcurrido este tiempo dejará de ser válido para la sesión del usuario.
 * Si es un número se mide en milisegundos, si es una cadena lleva un formato
 * específico. Véase: {@link https://www.npmjs.com/package/jsonwebtoken#jwtsignpayload-secretorprivatekey-options-callback|Documentación oficial jsonwebtoken}
 * @returns El Token JWT como cadena
 */
const createToken = (payload, expiresIn) => {
  let token
  if (expiresIn) {
    token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn })
  } else {
    token = jwt.sign(payload, process.env.JWT_SECRET)
  }
  return token
}

module.exports = { createToken }
