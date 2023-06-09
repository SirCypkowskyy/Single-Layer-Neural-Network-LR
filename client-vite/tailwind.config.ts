import type { Config } from 'tailwindcss'
import daisyui from 'daisyui'

export default {
  content: [
    "./src/**/*.tsx",
    "index.html",
    // "node_modules/daisyui/**/*.js"
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["light", "dark", "cupcake", "bumblebee", "emerald", "corporate", "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden", "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black", "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade", "night", "coffee", "winter"],
  },
} satisfies Config

