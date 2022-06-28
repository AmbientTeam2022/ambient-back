/**
 * @module HabitatController
 * @category controllers
 */
const Habitat = require('../models/habitat')

/**
 * <code class="get-ep">GET /habitat/</code>
 * Obtiene la lista de ambientes
 *
 * Devuelve la lista de ambientes asignados a la organización del usuario autenticado.
 * @static
 */
const listHabitats = async (req, res) => {
  /* #swagger.tags = ['Habitat']
    #swagger.summary = 'Obtiene la lista de ambientes'
   */
  const organization = req.user.organization
  const all = await Habitat.find({ organization })
  res.json(all)
}

module.exports = { listHabitats }
