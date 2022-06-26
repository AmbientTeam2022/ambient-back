const Device = require('../models/device')

const listDevices = async (req, res) => {
  /* #swagger.tags = ['Device']
    #swagger.summary = 'Obtiene la lista de dispositivos'
   */
  const organization = req.user.organization
  const all = await Device.find({ organization }).populate('category habitat')
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
  const organization = req.user.organization

  Device.findOneAndUpdate({ uuid, organization }, req.body)
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
  device.habitat = undefined
  device
    .save()
    .then(() => {
      return res.json({ device })
    })
    .catch((err) => {
      return res.json(err)
    })
}

const getNewDevice = async (req, res) => {
  /* #swagger.tags = ['Device']
    #swagger.summary = 'Obtiene un dispositivo usando sus credenciales'
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Cuerpo de la solicitud',
      schema: {
        $uuid: '1234-1234-1234',
        $password: 'asd123',
      }
    }
   */
  const { uuid, password } = req.body
  const device = await Device.findOne({ uuid, password }).populate(
    'category habitat',
  )
  if (!device) {
    return res.status(403).json({
      msg: 'UUID o contraseña incorrectos',
    })
  }
  const organization = req.user.organization
  if (!!device.organization && !device.organization.equals(organization._id)) {
    return res.status(403).json({
      msg: 'El dispositivo ya pertenece a otra organización',
    })
  }
  res.json(device)
}

const addToOrganization = async (req, res) => {
  /* #swagger.tags = ['Device']
    #swagger.summary = 'Modifica un dispositivo existente'
    #swagger.parameters['uuid'] = {
      description: 'Identificador único UUID del dispositivo',
    }
   */
  const { uuid } = req.params
  const { name, param, habitat, password } = req.body
  const organization = req.user.organization

  const data = { organization, name, habitat, param }

  Device.findOneAndUpdate({ uuid, password }, data)
    .then((device) => {
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
  getNewDevice,
  addToOrganization,
}
