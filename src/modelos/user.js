const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  username: { type: String, required: true, default: '' },
  first_name: { type: String, required: true, default: '' },
  last_name: { type: String, required: true, default: '' },
  roles: {
    type: Schema.Types.ObjectId,
    ref: 'roles',
  }, // fk de roles
  organization: {
    type: Schema.Types.ObjectId,
    ref: 'organization',
    required: true,
  }, // fk de organization
})

module.exports = mongoose.model('User', UserSchema)
