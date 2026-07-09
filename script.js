/**
 * script.js — Librería y Bazar Roca Eterna
 *
 * ESTRUCTURA:
 *   1. CONFIG       — Datos del negocio (EDITÁ AQUÍ para actualizar contenido)
 *   2. initPage()   — Inyección de datos en el DOM al cargar la página
 *   3. initNav()    — Menú hamburguesa + sticky header
 *   4. initForm()   — Validación del formulario de contacto
 *   5. Inicialización — Solo en entorno de navegador (guard window)
 *   6. Exports      — Funciones puras exportadas para testing
 */

/* ================================================================
   1. CONFIGURACIÓN DEL NEGOCIO
   ================================================================
   MANTENIMIENTO: Editá solo este objeto para actualizar los datos
   del negocio sin tocar el HTML ni el CSS.
   ================================================================ */
const CONFIG = {

  /**
   * Información general del negocio.
   * - nombre    : aparece en el <h1> del hero, el footer y la pestaña del navegador
   * - eslogan   : se muestra debajo del nombre en el hero
   * - descripcion: texto de la sección "Nosotros"
   */
  negocio: {
    nombre:      'Librería y Bazar Roca Eterna',
    eslogan:     'Siempre contigo'
    descripcion: 'Somos un negocio familiar con años de trayectoria en el barrio. '
                + 'Ofrecemos una amplia variedad de productos: desde útiles escolares '
                + 'y artículos de oficina, hasta electrónica, belleza y artículos del hogar. '
                + 'Nuestro compromiso es brindarte calidad, variedad y atención personalizada.',
  },

  /**
   * Datos de contacto.
   * - telefono     : formato legible para mostrar en pantalla (+54 XXX XXX-XXXX)
   * - telefonoHref : sin espacios ni guiones, para href="tel:..." (+54XXXXXXXXXX)
   * - email        : dirección de correo electrónico
   * - direccion    : dirección física del local
   * - horario      : horario de atención (puede incluir saltos de línea con \n)
   */
  contacto: {
    telefono:     '+503 78147401',
    telefonoHref: '+50378147401',
    email:        'vreportillo@gmail.com',
    direccion:    'Km 19 1/2 carretera antigua a zacatecoluca, Olocuilta, La Paz',
    horario:      'Domingo a Domingo: 8:00 – 20:00'
  },

  /**
   * WhatsApp.
   * - numero  : número de teléfono SIN "+" ni espacios (código de país + número)
   *             Ejemplo Argentina: "541123456789"
   * - mensaje : mensaje predefinido que se abre al hacer clic en el botón flotante
   */
  whatsapp: {
    numero:  '50378147401',
    mensaje: 'Hola, me comunico desde la web. Quisiera hacer una consulta.',
  },

  /**
   * Redes sociales.
   * Reemplazá las URLs con las páginas reales del negocio.
   * Si no tenés alguna red social, dejá el valor como cadena vacía "".
   */
  redes: {
    facebook:  'https://www.facebook.com/bazarrocaeterna',
    tiktok: 'https://www.tiktok.com/@rocaeterna2025',
  },

  /**
   * Categorías de productos.
   * Cada objeto tiene:
   * - id          : identificador único (no se muestra, se usa internamente)
   * - nombre      : título de la tarjeta
   * - descripcion : descripción breve (máx. 20 palabras)
   * - icono       : emoji o código SVG inline para el ícono de la tarjeta
   */
  categorias: [
    {
      id:          'libreria',
      nombre:      'Librería y Papelería',
      descripcion: 'Cuadernos, útiles escolares y artículos de oficina.',
      icono:       '📚',
    },
    {
      id:          'electronica',
      nombre:      'Electrónica',
      descripcion: 'Accesorios, cables, y gadgets del hogar.',
      icono:       '🔌',
    },
    {
      id:          'belleza',
      nombre:      'Belleza y Cuidado Personal',
      descripcion: 'Cosméticos, higiene y productos de cuidado diario.',
      icono:       '💄',
    },
    {
      id:          'tienda',
      nombre:      'Tienda General',
      descripcion: 'Artículos del hogar, limpieza y mucho más.',
      icono:       '🛒',
    },
  ],
};

/* ================================================================
   2. INYECCIÓN DE DATOS EN EL DOM
   ================================================================
   initPage() recorre el DOM y puebla los elementos con los datos
   de CONFIG. Se puede llamar múltiples veces sin duplicar datos
   (idempotente: sobreescribe, no acumula).
   ================================================================ */

/**
 * Devuelve el año actual como string.
 * @returns {string} Año actual (p. ej. "2025")
 */
function getFooterYear() {
  return String(new Date().getFullYear());
}

/**
 * Inyecta todos los datos de CONFIG en el DOM.
 * Llamar esta función cada vez que se quiera refrescar los datos.
 */
function initPage() {
  // --- Año del footer ---
  const footerYear = document.getElementById('footer-year');
  if (footerYear) {
    footerYear.textContent = getFooterYear();
  }

  // --- Sección Nosotros ---
  const nosotrosDesc = document.getElementById('nosotros-descripcion');
  if (nosotrosDesc) {
    nosotrosDesc.textContent = CONFIG.negocio.descripcion;
  }

  const nosotrosHorario = document.getElementById('nosotros-horario');
  if (nosotrosHorario) {
    nosotrosHorario.textContent = CONFIG.contacto.horario;
  }

  const nosotrosDireccion = document.getElementById('nosotros-direccion');
  if (nosotrosDireccion) {
    nosotrosDireccion.textContent = CONFIG.contacto.direccion;
  }

  // --- Sección Contacto —— teléfono y email ---
  const telefonoLink = document.getElementById('contacto-telefono-link');
  if (telefonoLink) {
    telefonoLink.href        = 'tel:' + CONFIG.contacto.telefonoHref;
    telefonoLink.textContent = CONFIG.contacto.telefono;
  }

  const emailLink = document.getElementById('contacto-email-link');
  if (emailLink) {
    emailLink.href        = 'mailto:' + CONFIG.contacto.email;
    emailLink.textContent = CONFIG.contacto.email;
  }

  const contactoDireccion = document.getElementById('contacto-direccion');
  if (contactoDireccion) {
    contactoDireccion.textContent = CONFIG.contacto.direccion;
  }

  // --- Footer: nombre del negocio, año y redes sociales ---
  const footerBrand = document.querySelector('.footer-brand');
  if (footerBrand) {
    footerBrand.textContent = CONFIG.negocio.nombre;
  }

  const fbLink = document.getElementById('footer-facebook');
  if (fbLink) {
    if (CONFIG.redes.facebook) {
      fbLink.href = CONFIG.redes.facebook;
    } else {
      fbLink.style.display = 'none';
    }
  }

  const ttLink = document.getElementById('footer-tiktok');
  if (ttLink) {
    if (CONFIG.redes.tiktok) {
      ttLink.href = CONFIG.redes.tiktok;
    } else {
      ttLink.style.display = 'none';
    }
  }

  // --- Botón flotante de WhatsApp ---
  const waBtn = document.getElementById('whatsapp-btn');
  if (waBtn) {
    if (CONFIG.whatsapp.numero) {
      const waUrl = buildWhatsAppUrl(CONFIG.whatsapp.numero, CONFIG.whatsapp.mensaje);
      waBtn.href = waUrl;
    } else {
      // Ocultar el botón si no hay número configurado
      waBtn.style.display = 'none';
    }
  }

  // --- Tarjetas de categorías ---
  renderCategoryCards(CONFIG.categorias, document.getElementById('cards-grid'));
}

/**
 * Construye la URL de WhatsApp con número y mensaje codificado.
 * @param {string} numero  - Número de teléfono sin "+" ni espacios
 * @param {string} mensaje - Texto del mensaje predefinido
 * @returns {string} URL completa para wa.me
 */
function buildWhatsAppUrl(numero, mensaje) {
  return 'https://wa.me/' + numero + '?text=' + encodeURIComponent(mensaje);
}

/**
 * Renderiza las tarjetas de categorías en el elemento de grilla dado.
 * Limpia el contenedor antes de renderizar (idempotente).
 * @param {Array}   categorias - Array de objetos con { id, nombre, descripcion, icono }
 * @param {Element} grid       - Elemento DOM contenedor donde se insertan las tarjetas
 */
function renderCategoryCards(categorias, grid) {
  if (!grid) return;

  // Limpiar el contenedor (idempotente: evita duplicados en llamadas sucesivas)
  grid.innerHTML = '';

  categorias.forEach(function (categoria) {
    const article = document.createElement('article');
    article.className = 'product-card';

    article.innerHTML =
      '<div class="card-icon" aria-hidden="true">' + categoria.icono + '</div>'
      + '<h3 class="card-title">' + escapeHtml(categoria.nombre) + '</h3>'
      + '<p class="card-desc">' + escapeHtml(categoria.descripcion) + '</p>';

    grid.appendChild(article);
  });
}

/**
 * Escapa caracteres especiales HTML para prevenir inyección de HTML.
 * @param {string} str - Cadena a escapar
 * @returns {string} Cadena con caracteres HTML escapados
 */
function escapeHtml(str) {
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
  return String(str).replace(/[&<>"']/g, function (char) { return map[char]; });
}

/* ================================================================
   3. NAVEGACIÓN: HAMBURGUESA + STICKY HEADER
   ================================================================ */

/**
 * Inicializa el menú hamburguesa y el comportamiento sticky del header.
 */
function initNav() {
  const header    = document.getElementById('header');
  const hamburger = document.querySelector('.hamburger');
  const navLinks  = document.getElementById('nav-links');

  // --- Menú hamburguesa ---
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      const isOpen = navLinks.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    // Cerrar menú al hacer clic en un enlace (útil en móvil)
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // --- Sticky header: se activa en viewport ≥ 768px con scroll > 80px ---
  if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 80 && window.innerWidth >= 768) {
        header.classList.add('sticky');
      } else {
        header.classList.remove('sticky');
      }
    }, { passive: true });
  }

  // --- Smooth scroll para enlaces ancla ---
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (event) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        event.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

/* ================================================================
   4. VALIDACIÓN DEL FORMULARIO DE CONTACTO
   ================================================================ */

/**
 * Inicializa la validación del formulario con mensajes de error personalizados.
 * El atributo `novalidate` en el <form> desactiva la validación nativa
 * para usar esta implementación con mensajes descriptivos en español.
 */
function initForm() {
  const form         = document.getElementById('contact-form');
  const confirmation = document.getElementById('form-confirmation');

  if (!form) return;

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const nombreInput  = form.querySelector('#nombre');
    const mensajeInput = form.querySelector('#mensaje');

    // Validar ambos campos antes de combinar (evita short-circuit que oculte errores)
    const nombreValido  = validateRequired(nombreInput,  'El nombre es requerido.');
    const mensajeValido = validateRequired(mensajeInput, 'El mensaje es requerido.');
    const isValid = nombreValido && mensajeValido;

    if (!isValid) {
      // Mover el foco al primer campo con error
      const firstError = form.querySelector('.error');
      if (firstError) firstError.focus();
      return;
    }

    // Envío exitoso: mostrar confirmación y limpiar formulario
    if (confirmation) {
      confirmation.textContent = '¡Gracias por tu mensaje! Nos pondremos en contacto a la brevedad.';
      confirmation.className = 'success';
      confirmation.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    form.reset();
  });

  // Limpiar error al editar cada campo
  form.querySelectorAll('input, textarea').forEach(function (field) {
    field.addEventListener('input', function () {
      clearFieldError(this);
    });
  });
}

/**
 * Valida que un campo requerido no esté vacío ni tenga solo espacios.
 * @param {HTMLInputElement|HTMLTextAreaElement} input - Campo a validar
 * @param {string} errorMessage - Mensaje de error a mostrar
 * @returns {boolean} true si el campo es válido
 */
function validateRequired(input, errorMessage) {
  const errorSpan = input.parentElement.querySelector('.error-msg');

  if (!input.value.trim()) {
    input.classList.add('error');
    if (errorSpan) errorSpan.textContent = errorMessage;
    return false;
  }

  clearFieldError(input);
  return true;
}

/**
 * Elimina el estado de error visual de un campo.
 * @param {HTMLInputElement|HTMLTextAreaElement} input - Campo a limpiar
 */
function clearFieldError(input) {
  input.classList.remove('error');
  const errorSpan = input.parentElement && input.parentElement.querySelector('.error-msg');
  if (errorSpan) errorSpan.textContent = '';
}

/* ================================================================
   5. INICIALIZACIÓN
   Registrar listeners solo cuando estamos en un navegador real.
   El guard permite importar las funciones puras en entornos Node/test
   sin que el código intente acceder a `document` o `window`.
   ================================================================ */
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', function () {
    initPage();   // Inyectar datos del negocio
    initNav();    // Menú hamburguesa + sticky header + smooth scroll
    initForm();   // Validación del formulario de contacto
  });
}

/* ================================================================
   6. EXPORTS (módulo ES — para testing y reutilización)
   ================================================================ */
export { CONFIG, buildWhatsAppUrl, renderCategoryCards, validateRequired, escapeHtml, getFooterYear };
