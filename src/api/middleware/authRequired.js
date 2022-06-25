const jwt = require('jsonwebtoken')

function authRequired(req, res, next) {
  const authHeader = req.header('Authorization')
  const token = authHeader?.split(' ')?.[1]

  if (!token)
    return res
      .status(401)
      .json({ msg: 'No se envió ningún token de autorización' })

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err)
      return res
        .status(401)
        .json({ msg: 'El token de autorización es inválido' })
    req.user = decoded
    next()
  })
}

module.exports = { authRequired }
