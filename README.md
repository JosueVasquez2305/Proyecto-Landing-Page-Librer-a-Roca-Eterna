# Librería y Bazar Roca Eterna — Sitio web

## 1. Descripción del proyecto

Este es el sitio web oficial de **Librería y Bazar Roca Eterna**. Se trata de una landing page (página de presentación) que muestra las categorías de productos del negocio, la información de contacto, el horario de atención y un formulario de consulta.

El sitio está hecho con tecnologías web básicas (HTML, CSS y JavaScript), por lo que no necesita servidor ni instalación especial para funcionar: se abre directamente en el navegador.

---

## 2. Estructura de archivos

```
Proyecto Landing Page LBRE/
├── index.html   → Estructura de la página (secciones, textos estáticos, navegación)
├── style.css    → Diseño visual: colores, tipografías, tamaños, distribución
├── script.js    → Datos del negocio (CONFIG) y comportamiento dinámico de la página
└── README.md    → Este archivo: instrucciones de uso y mantenimiento
```

| Archivo | Qué hace |
|---|---|
| `index.html` | Define la estructura del sitio: el menú, el encabezado, las secciones y el pie de página. La mayoría del contenido de texto se inyecta desde `script.js`. |
| `style.css` | Controla todo el aspecto visual: colores, tipografías, tamaños de texto, espaciados y cómo se ve el sitio en distintos dispositivos (celular, tablet, escritorio). |
| `script.js` | Contiene el objeto `CONFIG` con todos los datos del negocio y el código que los muestra en la página. También maneja el menú hamburguesa y la validación del formulario. |
| `README.md` | Documentación del proyecto: instrucciones para visualizarlo, editarlo y mantenerlo. |

---

## 3. Cómo visualizar el sitio localmente

1. Abrí la carpeta del proyecto en tu explorador de archivos.
2. Hacé doble clic sobre el archivo `index.html`.
3. El sitio se abrirá en tu navegador web predeterminado (Chrome, Firefox, Edge, etc.).

No se necesita instalar nada ni tener conexión a internet (salvo para cargar las tipografías de Google Fonts).

---

## 4. Cómo actualizar los datos del negocio

Todos los datos del negocio están centralizados en el objeto `CONFIG` al inicio del archivo `script.js`. Para actualizarlos, abrí ese archivo con un editor de texto (como el Bloc de notas, VS Code o similar) y modificá los valores entre comillas.

### Estructura del objeto CONFIG

```js
const CONFIG = {

  negocio: {
    nombre:      'Librería y Bazar Roca Eterna', // Nombre del negocio
    eslogan:     'Todo lo que necesitás, en un solo lugar', // Eslogan del hero
    descripcion: 'Texto que aparece en la sección Nosotros...', // Descripción larga
  },

  contacto: {
    telefono:     '+54 XXX XXX-XXXX', // Número visible en pantalla
    telefonoHref: '+54XXXXXXXXXX',    // Número para el enlace "tel:" (sin espacios ni guiones)
    email:        'rocaeterna@ejemplo.com',
    direccion:    'Calle Ejemplo 123, Ciudad, Provincia',
    horario:      'Lunes a Sábado: 9:00 – 13:00 / 17:00 – 21:00',
  },

  whatsapp: {
    numero:  '54XXXXXXXXXX', // Sin "+" ni espacios. Ej. Argentina: "541123456789"
    mensaje: 'Hola, me comunico desde la web. Quisiera hacer una consulta.',
  },

  redes: {
    facebook:  'https://facebook.com/rocaeterna',  // URL completa de la página
    instagram: 'https://instagram.com/rocaeterna', // URL completa del perfil
  },

  categorias: [ /* ... ver sección 5 ... */ ],
};
```

### Ejemplo: cómo cambiar el teléfono

Ubicá estas dos líneas dentro de `contacto` y reemplazá los valores:

```js
// Antes:
telefono:     '+54 XXX XXX-XXXX',
telefonoHref: '+54XXXXXXXXXX',

// Después (ejemplo con número real):
telefono:     '+54 11 2345-6789',
telefonoHref: '+541123456789',
```

- `telefono` es el número formateado que se muestra en pantalla.
- `telefonoHref` es el mismo número sin espacios ni guiones, para que el enlace funcione al tocar desde el celular.

> **Tip:** Si no tenés Facebook o Instagram, dejá el valor como cadena vacía `""` y el ícono de esa red se ocultará automáticamente.

---

## 5. Cómo actualizar las categorías de productos

Las categorías se definen en el array `CONFIG.categorias` dentro de `script.js`. Cada categoría es un objeto con cuatro campos:

```js
{
  id:          'identificador-unico', // Solo letras, sin espacios (no se muestra en pantalla)
  nombre:      'Nombre de la categoría',
  descripcion: 'Descripción breve del rubro (máximo 20 palabras).',
  icono:       '📚', // Emoji que aparece en la tarjeta
}
```

### Agregar una categoría

Copiá uno de los objetos existentes, pegalo antes del `]` de cierre del array y editá sus valores:

```js
categorias: [
  // ... categorías existentes ...
  {
    id:          'juguetes',
    nombre:      'Juguetes y Juegos',
    descripcion: 'Juguetes didácticos, juegos de mesa y entretenimiento.',
    icono:       '🎲',
  },
],
```

### Editar una categoría existente

Buscá el objeto con el `id` correspondiente y modificá los campos que necesitás. Por ejemplo, para cambiar la descripción de Electrónica:

```js
// Antes:
descripcion: 'Accesorios, cables, pilas y gadgets del hogar.',

// Después:
descripcion: 'Cables, cargadores, pilas, auriculares y más.',
```

### Quitar una categoría

Eliminá el objeto completo (desde `{` hasta `},`) del array `CONFIG.categorias`. Asegurate de que las comas entre objetos queden correctas.

---

## 6. Cómo cambiar los colores

Los colores del sitio se definen como **variables CSS** en la sección `:root` al inicio del archivo `style.css`. Modificar un valor ahí lo cambia en todo el sitio automáticamente.

```css
:root {
  --color-primary:        #2C5F8A;  /* Azul profundo — nav, botones principales */
  --color-primary-dark:   #1E4266;  /* Versión oscura del primario, para hover */
  --color-secondary:      #E8A020;  /* Ámbar dorado — botón CTA y acentos */
  --color-secondary-dark: #C8881A;  /* Hover del botón CTA */
  --color-bg:             #F8F5F0;  /* Fondo general de la página */
  --color-surface:        #FFFFFF;  /* Fondo de tarjetas y formulario */
  --color-text:           #1A1A2E;  /* Color del texto principal */
  --color-text-muted:     #5A5A72;  /* Texto secundario y descripciones */
  --color-whatsapp:       #25D366;  /* Botón flotante de WhatsApp */
}
```

**Ejemplo:** para cambiar el azul principal por un verde oscuro:

```css
--color-primary: #2D6A4F;
```

Los colores están en formato hexadecimal (`#RRGGBB`). Podés usar cualquier herramienta de selección de color online (como [coolors.co](https://coolors.co)) para elegir uno.

> **Importante:** verificá que el contraste entre el color del texto y el fondo sea suficiente para que el sitio sea legible. Se recomienda un contraste mínimo de 4.5:1 para texto normal.

---

## 7. Cómo cambiar las tipografías

Las tipografías se controlan en dos lugares:

### 1. Variables en `style.css`

Al inicio de `style.css`, dentro de `:root`, encontrarás:

```css
--font-base:    'Inter', system-ui, -apple-system, sans-serif;
--font-heading: 'Playfair Display', Georgia, serif;
```

- `--font-base`: tipografía para el cuerpo del texto (párrafos, menú, formulario).
- `--font-heading`: tipografía para los títulos (`h1`, `h2`, `h3`).

### 2. Enlace de Google Fonts en `index.html`

Las fuentes se cargan desde Google Fonts. El enlace está en el `<head>` de `index.html`:

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet" />
```

**Para cambiar una tipografía:**

1. Entrá a [fonts.google.com](https://fonts.google.com) y elegí la fuente que querés.
2. Seleccioná los pesos (400, 700, etc.) y copiá el enlace `<link>` que te proporciona Google.
3. Reemplazá el enlace existente en `index.html`.
4. Actualizá el nombre de la fuente en la variable correspondiente de `style.css`.

**Ejemplo:** reemplazar `Inter` por `Lato`:

```html
<!-- En index.html, reemplazar el link existente por: -->
<link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;500;600&family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet" />
```

```css
/* En style.css, actualizar la variable: */
--font-base: 'Lato', system-ui, -apple-system, sans-serif;
```

---

## 8. Cómo ejecutar los tests

Cuando el entorno de pruebas esté configurado, los pasos son:

1. Asegurate de tener [Node.js](https://nodejs.org) instalado en tu computadora.
2. Abrí una terminal en la carpeta del proyecto.
3. Instalá las dependencias (solo la primera vez):
   ```bash
   npm install
   ```
4. Ejecutá los tests:
   ```bash
   npm test
   ```

Los resultados aparecerán en la terminal, indicando qué pruebas pasaron y cuáles fallaron.

---

## 9. Notas de mantenimiento

### El sitio no tiene backend

Este sitio es completamente estático: no hay servidor, base de datos ni procesamiento en el servidor. Todo funciona en el navegador del visitante.

### El formulario de contacto no envía emails

Cuando alguien completa y envía el formulario, **la página muestra un mensaje de confirmación visual**, pero el mensaje **no llega a ningún correo electrónico**. Esto es intencional en esta versión del proyecto.

Si querés activar el envío real de emails, podés integrar uno de estos servicios gratuitos sin necesidad de programar un servidor:

- **[Formspree](https://formspree.io):** cambiás el `action` del formulario en `index.html` por la URL que te dan ellos.
- **[EmailJS](https://www.emailjs.com):** se integra con unas pocas líneas de JavaScript en `script.js`.

### Actualizaciones de datos

Para cualquier cambio de teléfono, dirección, horario, categorías o redes sociales, **solo es necesario editar el objeto `CONFIG` en `script.js`**. No hace falta tocar el HTML ni el CSS.

### Compatibilidad

El sitio está optimizado para funcionar en las versiones actuales de Chrome, Firefox, Edge y Safari, tanto en escritorio como en dispositivos móviles desde 320px de ancho en adelante.
