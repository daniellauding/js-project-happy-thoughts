# Tailwind CSS Setup - Alternative Methods

## If `npx tailwindcss init -p` fails, try these alternatives:

### Option 1: Create Config Files Manually

#### Create `tailwind.config.js`:
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

#### Create `postcss.config.js`:
```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### Option 2: Use npx with Full Path
```bash
npx tailwindcss@latest init -p
```

### Option 3: Install Tailwind CLI Globally
```bash
npm install -g tailwindcss
tailwindcss init -p
```

### Option 4: Use Node to Run
```bash
node node_modules/tailwindcss/lib/cli.js init -p
```

## After Creating Config Files

1. Add Tailwind directives to `src/index.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

2. Import CSS in `src/main.jsx`:
```javascript
import './index.css'
```

3. Start dev server:
```bash
npm run dev
```

## Troubleshooting npx Issues
- Clear npm cache: `npm cache clean --force`
- Update npm: `npm install -g npm@latest`
- Use Windows PowerShell instead of Git Bash
- Run terminal as Administrator