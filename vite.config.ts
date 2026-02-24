import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    const apiProxyTarget = env.VITE_API_PROXY_TARGET || 'http://127.0.0.1:4000';
    const previewAllowedHosts = (env.VITE_PREVIEW_ALLOWED_HOSTS || 'insane.hu,www.insane.hu,localhost,127.0.0.1')
      .split(',')
      .map((host) => host.trim())
      .filter(Boolean);
    return {
      server: {
        port: 3001,
        host: '0.0.0.0',
        proxy: {
          '/api': {
            target: apiProxyTarget,
            changeOrigin: true
          }
        }
      },
      preview: {
        host: '127.0.0.1',
        port: Number(env.VITE_PREVIEW_PORT || 4173),
        allowedHosts: previewAllowedHosts
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
