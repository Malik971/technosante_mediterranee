import { useState } from "react";
import {
  MonitorDot,
  Wrench,
  PhoneCall,
  ChevronRight,
  Clock,
  AlertCircle,
} from "lucide-react";
import { useScrollReveal } from "../../../hooks/useScrollReveal";
import { useWindowWidth } from "../../../hooks/useWindowWidth";
import { MODES_ASSISTANCE } from "../../../constants/siteData";
import Tag from "../../../components/ui/Tag";

const ICONS = {
  "monitor-dot": MonitorDot,
  wrench: Wrench,
  "phone-call": PhoneCall,
};

const COLOR_STYLES = {
  terra: {
    tag: "terra",
    tabActiveBg: "linear-gradient(135deg,#C95C35,#A54428)",
    tabActiveColor: "#fff",
    tabActiveShadow: "0 4px 16px rgba(201,92,53,0.30)",
    tabIdleBg: "#fff",
    tabIdleColor: "#5A4428",
    tabIdleBorder: "1px solid rgba(201,92,53,0.18)",
    iconBg: "linear-gradient(135deg,#FDE0D0,#FAC0A0)",
    iconColor: "#C95C35",
    delayBg: "rgba(201,92,53,0.08)",
    delayColor: "#A54428",
    delayBorder: "rgba(201,92,53,0.18)",
    stepNumBg: "linear-gradient(135deg,#C95C35,#A54428)",
    noteBg: "rgba(212,160,16,0.07)",
    noteBorder: "rgba(212,160,16,0.18)",
    connectorColor: "#C95C35",
  },
  mer: {
    tag: "mer",
    tabActiveBg: "linear-gradient(135deg,#2088BF,#0A5580)",
    tabActiveColor: "#fff",
    tabActiveShadow: "0 4px 16px rgba(14,110,158,0.28)",
    tabIdleBg: "#fff",
    tabIdleColor: "#063D5E",
    tabIdleBorder: "1px solid rgba(14,110,158,0.18)",
    iconBg: "linear-gradient(135deg,#D0E8F4,#A0CDE6)",
    iconColor: "#0E6E9E",
    delayBg: "rgba(14,110,158,0.08)",
    delayColor: "#0A5580",
    delayBorder: "rgba(14,110,158,0.18)",
    stepNumBg: "linear-gradient(135deg,#2088BF,#0A5580)",
    noteBg: "rgba(14,110,158,0.05)",
    noteBorder: "rgba(14,110,158,0.15)",
    connectorColor: "#0E6E9E",
  },
  garrigue: {
    tag: "garrigue",
    tabActiveBg: "linear-gradient(135deg,#8B74CA,#6B54AA)",
    tabActiveColor: "#fff",
    tabActiveShadow: "0 4px 16px rgba(139,116,202,0.28)",
    tabIdleBg: "#fff",
    tabIdleColor: "#3C2E70",
    tabIdleBorder: "1px solid rgba(139,116,202,0.18)",
    iconBg: "linear-gradient(135deg,#EDE8F5,#D8CEEE)",
    iconColor: "#6B54AA",
    delayBg: "rgba(139,116,202,0.08)",
    delayColor: "#6B54AA",
    delayBorder: "rgba(139,116,202,0.18)",
    stepNumBg: "linear-gradient(135deg,#8B74CA,#6B54AA)",
    noteBg: "rgba(139,116,202,0.05)",
    noteBorder: "rgba(139,116,202,0.15)",
    connectorColor: "#8B74CA",
  },
};

function ModePanel({ mode }) {
  const s = COLOR_STYLES[mode.color];
  const Icon = ICONS[mode.icon] ?? MonitorDot;

  return (
    <div>
      {/* Header */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "flex-start",
          gap: "20px",
          marginBottom: "28px",
        }}
      >
        <div
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            background: s.iconBg,
          }}
          aria-hidden="true"
        >
          <Icon size={26} style={{ color: s.iconColor }} />
        </div>
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "6px",
              flexWrap: "wrap",
            }}
          >
            <Tag variant={s.tag}>{mode.title}</Tag>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "12px",
                fontWeight: 700,
                padding: "6px 12px",
                borderRadius: "100px",
                background: s.delayBg,
                color: s.delayColor,
                border: `1px solid ${s.delayBorder}`,
              }}
            >
              <Clock size={11} aria-hidden="true" />
              {mode.delay} — {mode.delayLabel}
            </span>
          </div>
          <h3
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1.15rem",
              fontWeight: 700,
              lineHeight: 1.3,
              color: "#2C1E10",
            }}
          >
            {mode.tagline}
          </h3>
        </div>
      </div>

      <p style={{ color: "#5A4428", lineHeight: 1.75, marginBottom: "32px" }}>
        {mode.desc}
      </p>

      <div
        style={{
          height: "2px",
          width: "64px",
          borderRadius: "2px",
          marginBottom: "32px",
          background: `linear-gradient(90deg, ${s.connectorColor}, transparent)`,
        }}
        aria-hidden="true"
      />

      <div style={{ marginBottom: "28px" }}>
        <p
          style={{
            fontSize: "11px",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "#B8905E",
            marginBottom: "16px",
          }}
        >
          Comment ça marche
        </p>
        <ol style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {mode.steps.map((step, i) => (
            <li
              key={step.num}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "16px",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontSize: "12px",
                    fontWeight: 700,
                    background: s.stepNumBg,
                    flexShrink: 0,
                  }}
                  aria-hidden="true"
                >
                  {step.num}
                </div>
                {i < mode.steps.length - 1 && (
                  <div
                    style={{
                      width: "1px",
                      flexGrow: 1,
                      marginTop: "4px",
                      minHeight: "16px",
                      background: `linear-gradient(to bottom, ${s.connectorColor}40, transparent)`,
                    }}
                    aria-hidden="true"
                  />
                )}
              </div>
              <p
                style={{
                  color: "#3E2E18",
                  fontSize: "14px",
                  lineHeight: 1.7,
                  paddingTop: "4px",
                }}
              >
                {step.text}
              </p>
            </li>
          ))}
        </ol>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "12px",
          padding: "16px",
          borderRadius: "12px",
          background: s.noteBg,
          border: `1px solid ${s.noteBorder}`,
        }}
        role="note"
      >
        <AlertCircle
          size={15}
          style={{ color: s.delayColor, flexShrink: 0, marginTop: "2px" }}
          aria-hidden="true"
        />
        <p
          style={{
            fontSize: "12px",
            color: "#5A4428",
            lineHeight: 1.7,
            margin: 0,
          }}
        >
          {mode.note}
        </p>
      </div>
    </div>
  );
}

export default function ModesAssistanceSection() {
  const ref = useScrollReveal();
  const [active, setActive] = useState(0);
  const width = useWindowWidth();
  const isDesktop = width >= 1024; // lg breakpoint

  return (
    <section
      className="section-padding"
      style={{ background: "#fff" }}
      id="modes-assistance"
      ref={ref}
      aria-label="Modes d'assistance"
    >
      <div className="section-inner">
        {/* En-tête */}
        <div className="text-center mb-14">
          <div className="reveal">
            <Tag variant="terra" className="mb-5">
              3 modes d'intervention
            </Tag>
          </div>
          <h2 className="reveal text-ardoise-800 mb-5">
            Choisissez votre mode
            <br />
            <span
              style={{
                background: "linear-gradient(135deg,#C95C35,#8B74CA)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              d'intervention.
            </span>
          </h2>
          <p className="reveal text-ardoise-500 text-lg max-w-xl mx-auto">
            Télémaintenance, site, ou téléphone — nous adaptons notre réponse à
            l'urgence et à votre contrat.
          </p>
        </div>

        {/* Layout */}
        <div
          className="reveal"
          style={{
            display: "grid",
            gridTemplateColumns: isDesktop ? "2fr 3fr" : "1fr",
            gap: "32px",
            alignItems: "start",
          }}
        >
          {/* ── Onglets ── */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            {MODES_ASSISTANCE.map((mode, i) => {
              const s = COLOR_STYLES[mode.color];
              const Icon = ICONS[mode.icon] ?? MonitorDot;
              const isActive = active === i;

              return (
                <button
                  key={mode.id}
                  onClick={() => setActive(i)}
                  aria-pressed={isActive}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    padding: "14px",
                    borderRadius: "14px",
                    textAlign: "left",
                    cursor: "pointer",
                    width: "100%",
                    transition: "all 0.2s ease",
                    border: isActive ? "none" : s.tabIdleBorder,
                    background: isActive ? s.tabActiveBg : s.tabIdleBg,
                    color: isActive ? s.tabActiveColor : s.tabIdleColor,
                    boxShadow: isActive
                      ? s.tabActiveShadow
                      : "0 2px 8px rgba(0,0,0,0.04)",
                  }}
                >
                  {/* Icône */}
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      background: isActive ? "rgba(255,255,255,0.2)" : s.iconBg,
                    }}
                    aria-hidden="true"
                  >
                    <Icon
                      size={18}
                      style={{ color: isActive ? "#fff" : s.iconColor }}
                    />
                  </div>

                  {/* Texte — toujours visible */}
                  <div style={{ flex: 1, minWidth: 0, overflow: "hidden" }}>
                    <div
                      style={{
                        fontSize: "11px",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        opacity: 0.6,
                        marginBottom: "2px",
                      }}
                    >
                      {mode.number}
                    </div>
                    <div
                      style={{
                        fontWeight: 600,
                        fontSize: "14px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {mode.title}
                    </div>
                    {isDesktop && (
                      <div
                        style={{
                          fontSize: "12px",
                          opacity: 0.7,
                          marginTop: "2px",
                        }}
                      >
                        {mode.delay}
                      </div>
                    )}
                  </div>

                  <ChevronRight
                    size={16}
                    style={{ flexShrink: 0, opacity: isActive ? 0.8 : 0.2 }}
                    aria-hidden="true"
                  />
                </button>
              );
            })}

            {/* Encart contact — desktop uniquement */}
            {isDesktop && (
              <div
                style={{
                  marginTop: "8px",
                  borderRadius: "14px",
                  padding: "20px",
                  background:
                    "linear-gradient(135deg,rgba(201,92,53,0.06),rgba(240,188,42,0.05))",
                  border: "1px solid rgba(201,92,53,0.14)",
                }}
              >
                <p
                  style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "#2C1E10",
                    marginBottom: "4px",
                  }}
                >
                  Besoin d'un conseil ?
                </p>
                <p
                  style={{
                    fontSize: "12px",
                    color: "#5A4428",
                    marginBottom: "12px",
                    lineHeight: 1.6,
                  }}
                >
                  Notre équipe répond sans engagement.
                </p>
                <a
                  href="tel:0499530532"
                  style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "#C95C35",
                    textDecoration: "none",
                  }}
                >
                  → 04 99 53 05 32
                </a>
              </div>
            )}
          </div>

          {/* ── Panneau droit ── */}
          <div
            style={{
              background: "#fff",
              borderRadius: "20px",
              padding: isDesktop ? "40px" : "28px",
              border: "1px solid rgba(232,213,200,0.7)",
              boxShadow: "0 8px 40px rgba(44,30,16,0.07)",
            }}
          >
            <ModePanel key={active} mode={MODES_ASSISTANCE[active]} />
          </div>
        </div>
      </div>
    </section>
  );
}
