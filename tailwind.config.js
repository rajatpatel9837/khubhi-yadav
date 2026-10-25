/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: {
          DEFAULT: '#101117',
          deep: '#0a0a0e',
          light: '#181a24'
        },
        aubergine: {
          DEFAULT: '#241923',
          dark: '#191118',
          light: '#362534'
        },
        ivory: {
          DEFAULT: '#F7F1E8',
          warm: '#FAF6F0',
          muted: '#EAE2D5'
        },
        rose: {
          dusty: '#C58E98',
          blush: '#E4C8C7',
          deep: '#9c6670'
        },
        champagne: {
          DEFAULT: '#D0B58A',
          light: '#E2CDAA',
          glow: '#F3E5CF'
        },
        charcoal: {
          DEFAULT: '#29262B',
          soft: '#38343B',
          light: '#534E57'
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        handwriting: ['"Caveat"', 'cursive']
      },
      animation: {
        'float-slow': 'floatSlow 8s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 4s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.9' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
