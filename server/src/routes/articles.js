const express = require('express')
const { PrismaClient } = require('@prisma/client')
const { requireAuth } = require('../middleware/auth')

const router = express.Router()
const prisma = new PrismaClient()

// ── Helper slug ───────────────────────────────────────────
function toSlug(str) {
  return str
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // accents
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

// ════════════════════════════════════════════════════════════
// ROUTES PUBLIQUES
// ════════════════════════════════════════════════════════════

// GET /api/articles — liste paginée et filtrée
router.get('/', async (req, res) => {
  const { category, featured, page = 1, limit = 9 } = req.query
  const skip = (Number(page) - 1) * Number(limit)

  const where = {
    published: true,
    ...(category && { category }),
    ...(featured !== undefined && { featured: featured === 'true' }),
  }

  const [items, total] = await Promise.all([
    prisma.article.findMany({
      where,
      orderBy: { publishedAt: 'desc' },
      skip,
      take: Number(limit),
      select: {
        id: true, slug: true, title: true, excerpt: true,
        category: true, tags: true, author: true, readTime: true,
        featured: true, gradient: true, accentColor: true, publishedAt: true,
      },
    }),
    prisma.article.count({ where }),
  ])

  res.json({ items, total, page: Number(page), pages: Math.ceil(total / Number(limit)) })
})

// GET /api/articles/:slug — article complet
router.get('/:slug', async (req, res) => {
  const article = await prisma.article.findUnique({
    where: { slug: req.params.slug, published: true },
  })
  if (!article) return res.status(404).json({ error: 'Article introuvable.' })
  res.json(article)
})

// ════════════════════════════════════════════════════════════
// ROUTES ADMIN (JWT requis)
// ════════════════════════════════════════════════════════════

// GET /api/articles/admin/all — tous les articles (publiés ou non)
router.get('/admin/all', requireAuth, async (req, res) => {
  const items = await prisma.article.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true, slug: true, title: true, category: true,
      published: true, featured: true, publishedAt: true, updatedAt: true,
    },
  })
  res.json(items)
})

// POST /api/articles — créer un article
router.post('/', requireAuth, async (req, res) => {
  const {
    title, excerpt, content, category, tags = [],
    author, readTime, featured = false, published = false,
    gradient, accentColor,
  } = req.body

  if (!title || !content || !category) {
    return res.status(422).json({ error: 'title, content et category sont requis.' })
  }

  const slug = toSlug(title)

  // Vérifier unicité du slug
  const existing = await prisma.article.findUnique({ where: { slug } })
  if (existing) {
    return res.status(409).json({ error: `Slug "${slug}" déjà utilisé.` })
  }

  const article = await prisma.article.create({
    data: {
      slug, title, excerpt, content, category, tags,
      author:      author ?? 'Équipe TechnoSanté',
      readTime:    readTime ?? '5 min',
      featured,
      published,
      gradient:    gradient ?? 'linear-gradient(135deg, #FDE0D0, #FAC0A0)',
      accentColor: accentColor ?? '#C95C35',
      publishedAt: published ? new Date() : null,
    },
  })

  res.status(201).json(article)
})

// PUT /api/articles/:id — mettre à jour un article
router.put('/:id', requireAuth, async (req, res) => {
  const id = Number(req.params.id)
  const data = req.body

  // Si on publie pour la première fois, poser publishedAt
  if (data.published) {
    const existing = await prisma.article.findUnique({ where: { id } })
    if (!existing?.publishedAt) {
      data.publishedAt = new Date()
    }
  }

  const article = await prisma.article.update({
    where: { id },
    data,
  })
  res.json(article)
})

// DELETE /api/articles/:id
router.delete('/:id', requireAuth, async (req, res) => {
  await prisma.article.delete({ where: { id: Number(req.params.id) } })
  res.json({ success: true })
})

module.exports = router