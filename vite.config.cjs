// ESM compatible Vite config
export default {
  plugins: [
    require('@vitejs/plugin-react')()
  ],
  server: {
    port: 3000,
    host: true
  },
  build: {
    outDir: "dist"
  }
}
