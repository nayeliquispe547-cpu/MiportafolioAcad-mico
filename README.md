# Portafolio Académico

Sitio estático con inicio de sesión, para llevar el registro semanal (16 semanas)
de los cursos **Algoritmos y Estructuras de Datos** y **Desarrollo de Aplicaciones**,
y subir tus trabajos como enlace (recomendado) o archivo zip.

## Archivos

```
portafolio/
├── portafolio.html        → cursos, semanas y carga de trabajos
├── style.css               → estilos
├── script.js               → configuración, datos de los cursos y lógica
└── assets/
    ├── logo-universidad.svg  → reemplázalo por el logo real
    └── foto-estudiante.svg   → reemplázalo por tu foto
```

## 1. Personaliza tus datos

Abre `script.js` y edita el bloque `CONFIG` al inicio del archivo:

```js
const CONFIG = {
  claveAdministrador: "1234",  // clave para publicar y editar tareas
  nombreEstudiante: "Tu Nombre Apellido",
  codigoEstudiante: "20XX-XXXXX",
  universidad: "Tu Universidad",
};
```

> El botón permite separar el modo administrador del modo visitante: los
> visitantes pueden abrir y descargar las tareas publicadas, pero no pueden
> editar, subir ni eliminar. Como GitHub Pages es estático, esta protección es
> visual y del lado del navegador; no uses una contraseña sensible porque la
> clave puede verse en el código fuente.

Si quieres cambiar los temas de cada semana, edita `TEMAS_POR_DEFECTO` en el
mismo archivo. También puedes dejarlos así y editarlos directamente haciendo
clic sobre el tema dentro del portafolio (se guardan en tu navegador).

## 2. Reemplaza el logo y tu foto

- Sustituye `assets/logo-universidad.svg` por el logo real de tu universidad
  (puede ser `.svg`, `.png` o `.jpg` — si cambias el formato, actualiza también
  la ruta en `index.html` y `portafolio.html`).
- Sustituye `assets/foto-estudiante.svg` por tu foto.

## 3. Sube el proyecto a GitHub

1. Crea un repositorio nuevo en GitHub (por ejemplo `portafolio-academico`).
2. En tu computadora, dentro de la carpeta `portafolio`, ejecuta:
   ```bash
   git init
   git add .
   git commit -m "Primer commit: portafolio académico"
   git branch -M main
   git remote add origin https://github.com/TU-USUARIO/portafolio-academico.git
   git push -u origin main
   ```

## 4. Activa GitHub Pages

1. En tu repositorio, ve a **Settings → Pages**.
2. En "Build and deployment", elige **Deploy from a branch**.
3. Selecciona la rama `main` y la carpeta `/ (root)`.
4. Guarda. Después de un par de minutos, tu portafolio estará disponible en:
   `https://TU-USUARIO.github.io/portafolio-academico/`

## 5. Cómo publicar tus trabajos en GitHub Pages

Dentro del portafolio, cada semana tiene dos formas de entregar:

- **Enlace (recomendado):** sube tu carpeta o código a un repositorio de
  GitHub y pega aquí el enlace. Después pulsa **Exportar entregas**. Se
  descargará un archivo `entregas.json`.
- **Archivos ZIP, RAR, PDF, Word e imágenes:** también se incluyen en
  `entregas.json` al pulsar **Exportar entregas**. Los archivos se guardan
  dentro del JSON como datos codificados y GitHub Pages los puede mostrar o
  descargar después de publicar el archivo.

Para publicar el enlace y que lo vea el profesor:

1. Añade el enlace en la semana correspondiente.
2. Pulsa **Exportar entregas**.
3. Reemplaza el archivo `entregas.json` de este repositorio con el archivo
   descargado.
4. Ejecuta `git add entregas.json`, `git commit -m "Actualizar entregas"` y
   `git push`.
5. Espera unos segundos a que GitHub Pages publique el cambio.

La página carga `entregas.json` desde GitHub Pages. Por eso las entregas
publicadas se ven desde cualquier dispositivo. GitHub Pages no permite que
una página web haga commits automáticamente. Para archivos grandes, GitHub
puede rechazar el JSON por su límite de tamaño; en ese caso conviene subir el
archivo directamente al repositorio y guardar solo su enlace.

## Notas

- Las evidencias locales se guardan en IndexedDB del navegador para que no
  desaparezcan al pulsar F5. Esto solo funciona en el mismo navegador y
  dispositivo. Para que otra persona las vea, debes pulsar **Exportar
  entregas**, reemplazar `entregas.json` en GitHub y hacer commit.
- Puedes agregar más cursos copiando la estructura del arreglo `CURSOS` y
  `TEMAS_POR_DEFECTO` en `script.js`.
