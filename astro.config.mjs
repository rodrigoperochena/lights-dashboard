// @ts-check
import { siteConfig } from './src/site.config';
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: siteConfig.url,

  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'Fira Sans',
      cssVariable: '--font-fira-sans',
      weights: ["300 700"]
    },
    {
      provider: fontProviders.fontsource(),
      name: 'JetBrains Mono',
      cssVariable: '--font-jetbrains-mono',
      weights: ["300 700"]
    }
  ],

  devToolbar: {
    enabled: false
  },

  vite: {
    css: {
      devSourcemap: true, // Enable CSS source maps
    },

    server: {
      allowedHosts: ['ubuntu.local', siteConfig.hostname]
    }
  }
});