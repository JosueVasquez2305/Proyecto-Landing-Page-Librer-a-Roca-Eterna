import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Simula un entorno de navegador con jsdom
    environment: 'jsdom',
    // Expone describe, it, test, expect, etc. globalmente sin importar
    globals: true,
    // Solo procesa archivos de test dentro de tests/
    include: ['tests/**/*.test.js'],
    // Archivo de setup opcional para configuración global de jsdom
    setupFiles: ['tests/setup.js'],
  },
});
