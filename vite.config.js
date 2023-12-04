/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';

export default defineConfig(({ command }) => {
  if (command === 'build') {
    return {
      root: 'src',
      base: '/DEV011-social-network-lite/', // Ajusta esto según tu estructura de repositorio
      build: {
        minify: true,
        rollupOptions: {
          output: {
            dir: './dist',
          },
        },
      },
    };
  }
  return {};
});
