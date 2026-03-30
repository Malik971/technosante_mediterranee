require('dotenv').config()

import express, { json } from 'express'
import cors from 'cors'
import rateLimit from 'express-rate-limit'

import contactRoutes from './routes/contact'
import newsletterRoutes from './routes/newsletter'
import authRoutes from './routes/auth'
import articlesRoutes from './routes/articles'
import servicesRoutes from './routes/services'
import pagesRoutes from './routes/pages'

const app  = express()
const PORT = process.env.PORT || 3001

app.set('trust proxy', 1)

// ── Middlewares ───────────────────────────────────────────────
app.use(json({ limit: '10kb' }))

const allowedOrigins = [
  'http://localhost:5173',
  'https://technosante-mediterranee.vercel.app',
  process.env.CLIENT_URL,
].filter(Boolean)

app.use(cors({
  origin: (origin, callback) => {
    // Autorise Postman / curl / appels serveur à serveur
    if (!origin) return callback(null, true)

    if (allowedOrigins.includes(origin)) {
      return callback(null, true)
    }

    return callback(new Error(`CORS non autorisé pour cette origine : ${origin}`))
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  credentials: false,
}))

// Rate limiting global — 100 req/15 min par IP
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Trop de requêtes, réessayez dans 15 minutes.' },
})

app.use(globalLimiter)

// ── Routes ───────────────────────────────────────────────────
app.use('/api/contact', contactRoutes)
app.use('/api/newsletter', newsletterRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/articles', articlesRoutes)
app.use('/api/services', servicesRoutes)
app.use('/api/pages', pagesRoutes)

// Health check
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }))

// 404
app.use((_req, res) => res.status(404).json({ error: 'Route introuvable.' }))

// ── Démarrage ────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ Serveur TechnoSanté démarré sur http://localhost:${PORT}`)
})