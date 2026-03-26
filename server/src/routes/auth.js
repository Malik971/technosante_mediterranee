const express   = require('express')
const bcrypt    = require('bcrypt')
const jwt       = require('jsonwebtoken')
const { PrismaClient } = require('@prisma/client')
const { requireAuth } = require('../middleware/auth')

const router = express.Router()
const prisma = new PrismaClient()

// Body attendu:
// {
//   "email": "admin@technosante.fr",
//   "password": "Admin1234!"
// }
// ── POST /api/auth/login ──────────────────────────────────
router.post('/login', async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(422).json({ error: 'Email et mot de passe requis.' })
  }

  const user = await prisma.adminUser.findUnique({ where: { email } })
  if (!user) {
    return res.status(401).json({ error: 'Identifiants incorrects.' })
  }

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) {
    return res.status(401).json({ error: 'Identifiants incorrects.' })
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN ?? '7d' }
  )

  return res.json({
    token,
    user: { id: user.id, email: user.email, name: user.name, role: user.role },
  })
})

// ── GET /api/auth/me — vérifier son token ─────────────────
router.get('/me', requireAuth, (req, res) => {
  res.json({ user: req.user })
})

module.exports = router