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
        background: 'var(--bg-main)',
        foreground: 'var(--text-main)',
        secondaryText: 'var(--text-secondary)',
        card: {
          DEFAULT: 'var(--bg-card)',
          hover: 'var(--bg-card-hover)',
          border: 'var(--border-card)',
        },
        muted: {
          DEFAULT: 'var(--bg-muted)',
          foreground: 'var(--text-muted)',
        },
        brand: {
          50: '#F5F3FF',
          100: '#EDE9FE',
          200: '#DDD6FE',
          300: '#C4B5FD',
          400: '#A78BFA',
          500: '#7C3AED', // electric violet primary
          600: '#6D28D9',
          700: '#4F46E5', // vibrant indigo
          800: '#4338CA',
          900: '#3730A3',
          cyan: '#06B6D4',
        },
        success: {
          50: '#ECFDF5',
          500: '#10B981', // emerald
          600: '#059669',
          700: '#047857',
          teal: '#14B8A6',
        },
        warning: {
          50: '#FFFBEB',
          500: '#F59E0B', // amber
          600: '#D97706',
          700: '#B45309',
          orange: '#F97316',
        },
        risk: {
          50: '#FFF1F2',
          500: '#F43F5E', // rose
          600: '#E11D48',
          700: '#BE123C',
          pink: '#EC4899',
        },
        ink: {
          950: '#040711',
          900: '#070A14', // deep ink dark mode background
          850: '#0A0E1C',
          800: '#0D1224', // layered card
          700: '#121936', // elevated card
          600: '#182142',
          500: '#232D55',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Sora', 'Plus Jakarta Sans', 'sans-serif'],
        display: ['Sora', 'Plus Jakarta Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'glow-sm': '0 0 20px -3px rgba(124, 58, 237, 0.35)',
        'glow-md': '0 0 30px -4px rgba(124, 58, 237, 0.45)',
        'glow-lg': '0 0 45px -5px rgba(124, 58, 237, 0.55)',
        'glow-cyan': '0 0 30px -4px rgba(6, 182, 212, 0.45)',
        'glow-success': '0 0 25px -4px rgba(16, 185, 129, 0.4)',
        'glow-risk': '0 0 25px -4px rgba(244, 63, 94, 0.4)',
        'glass-card': '0 12px 32px 0 rgba(0, 0, 0, 0.08), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
        'glass-card-dark': '0 16px 40px -8px rgba(0, 0, 0, 0.5), inset 0 1px 0 0 rgba(255, 255, 255, 0.12)',
      },
      animation: {
        'spin-slow': 'spin 14s linear infinite',
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'aurora': 'aurora 10s ease infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        aurora: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '100% 50%' },
        }
      }
    },
  },
  plugins: [],
}
