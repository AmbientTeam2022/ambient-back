const Device = require('../models/device')

const listDevices = async (req, res) => {
  /* #swagger.tags = ['Device']
    #swagger.summary = 'Obtiene la lista de dispositivos'
   */
  const all = await Device.find()
  res.json(all)
}

const getDevice = async (req, res) => {
  /* #swagger.tags = ['Device']
    #swagger.summary = 'Obtiene un dispositivo por su UUID'
    #swagger.parameters['uuid'] = {
      description: 'Identificador único UUID del dispositivo',
    }
   */
  const uuid = req.params.uuid
  const device = await Device.findOne({ uuid })
  res.json(device)
}

const createDevice = async (req, res) => {
  /* #swagger.tags = ['Device']
    #swagger.summary = 'Crea un nuevo dispositivo'
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Cuerpo de la solicitud',
      schema: {
        $uuid: '1234',
        $name: 'Sapitos',
        $icon: '04',
        $category: 1,
        $habitat: 3,
      }
    }
   */
  // const { uuid, name, icon, category, habitat } = req.body
  // const data = { uuid, name, icon, category, habitat }
  const data = req.body

  const device = new Device(data)
  device
    .save()
    .then((device) => {
      return res.json({ device })
    })
    .catch((err) => {
      return res.json(err)
    })
}

const updateDevice = async (req, res) => {
  /* #swagger.tags = ['Device']
    #swagger.summary = 'Modifica un dispositivo existente'
    #swagger.parameters['uuid'] = {
      description: 'Identificador único UUID del dispositivo',
    }
   */
  const uuid = req.params.uuid
  Device.findOneAndUpdate({ uuid }, req.body)
    .then((device) => {
      return res.json({ device })
    })
    .catch((err) => {
      return res.json(err)
    })
}

const deleteDevice = async (req, res) => {
  /* #swagger.tags = ['Device']
    #swagger.summary = 'Eliminar un dispositivo (soft-delete)'
    #swagger.parameters['uuid'] = {
      description: 'Identificador único UUID del dispositivo',
    }
   */
  const uuid = req.params.uuid
  const device = await Device.findOne({ uuid })
  device.organization = undefined
  device
    .save()
    .then(() => {
      return res.json({ device })
    })
    .catch((err) => {
      return res.json(err)
    })
}

module.exports = {
  listDevices,
  getDevice,
  createDevice,
  updateDevice,
  deleteDevice,
}
