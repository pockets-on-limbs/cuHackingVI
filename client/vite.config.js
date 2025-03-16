import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from "node:url"
import { defineConfig } from 'vite'

export default defineConfig(({ command, mode }) => {
  return {
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    plugins: [react()]
  }
})