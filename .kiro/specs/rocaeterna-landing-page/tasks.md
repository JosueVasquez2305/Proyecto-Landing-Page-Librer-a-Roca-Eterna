# Implementation Plan: Librería y Bazar Roca Eterna — Landing Page

## Overview

Implementación de una landing page estática con `index.html`, `style.css`, `script.js` y `README.md`. Enfoque mobile-first (base 320 px, breakpoints 768 px / 992 px). Datos del negocio centralizados en el objeto `CONFIG` de `script.js`. Se incluyen property-based tests con fast-check para las 5 propiedades de corrección definidas en el diseño.

---

## Tasks

- [x] 1. Configurar estructura del proyecto y variables de diseño
  - Crear `index.html` con doctype HTML5, `<head>` completo (charset, viewport, meta description, og:title, preconnect a Google Fonts, link a `style.css` y `script.js` con `defer`)
  - Crear `style.css` con las variables CSS en `:root`: paleta completa (`--color-primary: #2C5F8A`, `--color-secondary: #E8A020`, etc.), tipografías (`--font-base`, `--font-heading`), espaciado y breakpoints documentados con comentarios
  - Crear `script.js` con el objeto `CONFIG` completo (negocio, contacto, whatsapp, redes, categorias) tal como se define en el diseño, con comentarios de mantenimiento en español
  - Definir estilos globales base en `style.css`: `box-sizing: border-box`, `margin: 0`, `padding: 0`, `font-family: var(--font-base)`, `font-size: 16px`, `color: var(--color-text)`, `background: var(--color-bg)`, clase `.container` con `max-width: 1200px` y `margin: 0 auto`
  - _Requirements: 7.1, 7.4, 8.3, 8.4, 9.1, 9.4_

- [x] 2. Implementar Header y Navigation
  - [x] 2.1 Escribir HTML semántico del Header/Nav en `index.html`
    - Agregar `<header id="header">` con `<nav id="main-nav" aria-label="Navegación principal">`, elemento `.logo`, `<button class="hamburger" aria-expanded="false" aria-controls="nav-links">` con ícono SVG de tres líneas y `<ul id="nav-links" class="nav-links">` con `<li><a>` para cada sección
    - Incluir comentarios HTML marcando inicio y fin de la sección
    - _Requirements: 1.1, 1.2, 8.1, 8.2, 8.6, 9.2_

  - [x] 2.2 Escribir estilos CSS del Header/Nav en `style.css`
    - Estilo base (móvil): `header` con fondo `--color-primary`, logo en blanco, `.hamburger` visible y estilizado, `.nav-links` colapsado (display none) con clase `.open` que lo expande
    - Media query `≥768px`: `.hamburger` oculto, `.nav-links` como flex horizontal, transición a `position: sticky; top: 0; z-index: 100` mediante clase `.sticky`
    - _Requirements: 1.4, 1.5, 7.1, 7.2_

  - [x] 2.3 Implementar comportamientos JS del Header/Nav en `script.js`
    - Función `initNav()`: listener `scroll` → agrega/quita clase `.sticky` en `header` cuando `scrollY > 80` y `innerWidth >= 768`
    - Listener `click` en `.hamburger`: toggle clase `.open` en `#nav-links`, actualiza `aria-expanded` en el botón
    - Listener `click` en cada `<a>` de `.nav-links`: remueve clase `.open` (cierra menú en móvil)
    - Smooth scroll: listener `click` en todos los `<a href^="#"]>`, llama `document.querySelector(target).scrollIntoView({ behavior: 'smooth' })` tras verificar que el elemento existe
    - _Requirements: 1.3, 1.4, 1.5, 1.6_

- [x] 3. Implementar Sección Hero
  - [x] 3.1 Escribir HTML semántico de la sección Hero en `index.html`
    - Agregar `<section id="inicio">` con `<h1>Librería y Bazar Roca Eterna</h1>`, `<p class="hero-slogan">`, `<a class="cta-button" href="#categorias">` con texto de llamada a la acción
    - Incluir comentarios HTML de inicio/fin de sección
    - _Requirements: 2.1, 2.2, 2.3, 8.2, 9.2_

  - [x] 3.2 Escribir estilos CSS de la sección Hero en `style.css`
    - Base móvil: `min-height: 100vh`, fondo con gradiente o color `--color-primary`, `<h1>` con `--font-heading`, `font-size: clamp(28px, 7vw, 48px)`, color blanco; `.hero-slogan` legible; `.cta-button` con `background: --color-secondary`, `padding`, `border-radius`, `font-size: 16px` mínimo
    - Media query `≥768px`: ajustar tamaños de fuente y espaciado del hero
    - _Requirements: 2.4, 2.5, 2.6, 7.1, 7.4_

- [x] 4. Implementar Sección Categorías
  - [x] 4.1 Escribir HTML semántico de la sección Categorías en `index.html`
    - Agregar `<section id="categorias">` con `<h2>Nuestras Categorías</h2>` y `<div class="cards-grid">` con cuatro `<article class="product-card">` (icono, `<h3 class="card-title">`, `<p class="card-desc">`) con el contenido de `CONFIG.categorias`
    - Incluir comentarios HTML de inicio/fin de sección
    - _Requirements: 3.1, 3.2, 8.2, 9.2_

  - [x] 4.2 Escribir estilos CSS de la sección Categorías en `style.css`
    - Base móvil: `.cards-grid` como CSS Grid de 1 columna, `gap: var(--spacing-lg)`, `.product-card` con `background: --color-surface`, `border-radius`, `padding`, `box-shadow` sutil
    - Media query `≥768px`: `grid-template-columns: repeat(2, 1fr)`
    - Media query `≥992px`: `grid-template-columns: repeat(4, 1fr)`
    - Hover (desktop): `.product-card:hover { transform: translateY(-6px); box-shadow: 0 8px 24px rgba(0,0,0,0.12); transition: 0.25s ease; }`
    - _Requirements: 3.3, 3.5, 7.1, 7.2_

  - [x] 4.3 Implementar renderizado dinámico de tarjetas desde CONFIG en `script.js`
    - Función `renderCategorias()`: itera `CONFIG.categorias`, construye el innerHTML de cada `.product-card` y lo inserta en `.cards-grid`; si el contenedor ya tiene hijos, lo vacía antes de insertar (garantiza idempotencia)
    - _Requirements: 3.1, 3.2, 9.3_

  - [x]* 4.4 Escribir property test — Property 3: Renderizado completo de tarjetas
    - **Property 3: Renderizado completo de tarjetas de categorías**
    - **Validates: Requirements 3.1, 3.2**
    - Usar `fc.array(fc.record({ nombre: fc.string({ minLength: 1 }), descripcion: fc.string(), icono: fc.string() }), { minLength: 1 })` para generar arrays arbitrarios de categorías
    - Verificar que el DOM contiene exactamente `N` elementos `.product-card` para un array de `N` categorías y que cada tarjeta contiene nombre y descripción del ítem correspondiente

  - [x]* 4.5 Escribir property test — Property 4: Inyección de datos idempotente
    - **Property 4: Inyección de datos del negocio es idempotente**
    - **Validates: Requirements 9.3**
    - Generar un `CONFIG` arbitrario válido con `fc.record(...)`, llamar `initPage()` dos veces consecutivas sobre el mismo DOM y verificar que el resultado observable (`.product-card` count, textos inyectados) es idéntico al de una sola llamada

- [x] 5. Checkpoint — verificar estructura y categorías
  - Asegurarse de que todos los tests anteriores pasan; consultar al usuario si surgen dudas sobre el contenido real del negocio (nombre, eslogan, descripción, categorías).

- [x] 6. Implementar Sección Nosotros
  - [x] 6.1 Escribir HTML semántico de la sección Nosotros en `index.html`
    - Agregar `<section id="nosotros">` con `<div class="nosotros-grid">` que contiene `<div class="nosotros-text">` (`<h2>Nosotros</h2>`, `<p>`) y `<div class="nosotros-info">` (`<h3>Horario</h3>`, `<p>`, `<h3>Dirección</h3>`, `<address>`)
    - Incluir comentarios HTML de inicio/fin de sección
    - _Requirements: 4.1, 4.2, 4.3, 8.2, 9.2_

  - [x] 6.2 Escribir estilos CSS de la sección Nosotros en `style.css`
    - Base móvil: `.nosotros-grid` como columna única, `padding: var(--section-padding)`, tipografía y colores de acuerdo a la paleta
    - Media query `≥992px`: `grid-template-columns: 1fr 1fr`, `gap: var(--spacing-xl)`
    - _Requirements: 4.4, 7.1, 7.2_

  - [x] 6.3 Inyectar datos de Nosotros desde CONFIG en `script.js`
    - En `initPage()`: seleccionar los elementos de `#nosotros` e inyectar `CONFIG.contacto.horario` y `CONFIG.contacto.direccion` en sus respectivos contenedores; verificar existencia de nodos antes de asignar
    - _Requirements: 4.2, 4.3, 9.3_

- [x] 7. Implementar Sección Contacto y Formulario
  - [x] 7.1 Escribir HTML semántico de la sección Contacto en `index.html`
    - Agregar `<section id="contacto">` con `<div class="contacto-grid">` que contiene `<form id="contact-form" novalidate>` (campos nombre, teléfono, mensaje con `<label>`, `<input>`/`<textarea>`, `<span class="error-msg" role="alert">`, botón submit, `<div id="form-confirmation" role="status" aria-live="polite">`) y `<div class="contacto-info">` con teléfono `href="tel:"`, email `href="mailto:"` y dirección
    - Incluir comentarios HTML de inicio/fin de sección
    - _Requirements: 5.1, 5.4, 5.5, 5.6, 8.2, 9.2_

  - [x] 7.2 Escribir estilos CSS de la sección Contacto en `style.css`
    - Base móvil: `.contacto-grid` columna única, `.form-group` con `display: flex; flex-direction: column; gap: var(--spacing-sm)`, `<input>` y `<textarea>` con `border: 1px solid --color-border`, `padding`, `font-size: 16px`, `border-radius`; `.error-msg` con `color: --color-error`, oculto por defecto; `#form-confirmation` con `color: --color-success`
    - Media query `≥992px`: `.contacto-grid` con `grid-template-columns: 1fr 1fr`, `gap: var(--spacing-xl)`
    - Estilo `:focus-visible` en inputs, textarea y button para indicador de foco visible
    - _Requirements: 5.1, 7.1, 7.2, 8.5, 8.6_

  - [x] 7.3 Implementar validación del formulario en `script.js`
    - Función `initForm()`: agrega `novalidate` al formulario vía JS (progressive enhancement), listener `submit` con `preventDefault()`; valida `nombre.trim().length > 0` y `mensaje.trim().length > 0`; para cada campo inválido muestra el `.error-msg` correspondiente; si es válido, muestra `#form-confirmation`, limpia campos y hace scroll al mensaje
    - Limpiar errores `oninput` en cada campo para feedback inmediato
    - _Requirements: 5.2, 5.3_

  - [x] 7.4 Inyectar datos de contacto desde CONFIG en `script.js`
    - En `initPage()`: inyectar `CONFIG.contacto.telefono` / `CONFIG.contacto.telefonoHref` en `href="tel:"` y texto visible, `CONFIG.contacto.email` en `href="mailto:"` y texto, `CONFIG.contacto.direccion` en los nodos `<address>` de contacto
    - _Requirements: 5.4, 5.5, 5.6, 9.3_

  - [x]* 7.5 Escribir property test — Property 1: Validación de campos requeridos
    - **Property 1: Validación de campos requeridos**
    - **Validates: Requirements 5.2**
    - Usar `fc.stringMatching(/^\s*$/)` (cadenas de solo espacios o vacías) para los campos nombre y mensaje
    - Verificar que para cualquier entrada de solo espacios en blanco la función de validación retorna `false` y el mensaje de error resultante es una cadena no vacía

- [x] 8. Implementar Footer
  - [x] 8.1 Escribir HTML semántico del Footer en `index.html`
    - Agregar `<footer id="footer">` con `.footer-content`: `<p class="footer-brand">`, `<p class="footer-copy">© <span id="footer-year"></span></p>`, `<nav class="footer-nav" aria-label="Navegación del pie de página">` con `<ul>` de enlaces a secciones, `<div class="footer-social">` con `<a>` para Facebook e Instagram (`target="_blank"`, `rel="noopener noreferrer"`, `aria-label`)
    - Incluir comentarios HTML de inicio/fin de sección
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 8.2, 9.2_

  - [x] 8.2 Escribir estilos CSS del Footer en `style.css`
    - Base móvil: `background: --color-primary`, texto blanco, `.footer-content` centrado con `padding`, `.footer-nav ul` como lista horizontal con `flex-wrap`, `.footer-social` con íconos SVG de 24 px, espacio entre elementos
    - Media query `≥768px`: layout en fila con `justify-content: space-between`
    - _Requirements: 10.1, 10.2, 10.3, 7.1_

  - [x] 8.3 Inyectar año y datos del footer desde CONFIG en `script.js`
    - En `initPage()`: `document.getElementById('footer-year').textContent = new Date().getFullYear()`; inyectar URLs de redes sociales desde `CONFIG.redes` en los `<a>` del footer social; inyectar `CONFIG.negocio.nombre` en `.footer-brand`
    - _Requirements: 10.1, 10.2, 9.3_

  - [x]* 8.4 Escribir property test — Property 5: Año del footer siempre es el año actual
    - **Property 5: Año del footer siempre es el año actual**
    - **Validates: Requirements 10.1**
    - Verificar que la función que genera el año del footer retorna exactamente `String(new Date().getFullYear())` independientemente de cuántas veces sea invocada; usar `fc.integer({ min: 1, max: 100 })` para controlar el número de invocaciones

- [x] 9. Implementar Botón flotante de WhatsApp
  - [x] 9.1 Escribir HTML del botón WhatsApp en `index.html`
    - Agregar `<a id="whatsapp-btn" href="#" target="_blank" rel="noopener noreferrer" aria-label="Contactar por WhatsApp">` con SVG inline del logotipo de WhatsApp, fuera de `<main>` y antes del cierre de `<body>`
    - _Requirements: 6.1, 6.2, 6.4, 8.1_

  - [x] 9.2 Escribir estilos CSS del botón WhatsApp en `style.css`
    - `position: fixed; bottom: 24px; right: 24px; z-index: 9999; width: 56px; height: 56px; border-radius: 50%; background: --color-whatsapp; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 16px rgba(0,0,0,0.25)`
    - Hover: ligero `scale(1.08)` con transición, `:focus-visible` con outline visible
    - _Requirements: 6.1, 6.2, 6.4, 8.6_

  - [x] 9.3 Implementar construcción de URL WhatsApp en `script.js`
    - Función `initWhatsApp()`: si `CONFIG.whatsapp.numero` existe y no está vacío, construir `href = "https://wa.me/" + CONFIG.whatsapp.numero + "?text=" + encodeURIComponent(CONFIG.whatsapp.mensaje)` y asignarlo a `#whatsapp-btn`; si el número no está configurado, ocultar el botón con `display: none`
    - _Requirements: 6.3_

  - [x]* 9.4 Escribir property test — Property 2: URL de WhatsApp construida correctamente
    - **Property 2: URL de WhatsApp construida correctamente**
    - **Validates: Requirements 6.3**
    - Usar `fc.string({ minLength: 1 })` para números y mensajes arbitrarios (sin caracteres de control: `fc.string({ minLength: 1 }).filter(s => !/[\x00-\x1F]/.test(s))`)
    - Verificar que la URL generada comienza con `"https://wa.me/"`, contiene el número exacto, contiene `"?text="` y que el segmento de mensaje es el resultado de `encodeURIComponent(mensaje)`

- [x] 10. Checkpoint — verificar comportamientos JS y property tests
  - Asegurarse de que todos los tests pasan (unit + property-based); verificar manualmente en navegador el sticky nav, hamburguesa y smooth scroll; consultar al usuario si surgen dudas.

- [x] 11. Revisión de accesibilidad
  - [x] 11.1 Auditar atributos `alt`, `aria` e indicadores de foco en `index.html` y `style.css`
    - Verificar que todas las `<img>` tienen `alt` descriptivo (o `alt=""` si son decorativas)
    - Verificar `aria-label` en todos los íconos SVG interactivos y en los `<nav>` principales
    - Verificar que `:focus-visible` tiene outline con contraste ≥ 3:1 contra el fondo adyacente en todos los elementos interactivos (botones, links, inputs, textarea)
    - Verificar en DevTools que no hay elementos interactivos con `tabindex="-1"` involuntario ni trampas de teclado
    - _Requirements: 8.1, 8.2, 8.5, 8.6_

  - [x] 11.2 Verificar contraste de texto en `style.css`
    - Confirmar ratio ≥ 4.5:1 para texto de cuerpo sobre su fondo usando las variables CSS de la paleta definida
    - Ajustar si algún par color/fondo no cumple WCAG 2.1 AA
    - _Requirements: 8.5_

- [x] 12. Crear README.md con instrucciones en español
  - Crear `README.md` en la raíz del proyecto con las secciones: descripción del proyecto, estructura de archivos, instrucciones para actualizar datos del negocio (cómo editar el objeto CONFIG), instrucciones para cambiar colores y tipografías (variables CSS), instrucciones para cambiar íconos de categorías, cómo ejecutar los tests, cómo visualizar el sitio localmente (abrir `index.html` en navegador)
  - _Requirements: 9.5_

- [x] 13. Configurar entorno de testing e integrar tests
  - [x] 13.1 Configurar Vitest y fast-check en el proyecto
    - Crear `package.json` con `"type": "module"`, dependencias de desarrollo: `vitest` y `fast-check` con versiones exactas
    - Crear `vitest.config.js` con `environment: 'jsdom'` y `globals: true`
    - Crear carpeta `tests/` con archivo `setup.js` si es necesario para inicializar jsdom
    - _Requirements: (soporte a todas las propiedades de corrección)_

  - [x] 13.2 Exportar funciones puras de `script.js` para testing
    - Refactorizar `script.js` para que las funciones `validateField`, `buildWhatsAppUrl`, `renderCategorias`, `initPage` y la función del año del footer sean exportables como módulo ES (usar `export` con guard `if (typeof window !== 'undefined')` para los listeners del DOM)
    - _Requirements: 9.1_

  - [x]* 13.3 Escribir unit tests de ejemplo (ejemplo-based) en `tests/unit.test.js`
    - Casos: `validateField("") → error`, `validateField("   ") → error`, `validateField("texto") → válido`, `buildWhatsAppUrl("541234","hola") → URL correcta`, `footerYear() === String(new Date().getFullYear())`, 4 categorías en CONFIG → 4 `.product-card`
    - _Requirements: 5.2, 6.3, 10.1, 3.1_

  - [x]* 13.4 Consolidar los 5 property tests en `tests/properties.test.js`
    - Reunir en un único archivo los 5 tests de propiedades ya escritos en las tareas 4.4, 4.5, 7.5, 8.4, 9.4 con mínimo 100 iteraciones cada uno (`fc.assert(fc.property(...), { numRuns: 100 })`)
    - _Requirements: 5.2, 6.3, 3.1, 3.2, 9.3, 10.1_

- [x] 14. Checkpoint final — todos los tests pasan
  - Ejecutar `vitest --run` y verificar que todos los tests (unit + property-based) pasan sin errores; revisar el sitio en navegador en 320 px, 768 px y 992 px; consultar al usuario si surgen dudas antes de finalizar.

---

## Notes

- Las sub-tareas marcadas con `*` son opcionales y pueden omitirse para un MVP más rápido.
- Cada tarea referencia requisitos específicos para trazabilidad completa.
- Los checkpoints (tareas 5, 10, 14) son puntos de validación incremental; no generan código.
- Los 5 property tests (`fc.assert`) deben ejecutarse con `numRuns: 100` como mínimo.
- Las funciones de `script.js` deben ser exportables como módulo ES para poder ser testeadas; usar el guard `if (typeof window !== 'undefined')` para aislar los listeners del DOM.
- La tarea 13.2 es prerequisito de las tareas de testing 13.3 y 13.4 y de los property tests individuales (4.4, 4.5, 7.5, 8.4, 9.4).
- Los tests de layout responsive, sticky nav y efectos hover se validan manualmente en navegador (no son aptos para PBT).

---

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1"] },
    { "id": 1, "tasks": ["2.1", "3.1", "4.1", "6.1", "7.1", "8.1", "9.1"] },
    { "id": 2, "tasks": ["2.2", "3.2", "4.2", "6.2", "7.2", "8.2", "9.2"] },
    { "id": 3, "tasks": ["2.3", "4.3", "6.3", "7.3", "7.4", "8.3", "9.3"] },
    { "id": 4, "tasks": ["11.1", "11.2", "12", "13.1"] },
    { "id": 5, "tasks": ["13.2"] },
    { "id": 6, "tasks": ["4.4", "4.5", "7.5", "8.4", "9.4", "13.3"] },
    { "id": 7, "tasks": ["13.4"] }
  ]
}
```
