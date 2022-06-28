/**
 * Rol de usuario
 *
 * Almacena los permisos que tiene un rol de usuario. Estos roles son
 * administrados por la organización. Son diferentes de los roles propios
 * del servidor, que distinguen a los clientes de Ambiente de sus
 * administradores.
 *
 * La idea es que una empresa pueda gestionar roles para sus usuarios y
 * asignarles funciones diferentes a cada uno, según estime connveniente.
 *
 * @module role
 * @memberof models
 * @category models
 */

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RoleSchema = new Schema({
  name: { type: String, required: true, default: '' },
  organization: {
    type: Schema.Types.ObjectId,
    ref: 'Organization',
    required: true,
  },
  can_manage_user: { type: Boolean, required: true, default: false },
  can_manage_device: { type: Boolean, required: true, default: false },
  can_manage_roles: { type: Boolean, required: true, default: false },
  can_manage_reports: { type: Boolean, required: true, default: false },
  can_view_device: { type: Boolean, required: true, default: false },
})

module.exports = mongoose.model('Role', RoleSchema)
