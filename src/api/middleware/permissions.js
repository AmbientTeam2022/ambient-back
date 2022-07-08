function hasPermissions(req, res, next, permission) {
  if (!req.user?.role) return res.status(400).json({ msg: 'No autorizado' })

  const hasPerms = req.user.role[permission]
  if (!hasPerms)
    return res
      .status(400)
      .json({ msg: `El usuario no tiene el permiso necesario [${permission}]` })

  next()
}

const permissions = [
  'canManageUsers',
  'canManageDevices',
  'canManageRoles',
  'canManageReports',
  'canViewDevices',
]

module.exports = {}
permissions.forEach((perm) => {
  module.exports[perm] = (req, res, next) =>
    hasPermissions(req, res, next, perm)
})
