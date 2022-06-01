const express = require('express')
const DeviceController = require('../controllers/DeviceController')

const router = express.Router()

router.get('/', DeviceController.listDevices)
router.get('/:uuid', DeviceController.getDevice)
router.post('/', DeviceController.createDevice)
router.put('/:uuid', DeviceController.updateDevice)
router.delete('/:uuid', DeviceController.deleteDevice)

module.exports = router
