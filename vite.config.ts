import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';
import express from 'express';
// @ts-ignore
import sendOtpHandler from './api/send-otp';
// @ts-ignore
import sendEmailHandler from './api/send-email';
// @ts-ignore
import aiChatHandler from './api/ai-chat';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  
  // Expose env variables to the handlers
  process.env.GMAIL_USER = env.GMAIL_USER;
  process.env.GMAIL_PASS = env.GMAIL_PASS;
  process.env.APP_URL = env.APP_URL;
  process.env.GEMINI_API_KEY = env.GEMINI_API_KEY;

  return {
    plugins: [
      react(), 
      tailwindcss(),
      {
        name: 'api-server',
        configureServer(server) {
          const app = express();
          app.use(express.json());
          
          // Bridge to local API handlers
          app.post('/api/send-otp', async (req, res) => {
            try {
              await sendOtpHandler(req, res);
            } catch (err) {
              res.status(500).json({ error: 'Local API Error', details: err });
            }
          });

          app.post('/api/send-email', async (req, res) => {
            try {
              await sendEmailHandler(req, res);
            } catch (err) {
              res.status(500).json({ error: 'Local API Error', details: err });
            }
          });

          app.post('/api/ai-chat', async (req, res) => {
            try {
              await aiChatHandler(req, res);
            } catch (err) {
              res.status(500).json({ error: 'Local AI Proxy Error', details: err });
            }
          });

          server.middlewares.use(app);
        }
      }
    ],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
