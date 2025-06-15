
import type { Config } from "tailwindcss";

// Extended theme for modern, premium palette
export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6A5AE0', // Modern purple accent, replaces hsl(var(--primary))
          foreground: '#fff',
        },
        // Blue-lavender gradient stops
        gradient: {
          start: '#E6EBFA',
          middle: '#B5B4F3',
          end: '#6A5AE0',
        },
        // Update text colors for more contrast
        heading: '#181C24',
        body: '#323B53',
      },
      backgroundImage: {
        'hero-gradient':
          'linear-gradient(90deg, #E6EBFA 0%, #B5B4F3 50%, #6A5AE0 100%)',
      },
      borderRadius: {
        lg: '1.25rem',
        xl: '2rem',
      },
      boxShadow: {
        card: '0 4px 36px 0 rgba(106,90,224,0.07)',
      },
      // Retain animations and other customizations
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
