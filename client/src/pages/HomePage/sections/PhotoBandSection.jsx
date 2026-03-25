import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useScrollReveal } from "../../../hooks/useScrollReveal";
import { useWindowWidth } from "../../../hooks/useWindowWidth";
import { PHOTOS } from "../../../constants/siteData";

const PHOTO_CELLS = [
  {
    src: PHOTOS.techWork1,
    alt: "Technicien TechnoSanté Méditerranée en intervention dans un cabinet médical",
    caption: "Intervention sur site",
    colSpan: 2,
    rowSpan: 2,
  },
  {
    src: PHOTOS.cabinet1,
    alt: "Cabinet médical moderne équipé par TechnoSanté",
    caption: "Cabinet équipé",
    colSpan: 1,
    rowSpan: 1,
  },
  {
    src: PHOTOS.hardware1,
    alt: "Lecteur de carte Vitale et matériel médical informatique",
    caption: "Matériel certifié",
    colSpan: 1,
    rowSpan: 1,
  },
  {
    src: PHOTOS.med1,
    alt: "Vue méditerranéenne sur Montpellier et la côte",
    caption: "Montpellier & Côte d'Azur",
    colSpan: 2,
    rowSpan: 1,
  },
];
const colSpanMap = {
  1: "md:col-span-1",
  2: "md:col-span-2",
};

const rowSpanMap = {
  1: "md:row-span-1",
  2: "md:row-span-2",
};

// ── Version desktop — mosaïque grille ─────────────────────
function PhotoCell({ cell }) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl2 group cursor-pointer ${colSpanMap[cell.colSpan]} ${rowSpanMap[cell.rowSpan]} h-full`}
    >
      <img
        src={cell.src}
        alt={cell.alt}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />

      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            "linear-gradient(to top, rgba(44,30,16,0.65) 0%, transparent 60%)",
        }}
      />

      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
        <span className="text-white text-sm font-semibold">{cell.caption}</span>
      </div>
    </div>
  );
}

// ── Version mobile — slider avec flèches ──────────────────
function MobileSlider() {
  const [current, setCurrent] = useState(0);
  const total = PHOTO_CELLS.length;

  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  const cell = PHOTO_CELLS[current];

  return (
    <div>
      {/* Slide unique */}
      <div
        style={{
          position: "relative",
          borderRadius: "14px",
          overflow: "hidden",
          height: "220px",
          background: "#F2E5D0",
        }}
      >
        <img
          key={current}
          src={cell.src}
          alt={cell.alt}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center top", // évite le zoom excessif sur visage
            display: "block",
            transition: "opacity 0.3s ease",
          }}
          loading="lazy"
        />

        {/* Overlay caption */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(44,30,16,0.60) 0%, transparent 50%)",
          }}
        />
        <div style={{ position: "absolute", bottom: "14px", left: "16px" }}>
          <span
            style={{
              color: "white",
              fontSize: "13px",
              fontWeight: 600,
              textShadow: "0 1px 4px rgba(0,0,0,0.4)",
            }}
          >
            {cell.caption}
          </span>
        </div>

        {/* Flèche gauche */}
        <button
          onClick={prev}
          aria-label="Photo précédente"
          style={{
            position: "absolute",
            left: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            background: "rgba(253,250,246,0.90)",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 8px rgba(0,0,0,0.20)",
          }}
        >
          <ChevronLeft size={18} style={{ color: "#2C1E10" }} />
        </button>

        {/* Flèche droite */}
        <button
          onClick={next}
          aria-label="Photo suivante"
          style={{
            position: "absolute",
            right: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            background: "rgba(253,250,246,0.90)",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 8px rgba(0,0,0,0.20)",
          }}
        >
          <ChevronRight size={18} style={{ color: "#2C1E10" }} />
        </button>
      </div>

      {/* Dots indicateurs */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "8px",
          marginTop: "12px",
        }}
      >
        {PHOTO_CELLS.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Photo ${i + 1}`}
            style={{
              width: i === current ? "20px" : "8px",
              height: "8px",
              borderRadius: "100px",
              border: "none",
              cursor: "pointer",
              background: i === current ? "#C95C35" : "rgba(201,92,53,0.25)",
              transition: "all 0.25s ease",
              padding: 0,
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ── Section principale ─────────────────────────────────────
export default function PhotoBandSection() {
  const ref = useScrollReveal();
  const width = useWindowWidth();
  const isMobile = width < 768;

  return (
    <section
      className="section-padding"
      style={{ background: "#FDFAF6" }}
      ref={ref}
      aria-label="Nos équipes en action"
    >
      <div className="section-inner">
        {/* En-tête */}
        <div
          className="reveal"
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: "40px",
            alignItems: "end",
            marginBottom: "40px",
          }}
        >
          <div>
            <span
              style={{
                display: "inline-block",
                fontSize: "11px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: "16px",
                padding: "6px 12px",
                borderRadius: "100px",
                background: "rgba(201,92,53,0.09)",
                color: "#C95C35",
                border: "1px solid rgba(201,92,53,0.18)",
              }}
            >
              En action
            </span>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
                fontWeight: 700,
                color: "#2C1E10",
                lineHeight: 1.15,
              }}
            >
              Une équipe de terrain,
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg,#C95C35,#0E6E9E)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                pas derrière un écran.
              </span>
            </h2>
          </div>
          {!isMobile && (
            <p style={{ color: "#5A4428", fontSize: "17px", lineHeight: 1.75 }}>
              Nos techniciens interviennent dans vos cabinets, connaissent vos
              logiciels, votre matériel, et parfois même l'historique de vos
              pannes depuis des années. C'est ça, la vraie proximité.
            </p>
          )}
        </div>

        {/* Photos */}
        <div className="reveal">
          {isMobile ? (
            <MobileSlider />
          ) : (
            <div
              className="hidden md:grid md:grid-cols-4 gap-4"
              style={{ gridAutoRows: "12rem" }}
            >
              {PHOTO_CELLS.map((cell, i) => (
                <PhotoCell key={i} cell={cell} />
              ))}
            </div>
          )}
        </div>

        {isMobile && (
          <p
            style={{
              color: "#5A4428",
              fontSize: "15px",
              lineHeight: 1.75,
              marginTop: "20px",
            }}
          >
            Nos techniciens interviennent dans vos cabinets, connaissent vos
            logiciels, votre matériel, et parfois même l'historique de vos
            pannes depuis des années. C'est ça, la vraie proximité.
          </p>
        )}
      </div>
    </section>
  );
}
