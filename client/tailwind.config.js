/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#0A0A0F',
          surface: '#111118',
          card: '#16161F',
          border: '#1E1E2E',
          teal: '#2DD4BF',
          violet: '#7C3AED',
          indigo: '#4F46E5',
          text: '#E2E8F0',
          muted: '#64748B',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Clash Display', 'Space Grotesk', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(124, 58, 237, 0.2), 0 24px 60px rgba(79, 70, 229, 0.25)',
        teal: '0 20px 60px rgba(45, 212, 191, 0.22)',
      },
      animation: {
        blob: 'blob 7s infinite',
        shimmer: 'shimmer 2s linear infinite',
        float: 'float 7s ease-in-out infinite',
        pulseSoft: 'pulseSoft 3s ease-in-out infinite',
      },
      backgroundImage: {
        mesh:
          'radial-gradient(circle at 20% 20%, rgba(45, 212, 191, 0.22), transparent 30%), radial-gradient(circle at 80% 20%, rgba(124, 58, 237, 0.22), transparent 26%), radial-gradient(circle at 55% 75%, rgba(79, 70, 229, 0.26), transparent 28%)',
      },
      keyframes: {
        blob: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.08)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.92)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.55', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.08)' },
        },
      },
    },
  },
  plugins: [],
};

