import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias:[
      { find: "@", replacement: "/src/*"},
      { find: "@modules", replacement: "/src/modules"},
      { find: "@api", replacement: "/src/api"},
      { find: "@config", replacement: "/src/config"},
      { find: "@utils", replacement: "/src/utils"},
      { find: "@notification", replacement: "/src/utils/notification"},
      { find: "@token-service", replacement: "/src/utils/token-service"},
      { find: "@components", replacement: "/src/components"},
      { find: "@types", replacement: "/src/types"},
    ]
  }
})
