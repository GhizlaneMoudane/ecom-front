import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    headers: {
      'Access-Control-Allow-Origin': '*', // Autorise toutes les origines (en dev uniquement)
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Content-Security-Policy':
        "default-src 'self' https://*.stripe.com; frame-src 'self' https://*.stripe.com; script-src 'self' 'unsafe-inline' https://*.stripe.com; style-src 'self' 'unsafe-inline' https://*.stripe.com; font-src 'self' https://*.stripe.com; img-src 'self' https://*.stripe.com; connect-src 'self' https://*.stripe.com https://t334bo4yzlt7mfprswe7muzaa40texwy.lambda-url.eu-west-1.on.aws/;",
    },
    proxy: {
      '/api': {
        target: 'https://t334bo4yzlt7mfprswe7muzaa40texwy.lambda-url.eu-west-1.on.aws/',
        changeOrigin: true,
        secure: false, 
        rewrite: (path) => path.replace(/^\/api/, ''), // Supprime "/api" du chemin
      }
    }
  },
});