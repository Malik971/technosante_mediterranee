const express = require("express");
const { PrismaClient } = require("@prisma/client");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();
const prisma = new PrismaClient();

// ── GET /api/pages/:slug — contenu d'une page ─────────────
router.get("/:slug", async (req, res) => {
  const page = await prisma.pageContent.findUnique({
    where: { pageSlug: req.params.slug },
  });
  if (!page) return res.status(404).json({ error: "Page introuvable." });
  res.json(page);
});

// ── PUT /api/pages/:slug — créer ou mettre à jour ─────────
// Utilise upsert : crée si n'existe pas, met à jour sinon
router.put("/:slug", requireAuth, async (req, res) => {
  const { blocks, meta } = req.body;

  if (!blocks) {
    return res.status(422).json({ error: "blocks est requis." });
  }

  const page = await prisma.pageContent.upsert({
    where: { pageSlug: req.params.slug },
    update: { blocks, meta },
    create: { pageSlug: req.params.slug, blocks, meta },
  });
  res.json(page);
});

// ── GET /api/pages — liste toutes les pages (admin) ───────
router.get("/", requireAuth, async (req, res) => {
  const pages = await prisma.pageContent.findMany({
    select: { id: true, pageSlug: true, updatedAt: true },
    orderBy: { updatedAt: "desc" },
  });
  res.json(pages);
});

module.exports = router;
