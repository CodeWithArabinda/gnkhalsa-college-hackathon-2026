/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: {
            bg: '#0B0F17',
            surface: '#161F30',
            border: '#1E293B',
            primary: '#38BDF8',
            secondary: '#10B981',
            text: '#F8FAFC',
            muted: '#94A3B8'
          },
          light: {
            bg: '#F8FAFC',
            surface: '#FFFFFF',
            border: '#E2E8F0',
            primary: '#1E3A8A',
            secondary: '#2563EB',
            text: '#0F172A',
            muted: '#64748B'
          }
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        heading: ['Plus Jakarta Sans', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
