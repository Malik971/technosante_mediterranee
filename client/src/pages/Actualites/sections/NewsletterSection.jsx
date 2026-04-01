import { useState } from "react";
import { Send, CheckCircle, Mail } from "lucide-react";
import { useScrollReveal } from "../../../hooks/useScrollReveal";
import Tag from "../../../components/ui/Tag";

export default function NewsletterSection() {
  const ref = useScrollReveal();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.includes("@")) {
      setError("Adresse email invalide.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur serveur.");
      setSent(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="section-padding"
      style={{
        background:
          "linear-gradient(160deg,#EFF7FB 0%,#FDFAF6 50%,#FEF4EF 100%)",
        borderTop: "1px solid rgba(14,110,158,0.08)",
      }}
      ref={ref}
      aria-label="Newsletter"
    >
      <div className="section-inner">
        <div
          className="reveal max-w-2xl mx-auto rounded-xl3 p-10 text-center relative overflow-hidden"
          style={{
            background: "white",
            border: "1px solid rgba(232,213,200,0.7)",
            boxShadow: "0 12px 48px rgba(44,30,16,0.08)",
          }}
        >
          {/* Déco fond */}
          <div
            className="absolute -top-10 -right-10 w-40 h-40 rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle,rgba(201,92,53,0.07) 0%,transparent 70%)",
              filter: "blur(20px)",
            }}
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle,rgba(14,110,158,0.07) 0%,transparent 70%)",
              filter: "blur(16px)",
            }}
            aria-hidden="true"
          />

          <div className="relative z-10">
            {/* Icône */}
            <div
              className="w-14 h-14 rounded-xl3 flex items-center justify-center mx-auto mb-5"
              style={{ background: "linear-gradient(135deg,#FDE0D0,#FAC0A0)" }}
              aria-hidden="true"
            >
              <Mail size={24} style={{ color: "#C95C35" }} />
            </div>

            <Tag variant="terra" className="mb-4">
              Newsletter
            </Tag>

            <h2
              className="text-ardoise-800 mb-4"
              style={{
                fontSize: "clamp(1.4rem,2.5vw,1.9rem)",
                fontWeight: 700,
              }}
            >
              L'actualité médicale
              <br />
              directement dans votre boîte.
            </h2>
            <p className="text-ardoise-500 text-base mb-8 max-w-md mx-auto leading-relaxed">
              Un email par mois — pas plus. Nos experts sélectionnent les
              actualités qui comptent vraiment pour votre cabinet.
            </p>

            {sent ? (
              /* Confirmation */
              <div
                className="inline-flex flex-col items-center gap-3 px-8 py-6 rounded-xl2"
                style={{
                  background: "rgba(97,122,54,0.08)",
                  border: "1px solid rgba(97,122,54,0.20)",
                }}
                role="status"
                aria-live="polite"
              >
                <CheckCircle
                  size={28}
                  style={{ color: "#617A36" }}
                  aria-hidden="true"
                />
                <p className="font-semibold text-ardoise-700 text-sm">
                  Merci ! Vous êtes inscrit à notre newsletter.
                </p>
                <p className="text-ardoise-500 text-xs">
                  Prochain numéro le 1er du mois.
                </p>
              </div>
            ) : (
              /* Formulaire */
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                noValidate
                aria-label="Inscription newsletter"
              >
                <div className="flex-1">
                  <label htmlFor="newsletter-email" className="sr-only">
                    Adresse email
                  </label>
                  <input
                    id="newsletter-email"
                    type="email"
                    placeholder="votre@email.fr"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                    }}
                    className="input-med text-sm"
                    required
                    aria-describedby={error ? "nl-error" : undefined}
                  />
                  {error && (
                    <p
                      id="nl-error"
                      className="text-xs text-terra-600 mt-1.5 text-left"
                      role="alert"
                    >
                      {error}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-terra text-sm flex-shrink-0"
                  aria-label="S'inscrire à la newsletter"
                >
                  {loading ? (
                    <span
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
                      aria-hidden="true"
                    />
                  ) : (
                    <>
                      <Send size={15} aria-hidden="true" />
                      S'inscrire
                    </>
                  )}
                </button>
              </form>
            )}

            <p className="text-xs text-ardoise-400 mt-4">
              Désabonnement en un clic · Aucun spam · Données confidentielles
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
