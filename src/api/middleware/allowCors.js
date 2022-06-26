const allowCors = function (req, res, next) {
  const origin =
    process.env.NODE_ENV === 'dev'
      ? 'http://localhost:8080'
      : process.env.FRONT_URL

  res.header('Access-Control-Allow-Origin', origin)
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  )
  next()
}

module.exports = { allowCors }
