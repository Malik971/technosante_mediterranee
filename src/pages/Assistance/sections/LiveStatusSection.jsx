import { useScrollReveal } from "../../../hooks/useScrollReveal";
import { useOnlineStatus } from "../../../hooks/useOnlineStatus";
import { AGENCES } from "../../../constants/siteData";
import { Phone, Clock, Wifi, WifiOff } from "lucide-react";
import Tag from "../../../components/ui/Tag";

// Tableau des horaires
const HORAIRES = [
  { jour: "Lundi", matin: "9h00 – 12h30", aprem: "14h00 – 18h", open: true },
  { jour: "Mardi", matin: "9h00 – 12h30", aprem: "14h00 – 18h", open: true },
  { jour: "Mercredi", matin: "9h00 – 12h30", aprem: "14h00 – 18h", open: true },
  { jour: "Jeudi", matin: "9h00 – 12h30", aprem: "14h00 – 18h", open: true },
  { jour: "Vendredi", matin: "9h00 – 12h30", aprem: "14h00 – 18h", open: true },
  { jour: "Samedi", matin: "—", aprem: "—", open: false },
  { jour: "Dimanche", matin: "—", aprem: "—", open: false },
];

const CURRENT_DAY_IDX = new Date().getDay(); // 0 = dim, 1 = lun…

export default function LiveStatusSection() {
  const ref = useScrollReveal();
  const { isOnline, count, nextSlot } = useOnlineStatus();

  // Mapper : js getDay() commence dimanche=0, notre tableau lundi=0
  const todayLabel = [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ][CURRENT_DAY_IDX];

  return (
    <section
      className="section-padding"
      style={{
        background:
          "linear-gradient(160deg, #EFF7FB 0%, #FDFAF6 50%, #FEF4EF 100%)",
        borderTop: "1px solid rgba(14,110,158,0.08)",
      }}
      ref={ref}
      aria-label="Statut et horaires"
    >
      <div className="section-inner">
        {/* En-tête */}
        <div className="text-center mb-14">
          <div className="reveal">
            <Tag variant="mer" className="mb-5">
              Disponibilité en temps réel
            </Tag>
          </div>
          <h2 className="reveal text-ardoise-800 mb-5">
            Toujours au bout
            <br />
            <span
              style={{
                background: "linear-gradient(135deg,#0E6E9E,#C95C35)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              du fil.
            </span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* ── Colonne gauche — statut live ── */}
          <div className="space-y-6">
            {/* Carte statut principal */}
            <div
              className="reveal rounded-xl3 p-8 relative overflow-hidden"
              style={{
                background: isOnline
                  ? "linear-gradient(135deg,rgba(97,122,54,0.08),rgba(97,122,54,0.04))"
                  : "linear-gradient(135deg,rgba(201,92,53,0.07),rgba(201,92,53,0.04))",
                border: `1.5px solid ${isOnline ? "rgba(97,122,54,0.22)" : "rgba(201,92,53,0.22)"}`,
              }}
              role="status"
              aria-live="polite"
            >
              {/* Blob décoratif */}
              <div
                className="absolute -top-8 -right-8 w-32 h-32 rounded-full pointer-events-none"
                style={{
                  background: `radial-gradient(circle, ${isOnline ? "rgba(97,122,54,0.15)" : "rgba(201,92,53,0.15)"} 0%, transparent 70%)`,
                  filter: "blur(20px)",
                }}
                aria-hidden="true"
              />

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-5">
                  {/* Dot pulsant */}
                  <div className="relative flex-shrink-0">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ background: isOnline ? "#617A36" : "#C95C35" }}
                    />
                    {isOnline && (
                      <div
                        className="absolute inset-0 rounded-full animate-ping"
                        style={{ background: "rgba(97,122,54,0.45)" }}
                        aria-hidden="true"
                      />
                    )}
                  </div>
                  {isOnline ? (
                    <Wifi
                      size={20}
                      style={{ color: "#617A36" }}
                      aria-hidden="true"
                    />
                  ) : (
                    <WifiOff
                      size={20}
                      style={{ color: "#C95C35" }}
                      aria-hidden="true"
                    />
                  )}
                  <div>
                    <p
                      className="font-bold text-lg"
                      style={{
                        fontFamily: "var(--font-display)",
                        color: isOnline ? "#455A24" : "#A54428",
                      }}
                    >
                      {isOnline
                        ? `${count} technicien${count > 1 ? "s" : ""} disponible${count > 1 ? "s" : ""}`
                        : "Équipe actuellement hors ligne"}
                    </p>
                    <p
                      className="text-sm"
                      style={{ color: isOnline ? "#617A36" : "#C95C35" }}
                    >
                      {nextSlot}
                    </p>
                  </div>
                </div>

                {/* Temps de réponse */}
                <div className="flex flex-wrap gap-3">
                  <div
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold"
                    style={{
                      background: isOnline
                        ? "rgba(97,122,54,0.12)"
                        : "rgba(201,92,53,0.08)",
                      color: isOnline ? "#455A24" : "#A54428",
                      border: `1px solid ${isOnline ? "rgba(97,122,54,0.20)" : "rgba(201,92,53,0.15)"}`,
                    }}
                  >
                    <Clock size={12} aria-hidden="true" />
                    Télémaintenance : &lt; 10 min
                  </div>
                  <div
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold"
                    style={{
                      background: "rgba(14,110,158,0.07)",
                      color: "#0A5580",
                      border: "1px solid rgba(14,110,158,0.14)",
                    }}
                  >
                    <Clock size={12} aria-hidden="true" />
                    Intervention site : 4h – 48h
                  </div>
                </div>
              </div>
            </div>

            {/* Cartes agences */}
            {AGENCES.map((agence) => (
              <div
                key={agence.id}
                className="reveal bg-white rounded-xl2 p-5 flex items-center gap-4 transition-all duration-200"
                style={{
                  border: "1px solid rgba(232,213,200,0.7)",
                  boxShadow: "var(--shadow-card)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "var(--shadow-card-hover)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "var(--shadow-card)";
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: "linear-gradient(135deg,#FDE0D0,#FAC0A0)",
                  }}
                  aria-hidden="true"
                >
                  <Phone size={18} style={{ color: "#C95C35" }} />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-ardoise-800 text-sm">
                    {agence.city}
                  </p>
                  <a
                    href={`tel:${agence.phoneRaw}`}
                    className="text-terra-600 font-bold text-sm hover:text-terra-700 transition-colors"
                  >
                    {agence.phone}
                  </a>
                </div>
                <div className="text-right">
                  <p className="text-xs text-ardoise-400">{agence.hours}</p>
                </div>
              </div>
            ))}
          </div>

          {/* ── Colonne droite — tableau horaires ── */}
          <div className="reveal">
            <div
              className="bg-white rounded-xl3 overflow-hidden"
              style={{
                border: "1px solid rgba(232,213,200,0.7)",
                boxShadow: "var(--shadow-card)",
              }}
            >
              {/* Header tableau */}
              <div
                className="px-6 py-4 flex items-center gap-3"
                style={{
                  background: "linear-gradient(135deg,#FEF4EF,#FDFAF6)",
                  borderBottom: "1px solid rgba(201,92,53,0.10)",
                }}
              >
                <Clock
                  size={16}
                  style={{ color: "#C95C35" }}
                  aria-hidden="true"
                />
                <h3
                  className="font-semibold text-ardoise-800 text-sm"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Horaires d'ouverture
                </h3>
              </div>

              {/* Lignes */}
              <div role="table" aria-label="Horaires d'ouverture">
                <div className="sr-only" role="rowgroup">
                  <div role="row">
                    <span role="columnheader">Jour</span>
                    <span role="columnheader">Matin</span>
                    <span role="columnheader">Après-midi</span>
                  </div>
                </div>
                <div role="rowgroup">
                  {HORAIRES.map((h, i) => {
                    const isToday = h.jour === todayLabel;
                    return (
                      <div
                        key={h.jour}
                        role="row"
                        className={`flex items-center px-6 py-3.5 ${i < HORAIRES.length - 1 ? "border-b" : ""}`}
                        style={{
                          borderColor: "rgba(232,213,200,0.5)",
                          background: isToday
                            ? "linear-gradient(135deg,rgba(201,92,53,0.05),rgba(240,188,42,0.03))"
                            : "transparent",
                        }}
                      >
                        {/* Jour */}
                        <div
                          role="cell"
                          className="w-28 flex items-center gap-2 flex-shrink-0"
                        >
                          {isToday && (
                            <div
                              className="w-1.5 h-1.5 rounded-full bg-terra-500 flex-shrink-0"
                              aria-label="Aujourd'hui"
                            />
                          )}
                          <span
                            className={`text-sm font-semibold flex flex-col ${isToday ? "text-terra-600" : h.open ? "text-ardoise-700" : "text-ardoise-300"}`}
                          >
                            {h.jour}
                            {isToday && (
                              <span className="text-xs font-normal text-terra-400">
                                (aujourd'hui)
                              </span>
                            )}
                          </span>
                        </div>

                        {/* Matin */}
                        <div
                          role="cell"
                          className="flex-1 text-sm"
                          style={{ color: h.open ? "#5A4428" : "#D5C5AA" }}
                        >
                          {h.matin}
                        </div>

                        {/* Après-midi */}
                        <div
                          role="cell"
                          className="flex-1 text-sm text-right"
                          style={{ color: h.open ? "#5A4428" : "#D5C5AA" }}
                        >
                          {h.aprem}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Note pied de tableau */}
              <div
                className="px-6 py-4 text-xs text-ardoise-400"
                style={{
                  borderTop: "1px solid rgba(232,213,200,0.5)",
                  background: "rgba(253,250,246,0.5)",
                }}
              >
                ✦ Contrat Premium : joignez votre technicien attitré en dehors
                des horaires pour les urgences absolues.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
