const express = require('express')
const DeviceController = require('../controllers/DeviceController')
const { authRequired } = require('../middleware/authRequired')

const router = express.Router()

// TODO: cambiar rutas agregando middleware de autorización:
// router.get('/', authRequired ,DeviceController.listDevices)

router.get('/', authRequired, DeviceController.listDevices)
router.get('/:uuid/', DeviceController.getDevice)
router.post('/new/', DeviceController.getNewDevice)
router.post('/', DeviceController.createDevice)
router.put('/:uuid/', DeviceController.updateDevice)
router.patch('/add/:uuid/', DeviceController.addToOrganization)
router.delete('/:uuid/', DeviceController.deleteDevice)

module.exports = router
