const express = require('express')
const DeviceController = require('../controllers/DeviceController')
const { authRequired } = require('../middleware/authRequired')
const { allowCors } = require('../middleware/allowCors')

const router = express.Router()

router.get('/', authRequired, DeviceController.listDevices)
router.get('/:uuid/', authRequired, DeviceController.getDevice)
router.post('/new/', authRequired, DeviceController.getNewDevice)
router.patch('/add/:uuid/', authRequired, DeviceController.addToOrganization)
router.delete('/:uuid/', authRequired, DeviceController.deleteDevice)

// Arduino
router.patch('/send/:uuid/', allowCors, DeviceController.updateSensors)

// router.post('/', DeviceController.createDevice)
// router.put('/:uuid/', DeviceController.updateDevice)

module.exports = router
