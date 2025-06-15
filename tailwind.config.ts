
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
          DEFAULT: '#6A5AE0',
          foreground: '#fff',
        },
        secondary: {
          DEFAULT: '#3B3A6F',
          foreground: '#fff'
        },
        accent: {
          DEFAULT: '#9C6BFF',
          light: '#EDEBFF',
        },
        gradient: {
          start: '#F3F6FF',
          via: '#EDEBFF',
          end: '#6A5AE0',
        },
        // Text colors for SaaS/AI look
        heading: '#1A1831',
        body: '#3B3A6F',
        subtle: '#7B82A0',
      },
      backgroundImage: {
        'vertical-gradient': 'linear-gradient(to bottom, #F3F6FF 0%, #EDEBFF 50%, #6A5AE0 100%)',
        'hero-gradient': 'linear-gradient(90deg, #E6EBFA 0%, #B5B4F3 50%, #6A5AE0 100%)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      boxShadow: {
        card: '0 6px 32px 0 rgba(28,22,76,0.15)',
        glass: '0 8px 32px 0 rgba(106,90,224,0.10)',
      },
      borderRadius: {
        lg: '1.25rem',
        xl: '2rem',
        card: '1.5rem',
      },
      // Animations...
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
