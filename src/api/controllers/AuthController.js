/**
 * @module AuthController
 * @category controllers
 */

const User = require('../models/user')
const { createToken } = require('../util/auth')
const bcrypt = require('bcrypt')

/**
 * Endpoint <code style="color: blue">POST /login/</code>
 * Inicia sesión y devuelve al usuario y el token JWT de autorización.
 * @static
 */
const login = async (req, res) => {
  /* #swagger.tags = ['Auth']
    #swagger.summary = 'Inicia sesión y devuelve al usuario y el token JWT de autorización'
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Cuerpo de la solicitud',
      schema: {
        $username: 'alanbrito',
        $password: '12345',
      }
    }
   */
  const { username, password } = req.body
  if (!username || !password) {
    return res.status(401).send({
      msg: 'Campos requeridos: usuario y contraseña',
    })
  }

  const user = await User.findOne({ username }).populate('organization')
  if (!user) {
    return res.status(401).send({
      msg: 'Credenciales inválidas',
    })
  }

  user.comparePassword(password, (err, isSame) => {
    if (err) throw err
    if (!isSame) {
      return res.status(401).send({
        msg: 'Credenciales inválidas',
      })
    }

    const userData = { ...user.toObject() }
    delete userData.passwordHash

    const token = createToken(user.toJSON(), process.env.JWT_TIMEOUT)
    res.status(200).send({ token, userData })
  })
}

/**
 * POST /register/
 */
const register = async (req, res) => {
  /* #swagger.tags = ['Auth']
    #swagger.summary = 'Crea un nuevo usuario'
    #swagger.description = 'Genera un hash + salt de contraseña. También crea una organización vacía para el usuario.'
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Cuerpo de la solicitud',
      schema: {
        $username: 'alanbrito',
        $password: '12345',
        $firstName: 'Alan',
        $lastName: 'Brito',
      }
    }
   */
  const { username, password, firstName, lastName } = req.body
  if (!username || !password || !firstName || !lastName) {
    return res.status(401).send({
      msg: 'Todos los campos son requeridos',
    })
  }

  let user = await User.findOne({ username })
  if (user) {
    return res.status(401).send({
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
      return res.status(201).send({ msg: 'Usuario creado', userData })
    })
    .catch((err) => {
      return res.status(500).send({ msg: err.message })
    })
}

const logout = async (req, res) => {
  /* #swagger.tags = ['Auth']
    #swagger.summary = 'Cierra la sesión del usuario'
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Cuerpo de la solicitud',
    }
   */
  // Por ahora no hace nada y se cierra sesión desde el front
  res.status(200).send({ msg: 'Sesión cerrada con éxito' })
}

module.exports = {
  login,
  register,
  logout,
}
