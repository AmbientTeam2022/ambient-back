const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RolesSchema = new Schema({
  name: { type: String, required: true, default: '' },
  organization: {
    type: Schema.Types.ObjectId,
    ref: 'organization',
    required: true,
  }, // fk de organization
  can_manage_user: { type: Boolean, required: true, default: false },
  can_manage_device: { type: Boolean, required: true, default: false },
  can_manage_roles: { type: Boolean, required: true, default: false },
  can_manage_reports: { type: Boolean, required: true, default: false },
  can_view_device: { type: Boolean, required: true, default: false },
})

module.exports = mongoose.model('Roles', RolesSchema)
