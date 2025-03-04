import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import copy from 'rollup-plugin-copy'
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    copy({
      targets: [
        {
          src: 'src/batch',
          dest: 'dist'
        }
      ]
    })
  ],
  base: './',
})
