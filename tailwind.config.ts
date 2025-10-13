/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand colors for Barangay 599
        'barangay-blue': {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#295ba0',
          600: '#05215e',
          700: '#001544',
          800: '#002866',
          900: '#003d88',
        },
        'barangay-gray': {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        'barangay-accent': {
          100: '#b9cfdc',
          200: '#9ca3af',
          300: '#6b7280',
          400: '#4b5563',
        }
      },
      animation: {
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      maxWidth: {
        '8xl': '88rem',
      }
    },
  },
  plugins: [],
}