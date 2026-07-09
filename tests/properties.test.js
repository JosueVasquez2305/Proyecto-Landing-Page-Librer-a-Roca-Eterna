/**
 * tests/properties.test.js
 * Property-based tests con fast-check para las 5 propiedades de corrección
 * definidas en design.md.
 * Ejecutar con: npm test
 */

import fc from 'fast-check';
import {
  buildWhatsAppUrl,
  renderCategoryCards,
  validateRequired,
  getFooterYear,
} from '../script.js';

const NUM_RUNS = 100;

// ---------------------------------------------------------------------------
// Property 1: Validación de campos requeridos
// Validates: Requirement 5.2
// Para cualquier cadena compuesta solo de espacios en blanco (o vacía),
// validateRequired debe retornar false y mostrar un mensaje de error no vacío.
// ---------------------------------------------------------------------------
describe('Property 1 — Validación de campos requeridos', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('rechaza cualquier cadena de solo espacios en blanco', () => {
    fc.assert(
      fc.property(
        // Genera cadenas que son vacías o contienen solo whitespace
        fc.oneof(
          fc.constant(''),
          fc.stringMatching(/^\s+$/)
        ),
        (valorInvalido) => {
          // Preparar DOM
          const div = document.createElement('div');
          div.className = 'form-group';
          const input = document.createElement('input');
          input.value = valorInvalido;
          const span = document.createElement('span');
          span.className = 'error-msg';
          div.appendChild(input);
          div.appendChild(span);
          document.body.appendChild(div);

          const resultado = validateRequired(input, 'Campo requerido.');

          // Limpiar
          document.body.removeChild(div);

          // La función debe retornar false
          if (resultado !== false) return false;
          // El mensaje de error debe ser no vacío
          if (span.textContent.trim() === '') return false;

          return true;
        }
      ),
      { numRuns: NUM_RUNS }
    );
  });

  it('acepta cualquier cadena con al menos un carácter no-espacio', () => {
    fc.assert(
      fc.property(
        // Genera cadenas con contenido real (al menos 1 char no-whitespace)
        fc.string({ minLength: 1 }).filter((s) => s.trim().length > 0),
        (valorValido) => {
          const div = document.createElement('div');
          div.className = 'form-group';
          const input = document.createElement('input');
          input.value = valorValido;
          const span = document.createElement('span');
          span.className = 'error-msg';
          div.appendChild(input);
          div.appendChild(span);
          document.body.appendChild(div);

          const resultado = validateRequired(input, 'Campo requerido.');
          document.body.removeChild(div);

          return resultado === true;
        }
      ),
      { numRuns: NUM_RUNS }
    );
  });
});

// ---------------------------------------------------------------------------
// Property 2: URL de WhatsApp construida correctamente
// Validates: Requirement 6.3
// Para cualquier número y mensaje, la URL debe tener el formato correcto
// y el mensaje debe estar codificado con encodeURIComponent.
// ---------------------------------------------------------------------------
describe('Property 2 — URL de WhatsApp construida correctamente', () => {
  it('siempre genera una URL con formato https://wa.me/{numero}?text={codificado}', () => {
    fc.assert(
      fc.property(
        // Número: solo dígitos, mínimo 1
        fc.stringMatching(/^\d+$/).filter((s) => s.length > 0),
        // Mensaje: cualquier string sin caracteres de control
        fc.string().filter((s) => !/[\x00-\x1F]/.test(s)),
        (numero, mensaje) => {
          const url = buildWhatsAppUrl(numero, mensaje);

          // Debe empezar con https://wa.me/
          if (!url.startsWith('https://wa.me/')) return false;

          // Debe contener el número exacto
          if (!url.includes('https://wa.me/' + numero + '?text=')) return false;

          // El segmento después de ?text= debe ser encodeURIComponent(mensaje)
          const expectedText = encodeURIComponent(mensaje);
          const actualText = url.split('?text=')[1];
          if (actualText !== expectedText) return false;

          return true;
        }
      ),
      { numRuns: NUM_RUNS }
    );
  });
});

// ---------------------------------------------------------------------------
// Property 3: Renderizado completo de tarjetas de categorías
// Validates: Requirements 3.1, 3.2
// Para cualquier array de categorías con ≥1 ítem, renderCategoryCards
// produce exactamente N .product-card con nombre y descripción correctos.
// ---------------------------------------------------------------------------
describe('Property 3 — Renderizado completo de tarjetas', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('genera exactamente N tarjetas para un array de N categorías', () => {
    fc.assert(
      fc.property(
        fc.array(
          fc.record({
            id: fc.string({ minLength: 1 }),
            nombre: fc.string({ minLength: 1 }),
            descripcion: fc.string(),
            icono: fc.string(),
          }),
          { minLength: 1, maxLength: 10 }
        ),
        (categorias) => {
          const grid = document.createElement('div');
          document.body.appendChild(grid);

          renderCategoryCards(categorias, grid);

          const tarjetas = grid.querySelectorAll('.product-card');
          const resultado = tarjetas.length === categorias.length;

          document.body.removeChild(grid);
          return resultado;
        }
      ),
      { numRuns: NUM_RUNS }
    );
  });

  it('cada tarjeta contiene el nombre de su categoría correspondiente', () => {
    fc.assert(
      fc.property(
        fc.array(
          fc.record({
            id: fc.string({ minLength: 1 }),
            // Nombres sin caracteres HTML especiales para evitar interferencia del escapeHtml
            nombre: fc.string({ minLength: 1 }).filter((s) => !/[<>&"']/.test(s)),
            descripcion: fc.string(),
            icono: fc.string(),
          }),
          { minLength: 1, maxLength: 10 }
        ),
        (categorias) => {
          const grid = document.createElement('div');
          document.body.appendChild(grid);

          renderCategoryCards(categorias, grid);

          const tarjetas = grid.querySelectorAll('.product-card');
          const todasConNombre = Array.from(tarjetas).every((tarjeta, i) =>
            tarjeta.textContent.includes(categorias[i].nombre)
          );

          document.body.removeChild(grid);
          return todasConNombre;
        }
      ),
      { numRuns: NUM_RUNS }
    );
  });
});

// ---------------------------------------------------------------------------
// Property 4: Inyección de datos idempotente
// Validates: Requirement 9.3
// Llamar renderCategoryCards dos veces con el mismo array produce
// el mismo número de tarjetas que llamarla una sola vez.
// ---------------------------------------------------------------------------
describe('Property 4 — Renderizado idempotente', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('llamar dos veces produce el mismo resultado que una vez', () => {
    fc.assert(
      fc.property(
        fc.array(
          fc.record({
            id: fc.string({ minLength: 1 }),
            nombre: fc.string({ minLength: 1 }),
            descripcion: fc.string(),
            icono: fc.string(),
          }),
          { minLength: 1, maxLength: 10 }
        ),
        (categorias) => {
          const grid = document.createElement('div');
          document.body.appendChild(grid);

          // Primera llamada
          renderCategoryCards(categorias, grid);
          const conteoUno = grid.querySelectorAll('.product-card').length;

          // Segunda llamada sobre el mismo grid
          renderCategoryCards(categorias, grid);
          const conteoDoble = grid.querySelectorAll('.product-card').length;

          document.body.removeChild(grid);

          // Deben ser iguales (idempotente)
          return conteoUno === conteoDoble && conteoDoble === categorias.length;
        }
      ),
      { numRuns: NUM_RUNS }
    );
  });
});

// ---------------------------------------------------------------------------
// Property 5: Año del footer siempre es el año actual
// Validates: Requirement 10.1
// Sin importar cuántas veces se invoque, siempre retorna el año actual.
// ---------------------------------------------------------------------------
describe('Property 5 — Año del footer siempre es el año actual', () => {
  it('siempre retorna String(new Date().getFullYear())', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 100 }),
        (invocaciones) => {
          const yearEsperado = String(new Date().getFullYear());
          for (let i = 0; i < invocaciones; i++) {
            if (getFooterYear() !== yearEsperado) return false;
          }
          return true;
        }
      ),
      { numRuns: NUM_RUNS }
    );
  });

  it('retorna siempre una cadena de 4 dígitos', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 50 }),
        (invocaciones) => {
          for (let i = 0; i < invocaciones; i++) {
            if (!/^\d{4}$/.test(getFooterYear())) return false;
          }
          return true;
        }
      ),
      { numRuns: NUM_RUNS }
    );
  });
});
