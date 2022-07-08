/**
 * Rutas relacionadas al dispositivo
 * <br /><br />
 *
 * @module device
 * @category routes
 * @memberof routes
 * @see {@link module:DeviceController|DeviceController} para ver cada ruta y sus métodos
 * @see {@link models.module:device|device} para ver el modelo
 */

const express = require('express')
const DeviceController = require('../controllers/DeviceController')
const { authRequired } = require('../middleware/authRequired')
const { allowCors } = require('../middleware/allowCors')
const permissions = require('../middleware/permissions')

const router = express.Router()

router.get(
  '/',
  authRequired,
  permissions.canViewDevices,
  DeviceController.listDevices,
)
router.get(
  '/:uuid/',
  authRequired,
  permissions.canViewDevices,
  DeviceController.getDevice,
)
router.post(
  '/new/',
  authRequired,
  permissions.canManageDevices,
  DeviceController.getNewDevice,
)
router.patch(
  '/add/:uuid/',
  authRequired,
  permissions.canManageDevices,
  DeviceController.addToOrganization,
)
router.delete(
  '/:uuid/',
  authRequired,
  permissions.canManageDevices,
  DeviceController.deleteDevice,
)

// Arduino
router.patch('/send/:uuid/', allowCors, DeviceController.updateSensors)

// router.post('/', DeviceController.createDevice)
// router.put('/:uuid/', DeviceController.updateDevice)

module.exports = router
