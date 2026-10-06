/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        editorial: ['Newsreader', 'Times New Roman', 'serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      colors: {
        mistral: {
          primary: '#6F8F72',
          'primary-deep': '#5a755c',
          'primary-light': '#8ab08c',
          cream: '#E8E2D8',
          'cream-soft': '#F0ECE3',
          'cream-deeper': '#DCD6CA',
          'beige-deep': '#C8C0B0',
          ink: '#2D2D2D',
          'ink-tint': '#4A4A4A',
          canvas: '#FDFDFD',
          surface: '#F5F3EF',
          'surface-code': '#1c1c1e',
          hairline: '#BFC6C4',
          'hairline-soft': '#D4DCDA',
          'hairline-strong': '#A8B3B0',
          steel: '#5A6B5C',
          slate: '#4A5A4C',
          stone: '#8A9A8C',
          muted: '#9AA8A5',
          sunshine: {
            300: '#F2A65A',
            500: '#E89448',
            700: '#D47F32',
            800: '#C06B22',
            900: '#A85818',
            yellow: '#F2A65A'
          }
        }
      },
      borderRadius: {
        md: '8px',
        lg: '12px',
        xl: '16px',
        full: '9999px'
      },
      boxShadow: {
        'mockup': '0 12px 24px -4px rgba(0, 0, 0, 0.08)',
        'card': '0 4px 12px 0 rgba(0, 0, 0, 0.04)',
        'card-hover': '0 10px 24px -4px rgba(0, 0, 0, 0.08)'
      }
    }
  },
  plugins: [
    require('lightswind/plugin')({ effect3d: false }),],
}
