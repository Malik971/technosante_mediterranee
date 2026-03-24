/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  safelist: [
    { pattern: /^(hidden|block|flex|grid|inline-flex)$/ },
    { pattern: /^(sm|md|lg|xl):/ },
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', "Georgia", "serif"],
        body: ['"Plus Jakarta Sans"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },

      colors: {
        /* ── Terracotta / Argile ── */
        terra: {
          50: "#FEF4EF",
          100: "#FDE0D0",
          200: "#FAC0A0",
          300: "#F59570",
          400: "#EE6B40",
          500: "#C95C35",
          600: "#A54428",
          700: "#7D301B",
          800: "#5A200F",
          900: "#3A1008",
        },
        /* ── Mer Méditerranée ── */
        mer: {
          50: "#EFF7FB",
          100: "#D0E8F4",
          200: "#A0CDE6",
          300: "#5EAAD4",
          400: "#2088BF",
          500: "#0E6E9E",
          600: "#0A5580",
          700: "#063D5E",
          800: "#042D45",
          900: "#021E30",
        },
        /* ── Sable chaud ── */
        sable: {
          50: "#FDFAF6",
          100: "#F9F2E8",
          200: "#F2E5D0",
          300: "#E8D0B0",
          400: "#D4B088",
          500: "#B8905E",
        },
        /* ── Soleil ── */
        soleil: {
          100: "#FEF3C7",
          200: "#FDE68A",
          300: "#F5D068",
          400: "#F0BC2A",
          500: "#D4A010",
          600: "#A67808",
        },
        /* ── Garrigue / Lavande ── */
        garrigue: {
          50: "#F4F1FA",
          100: "#EDE8F5",
          200: "#D8CEEE",
          300: "#C4B8E8",
          400: "#A594D8",
          500: "#8B74CA",
          600: "#6B54AA",
        },
        /* ── Olive / Pinède ── */
        olive: {
          100: "#EFF2E5",
          200: "#D5DDC0",
          300: "#B0BE8A",
          400: "#849A55",
          500: "#617A36",
          600: "#455A24",
        },
        /* ── Ardoise (texte sombre chaud) ── */
        ardoise: {
          50: "#F7F3EE",
          100: "#EDE5D8",
          200: "#D5C5AA",
          300: "#B8A080",
          400: "#967B58",
          500: "#745C3A",
          600: "#5A4428",
          700: "#3E2E18",
          800: "#2C1E10",
          900: "#1A1008",
        },
      },

      backgroundImage: {
        "med-gradient":
          "linear-gradient(135deg, #FEF4EF 0%, #FDFAF6 40%, #EFF7FB 100%)",
        "hero-warm":
          "radial-gradient(ellipse 90% 70% at 65% 50%, rgba(201,92,53,0.10) 0%, transparent 60%), radial-gradient(ellipse 70% 60% at 20% 80%, rgba(14,110,158,0.08) 0%, transparent 55%)",
        "terra-gradient": "linear-gradient(135deg, #C95C35 0%, #A54428 100%)",
        "mer-gradient": "linear-gradient(135deg, #2088BF 0%, #0A5580 100%)",
        "soleil-gradient": "linear-gradient(135deg, #F0BC2A 0%, #D4A010 100%)",
      },

      boxShadow: {
        "terra-sm": "0 2px 12px rgba(201,92,53,0.18)",
        "terra-md": "0 4px 24px rgba(201,92,53,0.25)",
        "terra-lg": "0 8px 40px rgba(201,92,53,0.30)",
        "mer-sm": "0 2px 12px rgba(14,110,158,0.15)",
        "mer-md": "0 4px 24px rgba(14,110,158,0.22)",
        card: "0 2px 20px rgba(44,30,16,0.08), 0 1px 4px rgba(44,30,16,0.04)",
        "card-hover":
          "0 8px 40px rgba(44,30,16,0.12), 0 2px 8px rgba(44,30,16,0.06)",
        warm: "0 4px 30px rgba(201,92,53,0.12)",
      },

      borderRadius: {
        xl2: "1.25rem",
        xl3: "1.5rem",
        xl4: "2rem",
      },

      animation: {
        "fade-up": "fadeUp 0.6s ease forwards",
        "fade-in": "fadeIn 0.5s ease forwards",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
        wave: "wave 3s ease-in-out infinite",
      },

      keyframes: {
        fadeUp: {
          from: { opacity: 0, transform: "translateY(24px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        wave: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
      },
    },
  },
  plugins: [],
};
