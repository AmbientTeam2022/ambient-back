/**
 * Ambiente
 *
 * Corresponde al estanque o vivario en el que se ubicará el dispositivo.
 * Permite organizar e identificar los dispositivos de una organización.
 * Además, los ambientes se pueden ubicar en carpetas.
 *
 * @module habitat
 * @memberof models
 * @category models
 */

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const HabitatSchema = new Schema({
  name: { type: String, required: true, default: '' },
  icon: { type: String, default: '00' },
  folder: {
    type: Schema.Types.ObjectId,
    ref: 'Folder',
  },
})

module.exports = mongoose.model('Habitat', HabitatSchema)
