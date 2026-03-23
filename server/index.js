require('dotenv').config()

const express    = require('express')
const cors       = require('cors')
const rateLimit  = require('express-rate-limit')
const contactRouter    = require('./routes/contact')
const newsletterRouter = require('./routes/newsletter')

const app  = express()
const PORT = process.env.PORT || 3001

// ── Middlewares ───────────────────────────────────────────────
app.use(express.json({ limit: '10kb' }))

app.use(cors({
  origin:      process.env.CLIENT_URL || 'http://localhost:5173',
  methods:     ['GET', 'POST'],
  credentials: false,
}))

// Rate limiting global — 100 req/15 min par IP
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max:      100,
  message:  { error: 'Trop de requêtes, réessayez dans 15 minutes.' },
}))

// ── Routes ───────────────────────────────────────────────────
app.use('/api/contact',    contactRouter)
app.use('/api/newsletter', newsletterRouter)

// Health check
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }))

// 404
app.use((_req, res) => res.status(404).json({ error: 'Route introuvable.' }))

// ── Démarrage ────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ Serveur TechnoSanté démarré sur http://localhost:${PORT}`)
})