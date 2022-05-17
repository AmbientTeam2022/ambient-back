const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DeviceSchema = new Schema({
  uuid: { type: String, required: true, default: '' },
  name: { type: String, required: true, default: 'Dispositivo Ambient' },
  icon: { type: String, default: 'default' },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'category',
    required: true,
  }, // fk de category
  habitat: {
    type: Schema.Types.ObjectId,
    ref: 'habitat',
    default: 'null',
  }, // fk de habitat

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
})

module.exports = mongoose.model('Device', DeviceSchema)
