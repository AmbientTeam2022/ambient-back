const Habitat = require('../models/habitat')

const listHabitats = async (req, res) => {
  /* #swagger.tags = ['Habitat']
    #swagger.summary = 'Obtiene la lista de ambientes'
   */
  const organization = req.user.organization
  const all = await Habitat.find({ organization })
  res.json(all)
}

module.exports = { listHabitats }
