const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OrganizationSchema = new Schema({
  id: { type: Schema.Types.ObjectId, required: true },
  name: { type: String, required: true, default: '' },
})

module.exports = mongoose.model('Organization', OrganizationSchema)
