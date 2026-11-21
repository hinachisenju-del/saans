/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        paper: {
          50: '#FBF9F5',
          100: '#F5F1EA',
          200: '#EBE5DC',
          300: '#DFD8CD',
          400: '#C5BCAC',
          border: '#E3DCCF',
          dark50: '#121417',
          dark100: '#1A1D20',
          dark200: '#22272B',
          dark300: '#2C3238',
          dark400: '#3A424B',
          darkBorder: '#323942',
        },
        ink: {
          deep: '#1A1D20',
          muted: '#2D3748',
          quiet: '#3C4043',
          subtle: '#4A5568',
          darkDeep: '#F0F2F5',
          darkMuted: '#E2E8F0',
          darkQuiet: '#CBD2D9',
          darkSubtle: '#A0AEC0',
        },
        teal: {
          brand: '#1B4947',
          hover: '#28605D',
          light: '#E6EFEF',
          dark: '#0F2E2C',
          darkBrand: '#38B2AC',
          darkLight: '#183635',
        },
        sal: {
          0: '#2E7D73',
          1: '#6B8E23',
          2: '#C88719',
          3: '#D35400',
          4: '#B03A2E',
          5: '#641E16',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(-4px) scale(1.02)' },
        },
        breathe: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.06)' },
        },
        ripple: {
          '0%': { transform: 'scale(0.8)', opacity: '0.8' },
          '100%': { transform: 'scale(2.2)', opacity: '0' },
        },
        audioWave: {
          '0%, 100%': { height: '4px' },
          '50%': { height: '18px' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        particleDrift: {
          '0%': { transform: 'translate(0, 0)', opacity: '0.3' },
          '50%': { transform: 'translate(8px, -12px)', opacity: '0.7' },
          '100%': { transform: 'translate(-4px, -24px)', opacity: '0' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'float-slow': 'floatSlow 4s ease-in-out infinite',
        'breathe': 'breathe 3s ease-in-out infinite',
        'ripple': 'ripple 2s cubic-bezier(0, 0.2, 0.8, 1) infinite',
        'audio-wave': 'audioWave 1.2s ease-in-out infinite',
        'shimmer': 'shimmer 3s linear infinite',
      },
      boxShadow: {
        'paper': '0 2px 4px rgba(26, 29, 32, 0.04), 0 1px 2px rgba(26, 29, 32, 0.02)',
        'paper-md': '0 4px 12px rgba(26, 29, 32, 0.06), 0 2px 4px rgba(26, 29, 32, 0.03)',
        'paper-lg': '0 12px 28px rgba(26, 29, 32, 0.08), 0 4px 8px rgba(26, 29, 32, 0.04)',
        'dark-paper': '0 2px 4px rgba(0, 0, 0, 0.25), 0 1px 2px rgba(0, 0, 0, 0.15)',
        'dark-md': '0 4px 12px rgba(0, 0, 0, 0.35), 0 2px 4px rgba(0, 0, 0, 0.20)',
        'glow-teal': '0 0 15px rgba(56, 178, 172, 0.35)',
        'glow-amber': '0 0 15px rgba(200, 135, 25, 0.35)',
      }
    },
  },
  plugins: [],
}
