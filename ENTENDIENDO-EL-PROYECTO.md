# Entendiendo el proyecto — Guía para el mantenedor

Este documento existe para que puedas entender **por qué existe cada archivo y carpeta** que no escribiste a mano. No es obligatorio que entiendas todo esto para mantener el sitio — los tres archivos que necesitás tocar son `index.html`, `style.css` y `script.js`. Pero si alguna vez te preguntás "¿esto para qué sirve?", acá está la respuesta.

---

## La estructura completa del proyecto

```
Proyecto Landing Page LBRE/
│
│   ← Estos 4 son los que vos mantenés
├── index.html
├── style.css
├── script.js
├── README.md
│
│   ← Estos los generó Kiro para hacer pruebas automáticas
├── package.json
├── vitest.config.js
│
│   ← Esta carpeta la creó npm automáticamente
├── node_modules/
│
│   ← Esta carpeta tiene los archivos de prueba
├── tests/
│   ├── setup.js
│   ├── unit.test.js
│   └── properties.test.js
│
│   ← Esta carpeta es interna de Kiro (el asistente)
└── .kiro/
    └── specs/
        └── rocaeterna-landing-page/
            ├── requirements.md
            ├── design.md
            ├── tasks.md
            └── .config.kiro
```

---

## Los archivos que no reconocés — uno por uno

---

### `package.json`

**¿Qué es?**
Es como la "ficha técnica" del proyecto para Node.js (el entorno que permite correr JavaScript fuera del navegador, en tu computadora).

**¿Para qué sirve en este proyecto?**
Solo sirve para correr los tests automáticos. Define dos cosas importantes:

1. **Las herramientas de testing** que se deben instalar:
   - `vitest` — el programa que corre los tests
   - `fast-check` — una librería para tests avanzados
   - `jsdom` — simula un navegador falso para que los tests puedan "ver" el HTML

2. **El comando para correr los tests:**
   ```
   npm test
   ```

**¿Lo necesitás para que el sitio funcione?**
No. El sitio funciona perfectamente sin `package.json`. Solo lo necesitás si querés correr los tests.

**¿Podés ignorarlo?**
Sí, completamente, mientras no toques los tests.

---

### `vitest.config.js`

**¿Qué es?**
Es el archivo de configuración de Vitest (la herramienta de testing).

**¿Para qué sirve?**
Le dice a Vitest tres cosas:
- Usá `jsdom` como entorno (simulá un navegador)
- Hacé disponibles las funciones de test (`describe`, `it`, `expect`) sin necesidad de importarlas
- Buscá los archivos de test dentro de la carpeta `tests/`

**¿Lo necesitás para que el sitio funcione?**
No. Solo existe para los tests.

**¿Podés ignorarlo?**
Sí.

---

### `node_modules/`

**¿Qué es?**
Es una carpeta gigante que `npm install` creó automáticamente. Contiene todas las herramientas de testing (Vitest, fast-check, jsdom) y sus dependencias.

**¿Para qué sirve?**
Guarda las librerías que usa el proyecto para correr los tests. Cuando ejecutás `npm test`, Node busca todo lo que necesita dentro de esta carpeta.

**¿Lo necesitás para que el sitio funcione?**
No. El sitio web no usa nada de `node_modules`. Es solo para los tests.

**¿Podés borrarlo?**
Sí. Si lo borrás, el sitio sigue funcionando igual. Solo necesitarías volver a ejecutar `npm install` si querés correr los tests de nuevo.

**Dato importante:** Esta carpeta puede pesar 100MB o más. Nunca la subas a Git (si algún día usás control de versiones). Para eso existe el archivo `.gitignore`.

---

### `tests/` (carpeta)

**¿Qué es?**
Carpeta con los archivos de prueba automática del proyecto.

#### `tests/setup.js`
Un archivo vacío (por ahora). Es un placeholder — si en el futuro necesitás configurar algo especial antes de que corran los tests, se pone acá.

#### `tests/unit.test.js`
Tests de ejemplo — verifican casos concretos y específicos:
- ¿La función `buildWhatsAppUrl` genera la URL correcta?
- ¿La validación del formulario rechaza campos vacíos?
- ¿`getFooterYear()` devuelve el año actual?
- ¿Se renderizan exactamente 4 tarjetas de categorías?

Piensalo como una lista de control manual, pero automatizada.

#### `tests/properties.test.js`
Tests de propiedades — verifican comportamientos universales con miles de datos generados al azar:
- "Para CUALQUIER texto vacío o con espacios, la validación siempre falla"
- "Para CUALQUIER número y mensaje, la URL de WhatsApp siempre tiene el formato correcto"
- "Sin importar cuántas veces llames a renderizar las tarjetas, siempre da el mismo resultado"

Son más poderosos que los tests de ejemplo porque prueban con datos inesperados.

**¿Necesitás entenderlos para mantener el sitio?**
No. Son una red de seguridad. Si en el futuro modificás `script.js` y algo se rompe, los tests te avisarán antes de que llegue al sitio real.

---

### `.kiro/` (carpeta)

**¿Qué es?**
Carpeta interna de Kiro (el asistente de IA). Contiene los documentos que se usaron para planificar y construir el proyecto.

#### `.kiro/specs/rocaeterna-landing-page/requirements.md`
El documento de **requisitos** — describe en detalle qué debe hacer el sitio. Por ejemplo: "El hero debe ocupar el 100% de la pantalla", "El formulario debe validar campos vacíos", etc.

#### `.kiro/specs/rocaeterna-landing-page/design.md`
El documento de **diseño técnico** — describe cómo se construyó: la paleta de colores, la tipografía, la estructura HTML, el comportamiento de JavaScript, etc.

#### `.kiro/specs/rocaeterna-landing-page/tasks.md`
La **lista de tareas** que se fueron ejecutando para construir el proyecto. Cada ítem con `[x]` está completado.

#### `.kiro/specs/rocaeterna-landing-page/.config.kiro`
Un archivo interno de configuración de Kiro. No tiene utilidad para vos.

**¿Podés ignorar toda la carpeta `.kiro`?**
Sí, para el mantenimiento del día a día no la necesitás. Pero es útil conservarla si querés volver a trabajar con Kiro para agregar funcionalidades al sitio.

---

## Lo que SÍ necesitás para mantener el sitio

Solo estos tres archivos:

| Archivo | Para qué lo editás |
|---|---|
| `script.js` | Cambiar teléfono, dirección, horario, WhatsApp, redes, categorías |
| `style.css` | Cambiar colores, tipografías, tamaños |
| `index.html` | Cambiar textos estáticos, agregar secciones nuevas |

El `README.md` te explica cómo hacer cada uno de esos cambios con ejemplos.

---

## Lo que NO necesitás tocar nunca

A menos que quieras agregar más tests o cambiar la configuración de testing:

- `package.json`
- `vitest.config.js`
- `node_modules/`
- `tests/`
- `.kiro/`

---

## ¿Cómo escalarlo en el futuro?

Cuando quieras agregar algo nuevo (una sección de galería de fotos, un mapa de Google, integración con WhatsApp para enviar el formulario, etc.), el proceso sería:

1. Describirle a Kiro lo que querés agregar
2. Kiro actualiza los documentos de `.kiro/specs/` con los nuevos requisitos
3. Kiro implementa los cambios en `index.html`, `style.css` y `script.js`
4. Los tests se actualizan para cubrir lo nuevo

Vos seguís siendo el dueño del proyecto — Kiro es la herramienta que te ayuda a construirlo sin perderte.

---

## Resumen en una oración

> **El sitio web real son `index.html`, `style.css` y `script.js`. Todo lo demás son herramientas de apoyo que garantizan que esos tres archivos funcionen correctamente.**

---

*Generado por Kiro — Librería y Bazar Roca Eterna, 2026*
