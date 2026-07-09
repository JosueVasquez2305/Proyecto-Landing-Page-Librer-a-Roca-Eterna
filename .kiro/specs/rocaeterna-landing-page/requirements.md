# Requirements Document

## Introduction

Librería y Bazar Roca Eterna es un negocio familiar que opera como mini market con múltiples categorías de productos: artículos de librería y papelería, electrónica, productos de belleza y cuidado personal, y artículos de tienda general. Se requiere una landing page estática (HTML5, CSS3, JavaScript puro) sin dependencias de frameworks ni backend, diseñada con enfoque mobile-first, completamente responsive, y mantenible por una persona con conocimientos básicos de web.

## Glossary

- **Landing_Page**: El sitio web estático de una sola página para Librería y Bazar Roca Eterna.
- **Visitor**: Cualquier persona que acceda al sitio web desde un navegador.
- **Navigation_Menu**: El componente de navegación que enlaza a las secciones de la página.
- **Hero_Section**: La sección principal visible al cargar la página, con mensaje de bienvenida y llamada a la acción.
- **Product_Category**: Una de las cuatro agrupaciones de productos que ofrece el negocio.
- **Product_Card**: Elemento visual que representa una categoría de producto con imagen, nombre y descripción breve.
- **Contact_Section**: Sección con información de contacto, dirección y formulario de contacto.
- **Contact_Form**: Formulario HTML que permite al Visitor enviar un mensaje al negocio.
- **WhatsApp_Button**: Botón flotante de acceso directo a WhatsApp del negocio.
- **Footer**: Pie de página con información del negocio y enlaces secundarios.
- **Viewport**: El área visible del navegador del Visitor.

---

## Requirements

### Requirement 1: Estructura y navegación de una sola página

**User Story:** Como visitante, quiero poder navegar fácilmente por todas las secciones del sitio desde cualquier parte de la página, para encontrar rápidamente la información que busco.

#### Acceptance Criteria

1. THE Landing_Page SHALL incluir las secciones: Inicio, Categorías, Nosotros, Contacto, en ese orden.
2. THE Navigation_Menu SHALL mostrar enlaces a cada sección de la Landing_Page.
3. WHEN el Visitor hace clic en un enlace del Navigation_Menu, THE Landing_Page SHALL desplazarse suavemente hasta la sección correspondiente.
4. WHILE el Viewport tiene un ancho mayor o igual a 768px Y el Visitor ha desplazado la página más de 80px desde la parte superior, THE Navigation_Menu SHALL permanecer fijo en la parte superior del Viewport.
5. WHEN el Viewport tiene un ancho menor a 768px, THE Navigation_Menu SHALL colapsar en un menú hamburguesa interactivo sin comportamiento sticky.
6. WHEN el Visitor activa el menú hamburguesa, THE Navigation_Menu SHALL mostrar los enlaces de navegación en un panel desplegable.

---

### Requirement 2: Sección Hero (Inicio)

**User Story:** Como visitante, quiero ver una presentación visual atractiva del negocio al cargar el sitio, para entender de inmediato qué ofrece Librería y Bazar Roca Eterna.

#### Acceptance Criteria

1. THE Hero_Section SHALL mostrar el nombre "Librería y Bazar Roca Eterna" como título principal.
2. THE Hero_Section SHALL mostrar un eslogan descriptivo del negocio.
3. THE Hero_Section SHALL incluir un botón de llamada a la acción que dirija al Visitor a la sección de Categorías.
4. THE Hero_Section SHALL ocupar al menos el 100% de la altura del Viewport en la carga inicial.
5. WHEN el Viewport tiene un ancho menor a 768px, THE Hero_Section SHALL ajustar el tamaño del texto para ser legible sin zoom de forma independiente al botón.
6. WHEN el Viewport tiene un ancho menor a 768px, THE Hero_Section SHALL ajustar el tamaño del botón de llamada a la acción para ser usable sin zoom de forma independiente al texto.

---

### Requirement 3: Sección de Categorías de Productos

**User Story:** Como visitante, quiero ver las categorías de productos disponibles de forma clara y visual, para saber qué tipo de artículos puedo encontrar en la tienda.

#### Acceptance Criteria

1. THE Landing_Page SHALL mostrar exactamente cuatro Product_Card, una por cada categoría: Librería y Papelería, Electrónica, Belleza y Cuidado Personal, y Tienda General.
2. EACH Product_Card SHALL mostrar un icono representativo, el nombre de la categoría y una descripción de máximo 20 palabras.
3. WHEN el Viewport tiene un ancho mayor o igual a 768px, THE Landing_Page SHALL mostrar las Product_Card en una cuadrícula de 2 columnas como mínimo.
5. WHEN el Visitor posiciona el cursor sobre una Product_Card en escritorio, THE Product_Card SHALL mostrar un efecto visual de elevación.

---

### Requirement 4: Sección Nosotros

**User Story:** Como visitante, quiero conocer la historia y los valores del negocio, para generar confianza antes de visitar la tienda.

#### Acceptance Criteria

1. THE Landing_Page SHALL incluir una sección "Nosotros" con un texto descriptivo sobre la historia o misión de Librería y Bazar Roca Eterna.
2. THE Landing_Page SHALL mostrar el horario de atención del negocio únicamente dentro de la sección Nosotros.
3. THE Landing_Page SHALL mostrar la dirección física del negocio en la sección Nosotros y, adicionalmente, en la Contact_Section.
4. WHEN el Viewport tiene un ancho mayor o igual a 992px, THE Landing_Page SHALL mostrar el texto descriptivo y los datos del negocio en un layout de dos columnas.

---

### Requirement 5: Sección de Contacto y Formulario

**User Story:** Como visitante, quiero poder contactar al negocio fácilmente, para hacer consultas sobre productos o disponibilidad antes de ir a la tienda.

#### Acceptance Criteria

1. THE Contact_Section SHALL incluir un Contact_Form con los campos: nombre (texto, requerido), teléfono (texto, opcional) y mensaje (área de texto, requerido).
2. WHEN el Visitor intenta enviar el Contact_Form con campos requeridos vacíos, THE Contact_Form SHALL mostrar un mensaje de error descriptivo junto al campo correspondiente.
3. WHEN el Visitor completa y envía el Contact_Form, THE Contact_Form SHALL intentar mostrar un mensaje de confirmación visible; la finalización del envío no depende del resultado de la visualización del mensaje.
4. THE Contact_Section SHALL mostrar el número de teléfono y correo electrónico del negocio como información visible fuera del formulario.
5. IF el Visitor hace clic en el número de teléfono, THEN THE Landing_Page SHALL iniciar una llamada telefónica mediante el protocolo `tel:`.
6. IF el Visitor hace clic en el correo electrónico, THEN THE Landing_Page SHALL abrir el cliente de correo del dispositivo mediante el protocolo `mailto:`.

---

### Requirement 6: Botón flotante de WhatsApp

**User Story:** Como visitante, quiero poder contactar al negocio vía WhatsApp con un solo clic desde cualquier parte del sitio, para hacer consultas rápidas.

#### Acceptance Criteria

1. THE WhatsApp_Button SHALL ser visible en todas las secciones de la Landing_Page durante el desplazamiento.
2. THE WhatsApp_Button SHALL estar posicionado en la esquina inferior derecha del Viewport.
3. WHEN el Visitor hace clic explícitamente en el WhatsApp_Button, THE Landing_Page SHALL abrir WhatsApp con un mensaje de saludo predefinido dirigido al número del negocio.
4. THE WhatsApp_Button SHALL mostrar el logotipo de WhatsApp y ser claramente identificable visualmente.

---

### Requirement 7: Diseño responsive y mobile-first

**User Story:** Como visitante que accede desde un teléfono móvil, quiero que el sitio sea completamente funcional y visualmente correcto en mi dispositivo, para tener una experiencia de navegación cómoda.

#### Acceptance Criteria

1. THE Landing_Page SHALL estar diseñada con enfoque mobile-first, definiendo estilos base para pantallas de 320px de ancho en adelante.
2. THE Landing_Page SHALL aplicar breakpoints en 768px y 992px para adaptar el layout a tablets y escritorio respectivamente.
3. THE Landing_Page SHALL mostrar todo su contenido visible dentro del Viewport en pantallas de 320px de ancho sin desbordamiento horizontal.
4. THE Landing_Page SHALL usar un tamaño de fuente mínimo de 16px en el cuerpo del texto.
5. WHEN el Viewport tiene un ancho mayor o igual a 992px, THE Landing_Page SHALL limitar el ancho del contenido a 1200px centrado en el Viewport.

---

### Requirement 8: Rendimiento y accesibilidad básica

**User Story:** Como visitante con conexión lenta o que usa tecnología asistiva, quiero que el sitio sea accesible y cargue correctamente, para no tener dificultades al usarlo.

#### Acceptance Criteria

1. THE Landing_Page SHALL incluir atributos `alt` descriptivos en todas las etiquetas `<img>`.
2. THE Landing_Page SHALL usar etiquetas HTML5 semánticas (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`) para estructurar el contenido.
3. THE Landing_Page SHALL incluir una meta etiqueta `viewport` con `content="width=device-width, initial-scale=1"`.
4. THE Landing_Page SHALL incluir meta etiquetas `description` y `og:title` para favorecer la indexación y el compartir en redes sociales.
5. THE Landing_Page SHALL ser diseñada con un ratio de contraste mínimo de 4.5:1 entre el texto del cuerpo y su fondo conforme a WCAG 2.1 nivel AA, verificado mediante revisión manual por el diseñador.
6. WHEN el Visitor navega con teclado, THE Landing_Page SHALL mostrar un indicador de foco visible en todos los elementos interactivos.

---

### Requirement 9: Mantenibilidad del código

**User Story:** Como mantenedor del sitio con conocimientos básicos de web, quiero que el código esté organizado y comentado, para poder actualizar textos, teléfonos o imágenes sin romper el diseño.

#### Acceptance Criteria

1. THE Landing_Page SHALL organizarse en tres archivos separados: `index.html`, `style.css` y `script.js`.
2. THE Landing_Page SHALL incluir comentarios en `index.html` que identifiquen el inicio y fin de cada sección principal.
3. THE Landing_Page SHALL centralizar los datos del negocio modificables (teléfono, dirección, correo, horario, número de WhatsApp) en una sección de configuración al inicio de `script.js`.
4. THE Landing_Page SHALL usar variables CSS (`--color-primary`, `--color-secondary`, `--font-base`) para colores y tipografías, permitiendo cambios globales desde `style.css`.
5. THE Landing_Page SHALL incluir un archivo `README.md` con instrucciones en español sobre cómo actualizar el contenido de cada sección.

---

### Requirement 10: Footer

**User Story:** Como visitante, quiero ver información básica del negocio al final de la página, para acceder rápidamente a datos de contacto y redes sociales.

#### Acceptance Criteria

1. THE Footer SHALL mostrar el nombre del negocio y el año de copyright actual.
2. THE Footer SHALL incluir enlaces a las redes sociales del negocio (Facebook e Instagram) que se abran en una pestaña nueva del navegador.
3. THE Footer SHALL incluir enlaces de navegación rápida a las secciones principales de la Landing_Page.
4. WHEN el Visitor hace clic en un enlace de red social, THE Landing_Page SHALL abrir la URL correspondiente en una pestaña nueva del navegador.
