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

UserSchema.methods.comparePassword = function (password, cb) {
  bcrypt.compare(password, this.passwordHash, (err, same) => {
    if (err) return cb(err)
    cb(null, same)
  })
}

UserSchema.methods.createOrganization = function () {
  this.organization = new Organization({
    name: this.username,
  })
  this.organization.save()
}

module.exports = mongoose.model('User', UserSchema)
