const express = require('express')
const { PrismaClient } = require('@prisma/client')
const { requireAuth } = require('../middleware/auth')

const router = express.Router()
const prisma = new PrismaClient()

// ── GET /api/services — tous les services publiés ─────────
router.get('/', async (req, res) => {
  const services = await prisma.service.findMany({
    where:   { published: true },
    orderBy: { order: 'asc' },
  })
  res.json(services)
})

// ── GET /api/services/:slug — service + page détail ───────
router.get('/:slug', async (req, res) => {
  const service = await prisma.service.findUnique({
    where:   { slug: req.params.slug },
    include: {
      detail: {
        include: {
          sections: { orderBy: { order: 'asc' } },
        },
      },
    },
  })
  if (!service) return res.status(404).json({ error: 'Service introuvable.' })
  res.json(service)
})

// ── POST /api/services — créer un service ─────────────────
router.post('/', requireAuth, async (req, res) => {
  const {
    slug, icon, title, subtitle, description,
    color, features = [], href, order = 0,
    detail,
  } = req.body

  if (!slug || !title) {
    return res.status(422).json({ error: 'slug et title sont requis.' })
  }

  const service = await prisma.service.create({
    data: {
      slug, icon, title, subtitle, description,
      color, features, href, order,
      ...(detail && {
        detail: {
          create: {
            tagline:      detail.tagline,
            intro:        detail.intro,
            heroGradient: detail.heroGradient,
            accentColor:  detail.accentColor,
            logiciels:    detail.logiciels ?? [],
            cta:          detail.cta,
            sections: {
              create: (detail.sections ?? []).map((s, i) => ({
                icon:        s.icon,
                title:       s.title,
                description: s.description,
                points:      s.points ?? [],
                order:       i,
              })),
            },
          },
        },
      }),
    },
    include: { detail: { include: { sections: true } } },
  })

  res.status(201).json(service)
})

// ── PUT /api/services/:id — mettre à jour ─────────────────
router.put('/:id', requireAuth, async (req, res) => {
  const id = Number(req.params.id)
  const { detail, sections, ...serviceData } = req.body

  // Mise à jour du service principal
  const service = await prisma.service.update({
    where: { id },
    data:  serviceData,
  })

  // Mise à jour du détail si fourni
  if (detail) {
    await prisma.serviceDetail.upsert({
      where:  { serviceId: id },
      update: detail,
      create: { ...detail, serviceId: id },
    })
  }

  // Mise à jour des sections si fournies
  if (sections) {
    const existing = await prisma.serviceDetail.findUnique({ where: { serviceId: id } })
    if (existing) {
      // Supprimer les anciennes et recréer
      await prisma.serviceSection.deleteMany({ where: { serviceDetailId: existing.id } })
      await prisma.serviceSection.createMany({
        data: sections.map((s, i) => ({
          serviceDetailId: existing.id,
          icon:        s.icon,
          title:       s.title,
          description: s.description,
          points:      s.points ?? [],
          order:       i,
        })),
      })
    }
  }

  res.json(service)
})

// ── DELETE /api/services/:id ──────────────────────────────
router.delete('/:id', requireAuth, async (req, res) => {
  await prisma.service.delete({ where: { id: Number(req.params.id) } })
  res.json({ success: true })
})

module.exports = router