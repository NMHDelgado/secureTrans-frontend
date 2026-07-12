import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        surface: '#FFFFFF',
        'surface-dim': '#d8dadd',
        'surface-bright': '#f7f9fc',
        'surface-container-lowest': '#ffffff',
        'surface-container-low': '#f2f4f7',
        'surface-container': '#eceef1',
        'surface-container-high': '#e6e8eb',
        'surface-container-highest': '#e0e3e6',
        'on-surface': '#191c1e',
        'on-surface-variant': '#434652',
        'inverse-surface': '#2d3133',
        'inverse-on-surface': '#eff1f4',
        outline: '#747783',
        'outline-variant': '#c4c6d3',
        'surface-tint': '#365aaf',
        primary: '#00286a',
        'on-primary': '#ffffff',
        'primary-container': '#0f3d91',
        'on-primary-container': '#8eadff',
        'inverse-primary': '#b2c5ff',
        secondary: '#005cba',
        'on-secondary': '#ffffff',
        'secondary-container': '#448ffd',
        'on-secondary-container': '#002959',
        tertiary: '#511b00',
        'on-tertiary': '#ffffff',
        'tertiary-container': '#752a00',
        'on-tertiary-container': '#fe9261',
        error: '#ba1a1a',
        'on-error': '#ffffff',
        'error-container': '#ffdad6',
        'on-error-container': '#93000a',
        'primary-fixed': '#dae2ff',
        'primary-fixed-dim': '#b2c5ff',
        'on-primary-fixed': '#001848',
        'on-primary-fixed-variant': '#174296',
        'secondary-fixed': '#d7e3ff',
        'secondary-fixed-dim': '#abc7ff',
        'on-secondary-fixed': '#001b3f',
        'on-secondary-fixed-variant': '#00458e',
        'tertiary-fixed': '#ffdbcd',
        'tertiary-fixed-dim': '#ffb596',
        'on-tertiary-fixed': '#360f00',
        'on-tertiary-fixed-variant': '#7b2f04',
        background: '#f7f9fc',
        'on-background': '#191c1e',
        'surface-variant': '#e0e3e6',
        success: '#27AE60',
        warning: '#F2994A',
        danger: '#EB5757',
        'text-main': '#1B1B1B',
        'text-muted': '#64748B',
        'glass-border': 'rgba(255, 255, 255, 0.2)'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        'display-lg': ['Inter'],
        'headline-lg': ['Inter'],
        'headline-md': ['Inter'],
        'title-md': ['Inter'],
        'body-lg': ['Inter'],
        'body-md': ['Inter'],
        'label-sm': ['Inter']
      },
      fontSize: {
        'display-lg': ['48px', { lineHeight: '56px', letterSpacing: '-0.02em', fontWeight: '700' }],
        'headline-lg': ['32px', { lineHeight: '40px', letterSpacing: '-0.01em', fontWeight: '600' }],
        'headline-lg-mobile': ['24px', { lineHeight: '32px', fontWeight: '600' }],
        'headline-md': ['24px', { lineHeight: '32px', fontWeight: '600' }],
        'title-md': ['18px', { lineHeight: '24px', fontWeight: '600' }],
        'body-lg': ['16px', { lineHeight: '24px', fontWeight: '400' }],
        'body-md': ['14px', { lineHeight: '20px', fontWeight: '400' }],
        'label-sm': ['12px', { lineHeight: '16px', letterSpacing: '0.05em', fontWeight: '600' }]
      },
      borderRadius: {
        sm: '0.25rem',
        DEFAULT: '0.5rem',
        md: '0.75rem',
        lg: '1rem',
        xl: '1.5rem',
        full: '9999px'
      },
      spacing: {
        unit: '4px',
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        gutter: '20px',
        'margin-mobile': '16px',
        'margin-desktop': '40px'
      },
      boxShadow: {
        'level-1': '0px 4px 20px rgba(15, 61, 145, 0.05)'
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
} satisfies Config
