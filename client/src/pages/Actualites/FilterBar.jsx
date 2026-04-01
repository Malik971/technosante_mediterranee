import { CATEGORIES_ACTU } from "../../constants/siteData";

/**
 * FilterBar — pills de filtres par catégorie.
 *
 * AVANT : calculait les compteurs lui-même depuis ARTICLES (statique).
 * APRÈS : reçoit les compteurs en prop `counts` depuis le parent,
 *         qui les calcule à partir des vraies données (API ou statiques).
 *
 * Si counts n'est pas fourni, affiche juste les catégories sans compteur.
 */

const TAG_STYLES = {
  terra: {
    active: {
      background: "linear-gradient(135deg,#C95C35,#A54428)",
      color: "#fff",
      boxShadow: "0 4px 14px rgba(201,92,53,0.30)",
      border: "none",
    },
    idle: {
      background: "white",
      color: "#745C3A",
      border: "1px solid rgba(201,92,53,0.20)",
    },
  },
  mer: {
    active: {
      background: "linear-gradient(135deg,#2088BF,#0A5580)",
      color: "#fff",
      boxShadow: "0 4px 14px rgba(14,110,158,0.28)",
      border: "none",
    },
    idle: {
      background: "white",
      color: "#063D5E",
      border: "1px solid rgba(14,110,158,0.20)",
    },
  },
  garrigue: {
    active: {
      background: "linear-gradient(135deg,#8B74CA,#6B54AA)",
      color: "#fff",
      boxShadow: "0 4px 14px rgba(139,116,202,0.28)",
      border: "none",
    },
    idle: {
      background: "white",
      color: "#3C2E70",
      border: "1px solid rgba(139,116,202,0.20)",
    },
  },
  soleil: {
    active: {
      background: "linear-gradient(135deg,#F0BC2A,#D4A010)",
      color: "#fff",
      boxShadow: "0 4px 14px rgba(212,160,16,0.28)",
      border: "none",
    },
    idle: {
      background: "white",
      color: "#7A5A00",
      border: "1px solid rgba(212,160,16,0.22)",
    },
  },
  olive: {
    active: {
      background: "linear-gradient(135deg,#849A55,#617A36)",
      color: "#fff",
      boxShadow: "0 4px 14px rgba(97,122,54,0.28)",
      border: "none",
    },
    idle: {
      background: "white",
      color: "#455A24",
      border: "1px solid rgba(97,122,54,0.20)",
    },
  },
};

export default function FilterBar({ activeFilter, onFilter, counts = {} }) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "10px",
        alignItems: "center",
      }}
      role="group"
      aria-label="Filtrer par catégorie"
    >
      {CATEGORIES_ACTU.map((cat) => {
        const isActive = activeFilter === cat.id;
        const s = TAG_STYLES[cat.color] ?? TAG_STYLES.terra;

        // Compteur : vient de la prop counts (calculé depuis l'API ou le statique)
        const count = counts[cat.id] ?? 0;

        return (
          <button
            key={cat.id}
            onClick={() => onFilter(cat.id)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "7px",
              padding: "8px 16px",
              borderRadius: "100px",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s ease",
              ...(isActive ? s.active : s.idle),
            }}
            aria-pressed={isActive}
            aria-label={`${cat.label}${count > 0 ? ` (${count} article${count > 1 ? "s" : ""})` : ""}`}
          >
            {cat.label}

            {/* Badge compteur — affiché seulement si count > 0 */}
            {count > 0 && (
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  padding: "1px 7px",
                  borderRadius: "100px",
                  minWidth: "20px",
                  textAlign: "center",
                  background: isActive
                    ? "rgba(255,255,255,0.22)"
                    : "rgba(44,30,16,0.07)",
                  color: isActive ? "rgba(255,255,255,0.9)" : "inherit",
                }}
                aria-hidden="true"
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
