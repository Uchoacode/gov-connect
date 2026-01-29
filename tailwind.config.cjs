/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0a0a0a',
          bgSecondary: '#1a0f1a',
          border: '#3a2a3a',
        },
        purple: {
          DEFAULT: '#8b5cf6',
          light: '#a78bfa',
          dark: '#7c3aed',
        },
        pink: {
          DEFAULT: '#ec4899',
          light: '#f472b6',
          dark: '#db2777',
        },
        orange: {
          DEFAULT: '#f97316',
          light: '#fb923c',
          dark: '#ea580c',
        },
        yellow: {
          DEFAULT: '#fbbf24',
          light: '#fcd34d',
          dark: '#f59e0b',
        },
      },
      backgroundImage: {
        'gradient-purple-pink': 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
        'gradient-orange-yellow': 'linear-gradient(135deg, #f97316 0%, #fbbf24 100%)',
        'gradient-purple-blue': 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
        'gradient-split': 'linear-gradient(to right, #8b5cf6 0%, #8b5cf6 50%, #f97316 50%, #f97316 100%)',
      },
      boxShadow: {
        'glow-purple': '0 0 30px rgba(139, 92, 246, 0.4)',
        'glow-orange': '0 0 30px rgba(249, 115, 22, 0.4)',
      },
    },
  },
  plugins: [],
}
