const Habitat = require('../models/habitat')

const listHabitats = async (req, res) => {
  /* #swagger.tags = ['Device']
    #swagger.summary = 'Obtiene la lista de dispositivos'
   */
  const organization = req.user.organization
  const all = await Habitat.find({ organization })
  res.json(all)
}

module.exports = { listHabitats }
