# Escuela Superior de Oficios Manuel Belgrano — Sitio institucional

Sitio de la Escuela Superior de Oficios Manuel Belgrano (Municipalidad de Gral. San Martín, Mendoza): oferta de oficios y tecnicaturas, preinscripción online, calendario y contacto.

Es HTML, CSS y JavaScript estático, sin build ni dependencias de servidor (solo carga las tipografías Montserrat e Inter desde Google Fonts).

## Ver el sitio

- **Localmente**: abrir `index.html` en un navegador, o servir la carpeta con cualquier servidor estático (por ejemplo `python -m http.server`).
- **Publicado**: activar GitHub Pages (`Settings → Pages → Deploy from branch → main / (root)`). Queda en `https://<usuario>.github.io/<repositorio>/`.

## Estructura

```
index.html        # estructura de la página
styles.css        # estilos y variables de color (:root)
app.js            # catálogo con búsqueda y filtros, cupos, formulario y bloque destacado
config.js         # opciones que se editan: modo demo, formulario, fechas
data/oficios.js   # los 46 oficios, clasificados en 9 áreas
assets/           # logo oficial, foto del frente, mapa de OpenStreetMap
canvas-design/    # fuentes del diseño original (canvas de Design), solo de referencia
```

## Estado actual: versión de demostración

`config.js` viene con `modoDemo: true`. En ese modo:

- los **cupos por oficio son de ejemplo** (no son reales) y arriba de la página se muestra un aviso de demostración;
- el **formulario de preinscripción no envía datos**: solo simula la confirmación.

Antes de publicar de forma oficial hay que conectar los datos reales:

1. **Cupos**: cargar `cupos: { total, ocupados }` en cada oficio de `data/oficios.js` (o alimentar ese archivo desde una planilla). Sin ese dato el sitio muestra "Cupos por confirmar".
2. **Formulario**: completar `formEndpoint` en `config.js` con la URL que recibe la preinscripción (POST con JSON: oficio, dicta, listaDeEspera, nombre, dni, telefono, correo, enviadoEl). Si no hay endpoint y el modo demo está apagado, el formulario avisa que todavía no está conectado.
3. **Fechas**: completar `fechaLimite`, `proximaApertura` y `cuposActualizado` en `config.js`. Si quedan vacías, esos datos no se muestran.
4. Poner `modoDemo: false`.

Para ver cómo se ve la página cuando no queda ningún cupo, abrir `index.html?sincupos=1` (solo en modo demo).

## Contenido a completar

- Fechas del calendario 2026 (hoy dicen "A confirmar").
- Estadísticas del inicio (+30 oficios, 10 talleres equipados, 2 años formando): confirmar que sean correctas.
- Enlaces de "Alumnos y docentes" (autogestión, aula virtual, bolsa de trabajo): hoy apuntan a la misma sección.

## Diseño

- **Colores** (en `styles.css`, `:root`): celeste del logo `#1793DA`, azul profundo `#08233F`, verde de acción `#34B67F`. Texto sobre el celeste siempre en azul profundo, por contraste.
- **Tipografía**: Montserrat (títulos, en mayúsculas y muy juntos) e Inter (texto).

## Licencia y titularidad

Repositorio creado para uso y transferencia a la Escuela Superior de Oficios Manuel Belgrano. Una vez que la institución cuente con su propia cuenta u organización de GitHub, este repositorio puede transferirse sin pérdida de historial desde `Settings → General → Transfer ownership`.

El mapa es © colaboradores de OpenStreetMap ([licencia](https://www.openstreetmap.org/copyright)).
