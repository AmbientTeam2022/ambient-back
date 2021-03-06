/**
 * Ubicación
 *
 * En desuso. Se decidió eliminar el modelo al ser redundante con las carpetas.
 *
 * @module location
 * @memberof models
 * @category models
 * @ignore
 */

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const LocationSchema = new Schema({
  name: { type: String, required: true, default: '' },
  organization: {
    type: Schema.Types.ObjectId,
    Oref: 'Organization',
    required: true,
  },
})

module.exports = mongoose.model('Location', LocationSchema)

// TODO: eliminar este archivo, modelo descontinuado
