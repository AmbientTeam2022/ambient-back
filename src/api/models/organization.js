/**
 * Organización
 *
 * Corresponde a la empresa, institución o grupo del usuario.
 * La organización es la que posee y gestiona los dispositivos.
 * Los usuarios asociados a una organización reciben acceso a ellos.
 *
 * Por defecto, al crear un usuario se genera una organización personal
 * para el mismo.
 *
 * @module organization
 * @memberof models
 * @category models
 */

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OrganizationSchema = new Schema({
  // id: {
  //   type: Schema.Types.ObjectId,
  //   required: true,
  // },
  name: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('Organization', OrganizationSchema)
