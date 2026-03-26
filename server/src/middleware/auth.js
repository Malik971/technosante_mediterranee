const jwt = require('jsonwebtoken')

/**
 * Middleware JWT.
 * Vérifie le header Authorization: Bearer <token>
 * Injecte req.user si valide.
 */
function requireAuth(req, res, next) {
  const header = req.headers.authorization
  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token manquant.' })
  }

  const token = header.slice(7)
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET)
    next()
  } catch {
    return res.status(401).json({ error: 'Token invalide ou expiré.' })
  }
}

/**
 * Middleware admin uniquement (role === 'admin').
 * À utiliser après requireAuth.
 */
function requireAdmin(req, res, next) {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ error: 'Accès réservé aux administrateurs.' })
  }
  next()
}

module.exports = { requireAuth, requireAdmin }