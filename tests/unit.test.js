/**
 * tests/unit.test.js
 * Unit tests (example-based) para las funciones puras de script.js
 * Ejecutar con: npm test
 */

import {
  buildWhatsAppUrl,
  renderCategoryCards,
  validateRequired,
  escapeHtml,
  getFooterYear,
  CONFIG,
} from '../script.js';

// ---------------------------------------------------------------------------
// escapeHtml
// ---------------------------------------------------------------------------
describe('escapeHtml', () => {
  it('escapa < y > de una etiqueta script', () => {
    expect(escapeHtml('<script>')).toBe('&lt;script&gt;');
  });

  it('escapa & ampersand', () => {
    expect(escapeHtml('Tom & Jerry')).toBe('Tom &amp; Jerry');
  });

  it('escapa comillas dobles', () => {
    expect(escapeHtml('"hola"')).toBe('&quot;hola&quot;');
  });

  it('no modifica texto sin caracteres especiales', () => {
    expect(escapeHtml('texto normal')).toBe('texto normal');
  });

  it('maneja cadena vacía', () => {
    expect(escapeHtml('')).toBe('');
  });
});

// ---------------------------------------------------------------------------
// buildWhatsAppUrl
// ---------------------------------------------------------------------------
describe('buildWhatsAppUrl', () => {
  it('genera URL con formato correcto', () => {
    const url = buildWhatsAppUrl('541234567890', 'hola mundo');
    expect(url).toContain('https://wa.me/541234567890?text=');
    expect(url).toContain(encodeURIComponent('hola mundo'));
  });

  it('codifica correctamente mensajes con caracteres especiales', () => {
    const mensaje = 'Hola! ¿Cómo están?';
    const url = buildWhatsAppUrl('549999999999', mensaje);
    expect(url).toContain(encodeURIComponent(mensaje));
  });

  it('maneja mensaje vacío sin romper la URL', () => {
    const url = buildWhatsAppUrl('541234567890', '');
    expect(url).toBe('https://wa.me/541234567890?text=');
  });

  it('inicia siempre con https://wa.me/', () => {
    const url = buildWhatsAppUrl('54111', 'test');
    expect(url.startsWith('https://wa.me/')).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// getFooterYear
// ---------------------------------------------------------------------------
describe('getFooterYear', () => {
  it('retorna el año actual como string', () => {
    expect(getFooterYear()).toBe(String(new Date().getFullYear()));
  });

  it('retorna una cadena de 4 dígitos', () => {
    expect(getFooterYear()).toMatch(/^\d{4}$/);
  });

  it('es idempotente — mismo resultado en múltiples llamadas', () => {
    expect(getFooterYear()).toBe(getFooterYear());
  });
});

// ---------------------------------------------------------------------------
// validateRequired (requiere entorno jsdom — configurado en vitest.config.js)
// ---------------------------------------------------------------------------
describe('validateRequired', () => {
  /**
   * Crea un grupo de formulario con input y span de error,
   * simulando la estructura HTML del proyecto.
   */
  function crearGrupo(valor = '') {
    const div = document.createElement('div');
    div.className = 'form-group';

    const input = document.createElement('input');
    input.type = 'text';
    input.value = valor;

    const span = document.createElement('span');
    span.className = 'error-msg';

    div.appendChild(input);
    div.appendChild(span);
    document.body.appendChild(div);

    return { input, span, div };
  }

  afterEach(() => {
    // Limpiar DOM entre tests
    document.body.innerHTML = '';
  });

  it('retorna false y muestra error cuando el campo está vacío', () => {
    const { input, span } = crearGrupo('');
    const resultado = validateRequired(input, 'El campo es requerido.');
    expect(resultado).toBe(false);
    expect(span.textContent).toBe('El campo es requerido.');
    expect(input.classList.contains('error')).toBe(true);
  });

  it('retorna false cuando el campo tiene solo espacios', () => {
    const { input } = crearGrupo('     ');
    const resultado = validateRequired(input, 'Requerido.');
    expect(resultado).toBe(false);
  });

  it('retorna true cuando el campo tiene contenido válido', () => {
    const { input, span } = crearGrupo('Juan Pérez');
    const resultado = validateRequired(input, 'Requerido.');
    expect(resultado).toBe(true);
    expect(span.textContent).toBe('');
    expect(input.classList.contains('error')).toBe(false);
  });

  it('retorna false con solo tabulaciones y saltos de línea', () => {
    const { input } = crearGrupo('\t\n\r');
    expect(validateRequired(input, 'Requerido.')).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// renderCategoryCards (requiere entorno jsdom)
// ---------------------------------------------------------------------------
describe('renderCategoryCards', () => {
  function crearGrid() {
    const grid = document.createElement('div');
    grid.id = 'cards-grid';
    document.body.appendChild(grid);
    return grid;
  }

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('genera exactamente 4 tarjetas con las categorías del CONFIG', () => {
    const grid = crearGrid();
    renderCategoryCards(CONFIG.categorias, grid);
    const tarjetas = grid.querySelectorAll('.product-card');
    expect(tarjetas.length).toBe(4);
  });

  it('cada tarjeta contiene el nombre de la categoría', () => {
    const grid = crearGrid();
    renderCategoryCards(CONFIG.categorias, grid);
    const tarjetas = grid.querySelectorAll('.product-card');
    tarjetas.forEach((tarjeta, i) => {
      expect(tarjeta.textContent).toContain(CONFIG.categorias[i].nombre);
    });
  });

  it('cada tarjeta contiene la descripción de la categoría', () => {
    const grid = crearGrid();
    renderCategoryCards(CONFIG.categorias, grid);
    const tarjetas = grid.querySelectorAll('.product-card');
    tarjetas.forEach((tarjeta, i) => {
      expect(tarjeta.textContent).toContain(CONFIG.categorias[i].descripcion);
    });
  });

  it('es idempotente — llamar dos veces produce las mismas 4 tarjetas', () => {
    const grid = crearGrid();
    renderCategoryCards(CONFIG.categorias, grid);
    renderCategoryCards(CONFIG.categorias, grid);
    expect(grid.querySelectorAll('.product-card').length).toBe(4);
  });

  it('no falla si el grid es null', () => {
    expect(() => renderCategoryCards(CONFIG.categorias, null)).not.toThrow();
  });

  it('genera N tarjetas para un array de N categorías', () => {
    const grid = crearGrid();
    const cats = [
      { id: 'a', nombre: 'Cat A', descripcion: 'Desc A', icono: '🔥' },
      { id: 'b', nombre: 'Cat B', descripcion: 'Desc B', icono: '⭐' },
    ];
    renderCategoryCards(cats, grid);
    expect(grid.querySelectorAll('.product-card').length).toBe(2);
  });
});

// ---------------------------------------------------------------------------
// CONFIG — validación de estructura
// ---------------------------------------------------------------------------
describe('CONFIG', () => {
  it('tiene exactamente 4 categorías', () => {
    expect(CONFIG.categorias.length).toBe(4);
  });

  it('cada categoría tiene id, nombre, descripcion e icono', () => {
    CONFIG.categorias.forEach((cat) => {
      expect(cat).toHaveProperty('id');
      expect(cat).toHaveProperty('nombre');
      expect(cat).toHaveProperty('descripcion');
      expect(cat).toHaveProperty('icono');
    });
  });

  it('tiene datos de contacto definidos', () => {
    expect(CONFIG.contacto.telefono).toBeTruthy();
    expect(CONFIG.contacto.email).toBeTruthy();
    expect(CONFIG.contacto.direccion).toBeTruthy();
    expect(CONFIG.contacto.horario).toBeTruthy();
  });

  it('tiene número de WhatsApp definido', () => {
    expect(CONFIG.whatsapp.numero).toBeTruthy();
  });
});
