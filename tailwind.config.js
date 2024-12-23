import { nextui } from '@nextui-org/react'
import svgToDataUri from 'mini-svg-data-uri'
import flattenColorPalette from 'tailwindcss/lib/util/flattenColorPalette'

/** @type {import('tailwindcss').Config} */
module.exports = {
  screens: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        glegoo: ['var(--font-glegoo)'],
      },
      keyframes: {
        'scrolling-banner': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(calc(-50% - var(--gap)/2))' },
        },
        'scrolling-banner-vertical': {
          from: { transform: 'translateY(0)' },
          to: { transform: 'translateY(calc(-50% - var(--gap)/2))' },
        },
      },
      animation: {
        'scrolling-banner': 'scrolling-banner var(--duration) linear infinite',
        'scrolling-banner-vertical':
          'scrolling-banner-vertical var(--duration) linear infinite',
      },
    },
  },
  variants: {
    extend: {
      borderWidth: ['after'],
      borderColor: ['after', 'group-hover'],
      width: ['after', 'group-hover'],
    },
  },
  darkMode: 'class',
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            default: {
              DEFAULT: '#eceff1',
              hover: '#b0bec5',
            },
            primary: {
              DEFAULT: '#283374',
              hover: '#3A4A94', // Lighter shade for hover effect
            },
            danger: {
              DEFAULT: '#e30d18',
              hover: '#C10B16', // Darker shade for hover effect
            },
          },
          components: {
            Button: {
              variants: {
                solid: {
                  default: {
                    backgroundColor: 'var(--nextui-colors-default)',
                  },
                  primary: {
                    backgroundColor: 'var(--nextui-colors-primary)',
                  },
                  danger: {
                    backgroundColor: 'var(--nextui-colors-danger)',
                  },
                },
              },
            },
          },
        },
      },
    }),
    function ({ addUtilities }) {
      addUtilities({
        '.after-border': {
          position: 'relative',
        },
        '.after-border::after': {
          content: '""',
          position: 'absolute',
          bottom: '0',
          left: '0',
          width: '0%',
          height: '2px',
          backgroundColor: 'white',
          transition: 'width 0.2s ease-in-out',
        },
        '.group-hover\\:after-border::after': {
          width: '100%',
        },
      })
    },
    addVariablesForColors,
    function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'bg-dot-thick': (value) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="2.5"></circle></svg>`,
            )}")`,
          }),
        },
        {
          values: flattenColorPalette(theme('backgroundColor')),
          type: 'color',
        },
      )
    },
  ],
}

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme('colors'))
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val]),
  )

  addBase({
    ':root': newVars,
  })
}
