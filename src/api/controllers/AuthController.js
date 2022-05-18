const User = require('../models/user')
const { createToken } = require('../util/auth')
const bcrypt = require('bcrypt')

/**
 * POST /login/
 */
const login = async (req, res) => {
  // #swagger.tags = ['Auth']
  const { username, password } = req.body
  if (!username || !password) {
    return res.status(401).send({
      success: false,
      msg: 'El usuario y contraseña son campos requeridos',
    })
  }

  const user = await User.findOne({ username })
  if (!user) {
    return res.status(401).send({
      success: false,
      msg: 'Usuario no encontrado',
    })
  }

  user.comparePassword(password, (err, isSame) => {
    if (err) throw err
    if (!isSame) {
      return res.status(401).send({
        success: false,
        msg: 'Contraseña incorrecta',
      })
    }

    const userData = { ...user.toObject() }
    delete userData.passwordHash

    const token = createToken(user.toJSON(), process.env.JWT_TIMEOUT)
    res.json({ token: 'JWT' + token, userData })
  })
}

/**
 * POST /register/
 */
const register = async (req, res) => {
  // #swagger.tags = ['Auth']
  const { username, password, firstName, lastName } = req.body
  if (!username || !password || !firstName || !lastName) {
    return res.status(401).send({
      success: false,
      msg: 'Todos los campos son requeridos',
    })
  }

  let user = await User.findOne({ username })
  if (user) {
    return res.status(401).send({
      success: false,
      msg: 'Ya existe un usuario con este nombre',
    })
  }

  const saltRounds = process.env.SALT_ROUNDS || 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  user = new User({
    username,
    passwordHash,
    firstName,
    lastName,
  })
  user.createOrganization()

  user
    .save()
    .then(() => {
      const userData = { ...user.toObject() }
      delete userData.passwordHash
      return res.json({ success: true, msg: 'Usuario creado', userData })
    })
    .catch((err) => {
      return res.json({ success: false, msg: err.message })
    })
}

module.exports = {
  login,
  register,
}
