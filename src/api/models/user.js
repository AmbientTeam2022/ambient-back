/**
 * Usuario
 *
 * Modelo con los datos de usuario. Estos pueden gestionar
 * dispositivos para la organización a la que pertenecen.
 *
 * @module user
 * @memberof models
 * @category models
 */

const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema
const Organization = require('./organization')

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  role: {
    type: Schema.Types.ObjectId,
    ref: 'Role',
  },
  organization: {
    type: Schema.Types.ObjectId,
    ref: 'Organization',
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
})

/**
 * Compara la contraseña ingresada con la almacenada
 *
 * El modelo no almacena contraseñas directamente, sino el _hash_ y la _salt_
 * generadas con el algoritmo bcrypt. Este mismo se utiliza para comparar en
 * este método.
 *
 * @method comparePassword
 * @param {String} password Contraseña del usuario en plain text
 * @param {Function} cb Callback function llamada al terminar
 */
UserSchema.methods.comparePassword = function (password, cb) {
  bcrypt.compare(password, this.passwordHash, (err, same) => {
    if (err) return cb(err)
    cb(null, same)
  })
}

/**
 * Crea una organización personal para el usuario
 *
 * Utilizado para generar la organización de usuarios nuevos.
 *
 * @method createOrganization
 */
UserSchema.methods.createOrganization = function () {
  this.organization = new Organization({
    name: this.username,
  })
  this.organization.save()
}

// UserSchema.virtual('can_manage_users')
//   .get(function () {

//   })

module.exports = mongoose.model('User', UserSchema)
