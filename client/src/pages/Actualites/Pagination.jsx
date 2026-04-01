import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({
  page,
  totalPages,
  goTo,
  hasNext,
  hasPrev,
}) {
  if (totalPages <= 1) return null;

  // Génère les numéros de pages à afficher (max 5, avec ellipsis)
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= page - 1 && i <= page + 1)) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "…") {
      pages.push("…");
    }
  }

  return (
    <nav
      className="flex items-center justify-center gap-2 mt-12"
      aria-label="Pagination des articles"
    >
      {/* Précédent */}
      <button
        onClick={hasPrev ? () => goTo(page - 1) : undefined}
        disabled={!hasPrev}
        className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
        style={{
          background: hasPrev ? "white" : "rgba(232,213,200,0.3)",
          border: hasPrev
            ? "1px solid rgba(201,92,53,0.20)"
            : "1px solid rgba(232,213,200,0.5)",
          color: hasPrev ? "#C95C35" : "#D5C5AA",
          cursor: hasPrev ? "pointer" : "not-allowed",
        }}
        onMouseEnter={(e) => {
          if (hasPrev)
            e.currentTarget.style.background = "rgba(201,92,53,0.07)";
        }}
        onMouseLeave={(e) => {
          if (hasPrev) e.currentTarget.style.background = "white";
        }}
        aria-label="Page précédente"
      >
        <ChevronLeft size={16} aria-hidden="true" />
      </button>

      {/* Numéros */}
      {pages.map((p, i) =>
        p === "…" ? (
          <span
            key={`ellipsis-${i}`}
            className="w-9 h-9 flex items-center justify-center text-ardoise-400 text-sm select-none"
            aria-hidden="true"
          >
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => goTo(p)}
            className="w-9 h-9 rounded-xl text-sm font-semibold transition-all duration-200"
            style={
              p === page
                ? {
                    background: "linear-gradient(135deg,#C95C35,#A54428)",
                    color: "white",
                    border: "none",
                    boxShadow: "0 4px 12px rgba(201,92,53,0.30)",
                  }
                : {
                    background: "white",
                    color: "#745C3A",
                    border: "1px solid rgba(201,92,53,0.20)",
                    cursor: "pointer",
                  }
            }
            onMouseEnter={(e) => {
              if (p !== page)
                e.currentTarget.style.background = "rgba(201,92,53,0.07)";
            }}
            onMouseLeave={(e) => {
              if (p !== page) e.currentTarget.style.background = "white";
            }}
            aria-label={`Page ${p}`}
            aria-current={p === page ? "page" : undefined}
          >
            {p}
          </button>
        ),
      )}

      {/* Suivant */}
      <button
        onClick={hasNext ? () => goTo(page + 1) : undefined}
        disabled={!hasNext}
        className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
        style={{
          background: hasNext ? "white" : "rgba(232,213,200,0.3)",
          border: hasNext
            ? "1px solid rgba(201,92,53,0.20)"
            : "1px solid rgba(232,213,200,0.5)",
          color: hasNext ? "#C95C35" : "#D5C5AA",
          cursor: hasNext ? "pointer" : "not-allowed",
        }}
        onMouseEnter={(e) => {
          if (hasNext)
            e.currentTarget.style.background = "rgba(201,92,53,0.07)";
        }}
        onMouseLeave={(e) => {
          if (hasNext) e.currentTarget.style.background = "white";
        }}
        aria-label="Page suivante"
      >
        <ChevronRight size={16} aria-hidden="true" />
      </button>
    </nav>
  );
}
