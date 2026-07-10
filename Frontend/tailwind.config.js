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
          cyan:    '#22d3ee',
          blue:    '#38bdf8',
          indigo:  '#818cf8',
          violet:  '#a78bfa',
          gold:    '#f59e0b',
        },
        surface: {
          base:    '#050a16',
          dark:    '#080c18',
          card:    '#0c1424',
          elevated:'#101828',
          border:  'rgba(255,255,255,0.07)',
        },
        primary: {
          50:  '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
          900: '#1e3a8a',
        },
        dark:  '#0f172a',
        light: '#f8fafc',
      },
      fontFamily: {
        display: ['Outfit', 'Inter', 'sans-serif'],
        sans:    ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'glow-cyan':   '0 0 40px rgba(34,211,238,0.15)',
        'glow-blue':   '0 0 40px rgba(56,189,248,0.12)',
        'glow-violet': '0 0 40px rgba(129,140,248,0.12)',
        'glass':       '0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)',
        'card':        '0 24px 64px rgba(0,0,0,0.5)',
        'deep':        '0 32px 80px rgba(0,0,0,0.6)',
      },
      backgroundImage: {
        'gradient-brand':  'linear-gradient(135deg, #22d3ee 0%, #38bdf8 45%, #818cf8 100%)',
        'gradient-dark':   'linear-gradient(to bottom, #050a16, #080c18)',
        'gradient-card':   'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
        'gradient-aurora': 'radial-gradient(ellipse at top left, rgba(6,182,212,0.15) 0%, transparent 60%), radial-gradient(ellipse at bottom right, rgba(129,140,248,0.12) 0%, transparent 60%)',
        'noise':           "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
      },
      animation: {
        'float-slow':    'float-slow 14s ease-in-out infinite',
        'fade-in-up':    'fade-in-up 0.55s ease-out both',
        'scale-in':      'scale-in 0.42s ease-out both',
        'glow-pulse':    'glow-pulse 3s ease-in-out infinite',
        'shimmer':       'shimmer-move 4s linear infinite',
        'aurora':        'aurora-shift 12s ease-in-out infinite',
        'slide-up':      'slide-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) both',
        'gradient-x':    'gradient-x 6s ease infinite',
        'spin-slow':     'spin 3s linear infinite',
      },
      keyframes: {
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0) translateX(0)' },
          '33%':       { transform: 'translateY(-14px) translateX(7px)' },
          '66%':       { transform: 'translateY(7px) translateX(-9px)' },
        },
        'fade-in-up': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to:   { opacity: '1', transform: 'scale(1)' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.5' },
          '50%':       { opacity: '1' },
        },
        'shimmer-move': {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition:  '200% center' },
        },
        'aurora-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%':       { backgroundPosition: '100% 50%' },
        },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(32px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'gradient-x': {
          '0%, 100%': { backgroundSize: '200% 200%', backgroundPosition: 'left center' },
          '50%':       { backgroundSize: '200% 200%', backgroundPosition: 'right center' },
        },
      },
    },
  },
  plugins: [],
}