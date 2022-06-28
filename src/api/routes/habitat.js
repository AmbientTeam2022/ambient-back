/**
 * Rutas relacionadas al ambiente
 * <br /><br />
 *
 * @module habitat
 * @category routes
 * @memberof routes
 * @see {@link module:HabitatController|HabitatController} para ver cada ruta y sus métodos
 * @see {@link models.module:habitat|habitat} para ver el modelo
 */

const express = require('express')
const HabitatController = require('../controllers/HabitatController')
const { authRequired } = require('../middleware/authRequired')

const router = express.Router()

router.get('/', authRequired, HabitatController.listHabitats)

module.exports = router
