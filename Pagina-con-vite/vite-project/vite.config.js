import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/taller2-dise-o-adaptable/',
  plugins: [
    tailwindcss(),
  ],
})