const express = require('express')
const HabitatController = require('../controllers/HabitatController')
const { authRequired } = require('../middleware/authRequired')

const router = express.Router()

router.get('/', authRequired, HabitatController.listHabitats)

module.exports = router
