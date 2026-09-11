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
          primary: '#fa520f',
          'primary-deep': '#cc3a05',
          cream: '#fff8e0',
          'cream-soft': '#fffaeb',
          'cream-deeper': '#fff0c2',
          'beige-deep': '#e6d5a8',
          ink: '#1f1f1f',
          'ink-tint': '#3d3d3d',
          canvas: '#ffffff',
          surface: '#fafafa',
          'surface-code': '#1c1c1e',
          hairline: '#e5e5e5',
          'hairline-soft': '#ededed',
          'hairline-strong': '#c7c7c7',
          steel: '#6a6a6a',
          slate: '#4a4a4a',
          stone: '#8a8a8a',
          muted: '#a8a8a8',
          sunshine: {
            300: '#ffd06a',
            500: '#ffb83e',
            700: '#ffa110',
            800: '#ff8105',
            900: '#ff8a00',
            yellow: '#ffd900'
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
