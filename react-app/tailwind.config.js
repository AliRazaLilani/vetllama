/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx,html}',
    // include converted components in monorepo
    '../src/react-components/**/*.{js,jsx,ts,tsx,html}',
    '../src/**/*.{html,ts,tsx,js,jsx}'
  ],
  theme: {
    extend: {},
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [require('tailwindcss-animate')],
}
