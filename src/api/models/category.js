/**
 * Categoría o Modelo de los dispositivos
 *
 * Contiene algunos valores por defecto que tiene un dispositivo de fábrica según su modelo.
 * Esto incluye los parámetros que posee (correspondiente a los sensores incorporados) y sus
 * valores iniciales (mínimo y máximo).
 *
 * @module category
 * @category models
 */

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CategorySchema = new Schema({
  name: { type: String, required: true, default: '' },
  icon: { type: String, default: 'default' },
  param: [
    {
      name: { type: String, required: true },
      min: { type: Number, required: true, default: 0 },
      max: { type: Number, required: true, default: 0 },
    },
  ],
})

module.exports = mongoose.model('Category', CategorySchema)
