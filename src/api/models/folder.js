/**
 * Carpeta
 *
 * Permite organizar los ambientes en carpetas. Las carpetas pertenecen a una organización.
 *
 * @module folder
 * @memberof models
 * @category models
 */

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FolderSchema = new Schema({
  name: { type: String, required: true, default: '' },
  Organization: {
    type: Schema.Types.ObjectId,
    ref: 'Organization',
    required: true,
  }, // fk de Organization
})

module.exports = mongoose.model('Folder', FolderSchema)
