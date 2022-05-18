const jwt = require('jsonwebtoken')

const createToken = (payload, expiresIn) => {
  let token
  if (expiresIn) {
    token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn })
  } else {
    token = jwt.sign(payload, process.env.JWT_SECRET)
  }
  return token
}

module.exports = { createToken }
