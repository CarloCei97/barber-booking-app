import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/barber-booking-app/', // This sets the base URL for your project page
  plugins: [react()],
})
