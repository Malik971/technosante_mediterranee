const express = require("express");
const nodemailer = require("nodemailer");
const rateLimit = require("express-rate-limit");

const router = express.Router();

// Rate limit strict sur le contact — 5 envois/heure par IP
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: { error: "Trop de messages envoyés. Réessayez dans une heure." },
});

// ── Transporter Nodemailer ────────────────────────────────────
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 465,
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// ── Validation minimale ───────────────────────────────────────
function validate({ prenom, nom, email, etablissement, message }) {
  const errors = [];
  if (!prenom?.trim()) errors.push("Prénom manquant.");
  if (!nom?.trim()) errors.push("Nom manquant.");
  if (!email?.includes("@")) errors.push("Email invalide.");
  if (!etablissement?.trim()) errors.push("Type d'établissement manquant.");
  if (!message?.trim() || message.trim().length < 10)
    errors.push("Message trop court (10 caractères minimum).");
  return errors;
}

// ── POST /api/contact ─────────────────────────────────────────
router.post("/", contactLimiter, async (req, res) => {
  const { prenom, nom, email, telephone, etablissement, message } = req.body;

  // Validation
  const errors = validate({ prenom, nom, email, etablissement, message });
  if (errors.length) {
    return res.status(422).json({ error: errors.join(" ") });
  }

  // Construction de l'email reçu par l'équipe
  const htmlEquipe = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
      <div style="background:#C95C35;padding:24px 32px;border-radius:12px 12px 0 0">
        <h1 style="color:white;margin:0;font-size:20px">Nouvelle demande de contact</h1>
        <p style="color:rgba(255,255,255,0.8);margin:4px 0 0;font-size:14px">TechnoSanté Méditerranée</p>
      </div>
      <div style="background:#fff;padding:32px;border:1px solid #F2E5D0;border-top:none;border-radius:0 0 12px 12px">
        <table style="width:100%;border-collapse:collapse">
          <tr><td style="padding:8px 0;color:#745C3A;font-size:14px;width:140px"><strong>Prénom / Nom</strong></td>
              <td style="padding:8px 0;font-size:14px">${prenom} ${nom}</td></tr>
          <tr><td style="padding:8px 0;color:#745C3A;font-size:14px"><strong>Email</strong></td>
              <td style="padding:8px 0;font-size:14px"><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td style="padding:8px 0;color:#745C3A;font-size:14px"><strong>Téléphone</strong></td>
              <td style="padding:8px 0;font-size:14px">${telephone || "—"}</td></tr>
          <tr><td style="padding:8px 0;color:#745C3A;font-size:14px"><strong>Établissement</strong></td>
              <td style="padding:8px 0;font-size:14px">${etablissement}</td></tr>
        </table>
        <hr style="border:none;border-top:1px solid #F2E5D0;margin:20px 0"/>
        <p style="color:#745C3A;font-size:14px;margin:0 0 8px"><strong>Message :</strong></p>
        <p style="background:#FDFAF6;padding:16px;border-radius:8px;color:#2C1E10;font-size:14px;line-height:1.7;margin:0">
          ${message.replace(/\n/g, "<br/>")}
        </p>
        <div style="margin-top:24px;text-align:right">
          <a href="mailto:${email}" style="background:#C95C35;color:white;padding:10px 20px;border-radius:8px;text-decoration:none;font-size:14px;font-weight:600">
            Répondre à ${prenom}
          </a>
        </div>
      </div>
    </div>
  `;

  // Email de confirmation envoyé à l'expéditeur
  const htmlConfirmation = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
      <div style="background:#C95C35;padding:24px 32px;border-radius:12px 12px 0 0">
        <h1 style="color:white;margin:0;font-size:20px">Votre message a bien été reçu</h1>
        <p style="color:rgba(255,255,255,0.8);margin:4px 0 0;font-size:14px">TechnoSanté Méditerranée</p>
      </div>
      <div style="background:#fff;padding:32px;border:1px solid #F2E5D0;border-top:none;border-radius:0 0 12px 12px">
        <p style="color:#2C1E10;font-size:15px">Bonjour ${prenom},</p>
        <p style="color:#5A4428;font-size:14px;line-height:1.7">
          Merci pour votre message. Notre équipe vous répondra dans les <strong>24 heures ouvrées</strong>.
        </p>
        <p style="color:#5A4428;font-size:14px;line-height:1.7">
          En cas d'urgence technique, appelez-nous directement :
        </p>
        <div style="background:#FEF4EF;border:1px solid #FAC0A0;border-radius:8px;padding:16px;margin:16px 0">
          <p style="margin:0;font-size:14px;color:#C95C35;font-weight:700">Montpellier · 04 99 53 05 32</p>
          <p style="margin:4px 0 0;font-size:14px;color:#C95C35;font-weight:700">Nice · 04 93 72 87 83</p>
        </div>
        <p style="color:#B8905E;font-size:12px;margin-top:24px">
          TechnoSanté Méditerranée · 185 chemin de la 3ème écluse, 34970 Lattes
        </p>
      </div>
    </div>
  `;

  console.log("CONFIG SMTP:", {
    host: process.env.SMTP_HOST,
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS ? "OK" : "MANQUANT",
  });

  try {
    // Envoi à l'équipe
    await transporter.sendMail({
      from: process.env.CONTACT_FROM,
      to: process.env.CONTACT_TO,
      replyTo: email,
      subject: `[Contact] ${prenom} ${nom} — ${etablissement}`,
      html: htmlEquipe,
    });

    // Confirmation à l'expéditeur
    await transporter.sendMail({
      from: process.env.CONTACT_FROM,
      to: email,
      subject: "Votre message a bien été reçu — TechnoSanté Méditerranée",
      html: htmlConfirmation,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("[contact] Erreur envoi email :", err.message);
    return res
      .status(500)
      .json({
        error:
          "Erreur lors de l'envoi. Veuillez réessayer ou nous appeler directement.",
      });
  }
});

module.exports = router;
