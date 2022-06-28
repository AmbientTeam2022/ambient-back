/**
 * Rutas relacionadas a la autentificación y autorización del usuario
 * <br /><br />
 *
 * @module auth
 * @category routes
 * @memberof routes
 * @see {@link module:AuthController|AuthController} para ver cada ruta y sus métodos
 */

const express = require('express')
const AuthController = require('../controllers/AuthController')

const router = express.Router()

router.post('/login/', AuthController.login)
router.post('/register/', AuthController.register)
router.post('/logout/', AuthController.logout)

module.exports = router
