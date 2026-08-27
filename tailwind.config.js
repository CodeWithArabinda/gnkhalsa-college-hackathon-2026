/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neo: {
          light: {
            bg: '#FFFDF8',
            card: '#FFFFFF',
            yellow: '#FFE600',
            cyan: '#4DEEEA',
            pink: '#FF70A6',
            mint: '#A8FF78',
            orange: '#FFAA00',
            text: '#0F172A',
            muted: '#475569'
          },
          dark: {
            bg: '#0F1117',
            card: '#1A1D27',
            cyan: '#38BDF8',
            green: '#00FFA3',
            red: '#F43F5E',
            yellow: '#FBBF24',
            text: '#F8FAFC',
            muted: '#94A3B8'
          }
        }
      },
      fontFamily: {
        heading: ['Space Grotesk', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderWidth: {
        '3': '3px',
      },
      boxShadow: {
        brutal: '4px 4px 0px 0px #000000',
        'brutal-lg': '6px 6px 0px 0px #000000',
        'brutal-cyan': '4px 4px 0px 0px #38BDF8',
        'brutal-dark-cyan': '6px 6px 0px 0px #38BDF8',
      }
    },
  },
  plugins: [],
}
