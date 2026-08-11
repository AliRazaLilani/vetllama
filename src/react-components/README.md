These are React conversions of the Header, Home, MapGrid, and BreadcrumbSearch components from the Angular app.

Quick integration and Tailwind setup

1) Install dependencies (from your project root):

```bash
# If you don't have a React app yet, create one (example using Vite):
npm create vite@latest react-app -- --template react
cd react-app

# Install runtime deps
npm install react-router-dom

# Tailwind
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

2) Configure `tailwind.config.js` (add paths to all component files):

```js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "../vetllama/src/react-components/**/*.{js,jsx}"],
  theme: { extend: {} },
  plugins: [],
}
```

3) Add Tailwind directives to `src/index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

4) Copy the `src/react-components` folder into your React app `src/` or import directly from the monorepo path.

5) Add Google Maps script to `index.html` (replace YOUR_API_KEY):

```html
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY"></script>
```

6) Use components in your app (example `App.jsx`):

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './react-components/Header'
import Home from './react-components/Home'
import MapGrid from './react-components/MapGrid'

function App(){
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/map-grid" element={<MapGrid/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
```

Notes
- The converted components reuse the original HTML class names so the existing asset images and most styles remain identical. To fully migrate styling to Tailwind, replace SCSS rules with utility classes progressively.
- MapGrid expects the Google Maps JS API to be available globally (see step 5).
- Review image and asset paths if you move the components across folders.

If you want, I can:
- Add a minimal Vite React app in this repo and wire Tailwind automatically.
- Replace the remaining SCSS classnames with equivalent Tailwind utilities for a full Tailwind migration.
