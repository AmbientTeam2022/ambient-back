/**
 * @module DeviceController
 * @category controllers
 */
const Device = require('../models/device')

/**
 * <code class="get-ep">GET /device/</code>
 * Obtiene la lista de dispositivos
 *
 * Devuelve la lista de dispositivos asignados a la organización del usuario autenticado.
 * @static
 */
const listDevices = async (req, res) => {
  /* #swagger.tags = ['Device']
    #swagger.summary = 'Obtiene la lista de dispositivos'
   */
  const organization = req.user.organization
  const all = await Device.find({ organization }).populate('category habitat')
  res.json(all)
}

/**
 * <code class="get-ep">GET /device/{uuid}/</code>
 * Obtiene los datos de un dispositivo
 *
 * Solo devuelve datos si el dispositivo pertenece a la misma organización que el usuario.
 * @static
 */
const getDevice = async (req, res) => {
  /* #swagger.tags = ['Device']
    #swagger.summary = 'Obtiene un dispositivo por su UUID'
    #swagger.parameters['uuid'] = {
      description: 'Identificador único UUID del dispositivo',
    }
   */
  const { uuid } = req.params
  const { organization } = req.user
  const device = await Device.findOne({ uuid, organization }).populate(
    'category habitat',
  )
  if (!device) {
    return res
      .status(404)
      .json({ msg: 'No se encontró el dispositivo en su organización' })
  }
  res.json(device)
}

/**
 * <code class="post-ep">POST /device/</code>
 * Crea un dispositivo
 *
 * (sin uso actualmente, se crean desde el admin panel)
 * @static
 * @ignore
 */
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

/**
 * <code class="put-ep">PUT /device/</code>
 * Modifica un dispositivo
 *
 * (sin uso actualmente, work-in-progress)
 * @static
 * @ignore
 */
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

/**
 * <code class="delete-ep">DELETE /device/{uuid}/</code>
 * Eliminar un dispositivo de una organización
 *
 * Remueve la organización y cualquier ambiente asignado al dispositivo.
 * Requiere que el usuario autenticado pertenezca a la misma origanización.
 * @static
 * @ignore
 */
const deleteDevice = async (req, res) => {
  /* #swagger.tags = ['Device']
    #swagger.summary = 'Eliminar un dispositivo (soft-delete)'
    #swagger.parameters['uuid'] = {
      description: 'Identificador único UUID del dispositivo',
    }
   */
  const uuid = req.params.uuid
  const organization = req.user.organization

  const device = await Device.findOne({ uuid, organization })
  if (!device) {
    return res.status(403).json({
      msg: 'El dispositivo no se encontró o no está autorizado',
    })
  }

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

/**
 * <code class="post-ep">POST /device/</code>
 * Obtiene los datos de un dispositivo
 *
 * Recibe el `UUID` y la `Contraseña` del dispositivo.
 * Si las credenciales no son correctas no entrega los datos.
 * Si el dispositivo pertenece a una organización que no es la del usuario, tampoco entrega datos.
 * @static
 */
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

/**
 * <code class="patch-ep">PATCH /device/add/{uuid}</code>
 * Agrega el dispositivo a la organización del usuario.
 *
 * Recibe el `UUID` y la `Contraseña` del dispositivo.
 * Si las credenciales no son correctas no hace ningún cambio.
 * @static
 */
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

/**
 * <code class="patch-ep">PATCH /device/</code>
 * Obtiene los datos de un dispositivo
 *
 * Endpoint dirigido al dispositivo Arduino para que actualice los datos de sus sensores.
 *
 * Recibe el `UUID` y la `Contraseña` del dispositivo.
 * Si las credenciales no son correctas no hace ningún cambio.
 * Solo actualiza los valores de los sensores ya definido, de modo que no permite
 * agregar o quitar sensores a través de este endpoint.
 * @static
 */
const updateSensors = async (req, res) => {
  /* #swagger.tags = ['Device']
    #swagger.summary = 'Envía datos de los sensores'
    #swagger.parameters['uuid'] = {
      description: 'Identificador único UUID del dispositivo',
    }
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              password: { type: "string", required: true },
              sensor: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    name: { type: "string", required: true },
                    value: { type: "integer", required: true }
                  }
                }
              }
            }
          },
          example: {
            password: 'asd123',
            sensor: [
              {
                name: 'temperature',
                value: 22
              },
              {
                name: 'humidity',
                value: 55
              }
            ]
          }
        }
      }
    }
   */
  const { uuid } = req.params
  const { password, sensor: sensorData } = req.body

  const device = await Device.findOne({ uuid, password }).populate('sensor')
  console.log(device)
  console.log(sensorData)

  sensorData.forEach((newSensor) => {
    const i = device.sensor.findIndex((s) => s.name === newSensor.name)
    device.sensor[i] = newSensor
  })

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
  getNewDevice,
  addToOrganization,
  updateSensors,
}
