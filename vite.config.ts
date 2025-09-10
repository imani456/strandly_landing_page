import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    proxy: {
      '/api': {
        target: 'https://strandly.onrender.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('proxy error', err);
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('Sending Request to the Target:', req.method, req.url);
          });
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
          });
        },
      }
    }
  },
  plugins: [
    react({
      jsxImportSource: 'react',
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "react": "react",
      "react-dom": "react-dom",
    },
  },
  optimizeDeps: {
    include: [
      '@directus/sdk', 
      'react', 
      'react-dom',
      '@radix-ui/react-context',
      '@radix-ui/react-compose-refs',
      '@radix-ui/react-slot'
    ],
  },
  build: {
    commonjsOptions: {
      include: [/node_modules\/@directus\/sdk/],
    },
    rollupOptions: {
      external: [],
    },
    target: 'esnext',
    minify: 'esbuild',
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
  },
  esbuild: {
    jsx: 'automatic',
    jsxImportSource: 'react',
  },
}));