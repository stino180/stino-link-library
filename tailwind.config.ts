import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1200px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          glow: "hsl(var(--primary-glow))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
          hover: "hsl(var(--card-hover))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        // Museum colors
        gallery: {
          wall: "hsl(var(--gallery-wall))",
          floor: "hsl(var(--gallery-floor))",
        },
        museum: {
          charcoal: "hsl(var(--museum-charcoal))",
          "charcoal-hover": "hsl(var(--museum-charcoal-hover))",
          "charcoal-muted": "hsl(var(--museum-charcoal-muted))",
        },
        frame: {
          border: "hsl(var(--frame-border))",
        },
        // Badge colors
        badge: {
          new: "hsl(var(--badge-new))",
          wip: "hsl(var(--badge-wip))",
          drop: "hsl(var(--badge-drop))",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "background-gradient": "var(--background-gradient)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 1px)",
        sm: "calc(var(--radius) - 2px)",
      },
      boxShadow: {
        "card": "var(--card-shadow)",
        "card-hover": "var(--card-shadow-hover)",
        "frame": "0 0 0 1px rgba(0, 0, 0, 0.05), 0 4px 20px rgba(0, 0, 0, 0.08)",
        "frame-hover": "0 0 0 1px rgba(0, 0, 0, 0.08), 0 12px 40px rgba(0, 0, 0, 0.15)",
      },
      fontFamily: {
        serif: [
          "Playfair Display",
          "Georgia",
          "Times New Roman",
          "serif"
        ],
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "system-ui",
          "sans-serif"
        ],
        mono: [
          "JetBrains Mono",
          "SF Mono",
          "Monaco",
          "Consolas",
          "monospace"
        ],
        cursive: [
          "Allura",
          "cursive"
        ],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "gallery-fade-in": {
          "0%": {
            opacity: "0",
            transform: "translateY(40px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "gallery-scale-in": {
          "0%": {
            opacity: "0",
            transform: "scale(0.95)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1)",
          },
        },
        "spotlight": {
          "0%, 100%": {
            opacity: "0.4",
          },
          "50%": {
            opacity: "0.6",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "gallery-fade-in": "gallery-fade-in 0.8s cubic-bezier(0.25, 0.1, 0.25, 1) forwards",
        "gallery-scale-in": "gallery-scale-in 0.6s cubic-bezier(0.25, 0.1, 0.25, 1) forwards",
        "spotlight": "spotlight 4s ease-in-out infinite",
      },
      transitionTimingFunction: {
        "museum": "cubic-bezier(0.25, 0.1, 0.25, 1)",
      },
      spacing: {
        "gallery": "4rem",
        "room": "8rem",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;