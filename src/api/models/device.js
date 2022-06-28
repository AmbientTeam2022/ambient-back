/**
 * Dispositivo
 *
 * Corresponde al dispositivo físico. Posee sus datos de configuración,
 * así como sus parámetros y las lecturas actuales de sus sensores.
 *
 * Cada registro debe crearse al momento de fabricar un dispositivo.
 * Este quedará permanentemente disponible para ser agregado a una organización.
 *
 * @module device
 * @memberof models
 * @category models
 */

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Category = require('../models/category')

const DeviceSchema = new Schema({
  uuid: { type: String, required: true, default: '' },
  name: { type: String, required: true, default: 'Dispositivo Ambient' },
  password: { type: String, required: true, minlength: 6 },

  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },

  organization: {
    type: Schema.Types.ObjectId,
    ref: 'Organization',
  },

  habitat: {
    type: Schema.Types.ObjectId,
    ref: 'Habitat',
  },

  sensor: [
    {
      name: { type: String, required: true, default: '' },
      value: { type: Number, required: true, default: 0 },
    },
  ],

  param: [
    {
      name: { type: String, required: true, default: '' },
      min: { type: Number, required: true, default: 0 },
      max: { type: Number, required: true, default: 0 },
    },
  ],

  deleted: { type: Boolean, required: true, default: false },
})

/**
 * Carga los parámetros y sensores por defecto de la categoría
 */
DeviceSchema.methods.loadCategoryDefaults = async function () {
  this.param = []
  this.sensor = []

  const category = await Category.findOne({ _id: this.category })
  category.param.forEach((p) => {
    this.param.push({ ...p.toObject() })
    this.sensor.push({ name: p.name })
  })
}

DeviceSchema.pre('save', async function () {
  if (!this.isNew) return
  await this.loadCategoryDefaults()
})

module.exports = mongoose.model('Device', DeviceSchema)
