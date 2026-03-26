const express   = require('express')
const nodemailer = require('nodemailer')
const rateLimit = require('express-rate-limit')

const router = express.Router()

const newsletterLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max:      3,
  message:  { error: 'Trop de tentatives. Réessayez dans une heure.' },
})

// ── POST /api/newsletter ──────────────────────────────────────
router.post('/', newsletterLimiter, async (req, res) => {
  const { email } = req.body

  if (!email?.includes('@')) {
    return res.status(422).json({ error: 'Adresse email invalide.' })
  }

  // ── Option A : Brevo API (si BREVO_API_KEY est défini) ───────
  if (process.env.BREVO_API_KEY && process.env.BREVO_LIST_ID) {
    try {
      const response = await fetch('https://api.brevo.com/v3/contacts', {
        method: 'POST',
        headers: {
          'api-key':      process.env.BREVO_API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          listIds:        [Number(process.env.BREVO_LIST_ID)],
          updateEnabled:  true,
        }),
      })

      // 201 = créé, 204 = déjà existant mis à jour — les deux sont OK
      if (response.status === 201 || response.status === 204) {
        return res.status(200).json({ success: true })
      }

      const data = await response.json()
      console.error('[newsletter] Brevo error :', data)
      return res.status(500).json({ error: 'Erreur d\'inscription. Veuillez réessayer.' })
    } catch (err) {
      console.error('[newsletter] Brevo fetch error :', err.message)
      return res.status(500).json({ error: 'Erreur réseau.' })
    }
  }

  // ── Option B : fallback — notif email simple ─────────────────
  // Utile tant que Brevo n'est pas configuré
  try {
    const transporter = nodemailer.createTransport({
      host:   process.env.SMTP_HOST,
      port:   Number(process.env.SMTP_PORT) || 465,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    await transporter.sendMail({
      from:    process.env.CONTACT_FROM,
      to:      process.env.CONTACT_TO,
      subject: `[Newsletter] Nouvelle inscription : ${email}`,
      text:    `Nouvelle inscription à la newsletter :\n\n${email}\n\nDate : ${new Date().toLocaleString('fr-FR')}`,
    })

    return res.status(200).json({ success: true })
  } catch (err) {
    console.error('[newsletter] Fallback email error :', err.message)
    return res.status(500).json({ error: 'Erreur lors de l\'inscription.' })
  }
})

module.exports = router