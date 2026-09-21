const CONFIG = {
  nombreEstudiante: "Nayeli Quispe Tica",
  codigoEstudiante: "U00057H",
  universidad: "Universidad Peruana Los Andes"
};

const CURSOS = [
  {
    id: "algoritmo",
    codigo: "332141",
    nombre: "Algoritmo y Estructura de Datos",
    unidades: 4,          // 4 unidades
    semanasPorUnidad: 4,  // 4 semanas cada una (16 semanas en total)
    totalSemanas: 16
  },
  {
    id: "taller",
    codigo: "IS-102",
    nombre: "Taller de Apps",
    unidades: 2,          // 2 unidades exactas
    semanasPorUnidad: 8,  // 8 semanas cada unidad (16 semanas en total)
    totalSemanas: 16
  }
];

// Temas oficiales extraídos del sílabo UPLA para Algoritmos y Estructuras de Datos
const TEMAS_INICIALES_ALGORITMO = {
  1: "Arreglos Bidimensionales, representación y aplicaciones",
  2: "Arreglos paralelos, representación y uso de arreglos de objetos",
  3: "Clase ArrayList y Vector (Operaciones básicas)",
  4: "Clase Linked List y sus operaciones",
  5: "Pilas: TDA pila, definición, representación y operaciones",
  6: "Pilas de objetos y aplicaciones con pilas (Clase Stack)",
  7: "Colas: TDA cola, representación, operaciones y aplicaciones de colas",
  8: "Recursividad: Algoritmos de programación recursiva y múltiple",
  9: "Listas Simplemente Enlazadas (LSE): TDA, representación y operaciones",
  10: "Listas Circulares Simples (LCS): definición, representación y objetos",
  11: "Listas Doblemente Enlazadas (LDE): TDA, representación y operaciones",
  12: "Listas Circulares Dobles (LCD): TDA, representación y aplicaciones",
  13: "Árboles: TDA árbol, árboles generales, binarios y recorridos",
  14: "Grafos: TDA grafo, definición, representación y conexiones",
  15: "Métodos de ordenación, Búsqueda secuencial y Búsqueda binaria",
  16: "Exposición de trabajo final y evaluación de desempeño final"
};

// Temas oficiales del sílabo UPLA - Desarrollo de Aplicaciones I (Taller de Apps)
const TEMAS_INICIALES_TALLER = {
  1: "Inicialización del Proyecto y Ventanas Principales (JFrame)",
  2: "Organización del Espacio con Contenedores (JPanel, JScrollPane)",
  3: "Implementación de Menús de Navegación (JMenuBar, JMenu, JMenuItem)",
  4: "Integración de Componentes Básicos y Validación Visual",
  5: "Gestión de Archivos y Persistencia de Datos Locales (JFileChooser)",
  6: "Personalización Visual Avanzada e Identidad del Proyecto (Look and Feel)",
  7: "Diseño de Interfaces Complejas con Tablas y Listas (JTable, JList, JComboBox)",
  8: "Orquestación de Mensajes, Diálogos de Usuario y Cierre de Fase (JOptionPane)",
  9: "Conectividad y Configuración del Driver de Base de Datos (JDBC)",
  10: "Operaciones de Persistencia: Inserción y Lectura de Datos (CRUD: Insert/Select)",
  11: "Operaciones de Persistencia II: Actualización, Eliminación y Transacciones",
  12: "Vinculación Dinámica y Cierre de la Capa de Datos",
  13: "Migración a Arquitectura Cliente-Servidor e Hilos",
  14: "Depuración, Manejo de Excepciones y Pruebas del Sistema",
  15: "Compilación y Generación del Archivo Ejecutable (.jar)",
  16: "Sustentación del Proyecto Final y Cierre de Curso"
};

function cargarDatos() {
  const claves = ["portafolio_datos_v11", "portafolio_datos_v10", "portafolio_datos_v9", "portafolio_datos_v8"];

  for (const clave of claves) {
    const guardado = localStorage.getItem(clave);
    if (guardado) {
      try {
        const parsed = JSON.parse(guardado);
        if (parsed && typeof parsed === "object" && Object.keys(parsed).length > 0) {
          return parsed;
        }
      } catch (e) {
        console.warn("Datos guardados inválidos en", clave, e);
      }
    }
  }

  let datosIniciales = {};
  CURSOS.forEach(curso => {
    datosIniciales[curso.id] = { semanas: {} };
    for (let i = 1; i <= curso.totalSemanas; i++) {
      let unidadActual = Math.ceil(i / curso.semanasPorUnidad);

      let temaSugerido = "";
      if (curso.id === "algoritmo" && TEMAS_INICIALES_ALGORITMO[i]) {
        temaSugerido = TEMAS_INICIALES_ALGORITMO[i];
      } else if (curso.id === "taller" && TEMAS_INICIALES_TALLER[i]) {
        temaSugerido = TEMAS_INICIALES_TALLER[i];
      }

      datosIniciales[curso.id].semanas[i] = {
        unidad: unidadActual,
        tema: temaSugerido,
        entregas: []
      };
    }
  });
  return datosIniciales;
}

function guardarDatos(datos) {
  try {
    const datosLigeros = JSON.parse(JSON.stringify(datos));
    localStorage.setItem("portafolio_datos_v11", JSON.stringify(datosLigeros));
  } catch (error) {
    console.warn("Almacenamiento local al límite:", error);
  }
}

function leerArchivoComoDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => resolve(event.target.result);
    reader.onerror = () => reject(new Error("No se pudo leer el archivo."));
    reader.readAsDataURL(file);
  });
}

function comprimirImagen(file, maxWidth = 1200, quality = 0.75) {
  if (!file || !file.type || !file.type.startsWith("image/")) {
    return Promise.resolve(null);
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ratio = Math.min(1, maxWidth / Math.max(img.width, img.height));
        canvas.width = Math.max(1, Math.round(img.width * ratio));
        canvas.height = Math.max(1, Math.round(img.height * ratio));

        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.onerror = () => reject(new Error("No se pudo cargar la imagen."));
      img.src = event.target.result;
    };
    reader.onerror = () => reject(new Error("No se pudo leer la imagen."));
    reader.readAsDataURL(file);
  });
}

async function crearEntregaDesdeArchivo(file) {
  try {
    let resultadoUrl = "";

    if (file.type && file.type.startsWith("image/")) {
      const imagenComprimida = await comprimirImagen(file);
      resultadoUrl = imagenComprimida || (await leerArchivoComoDataUrl(file));
    } else {
      resultadoUrl = await leerArchivoComoDataUrl(file);
    }

    return {
      tipo: "archivo",
      nombre: file.name,
      tipoMime: file.type || "application/octet-stream",
      tamanio: Math.round(file.size / 1024) + " KB",
      dataUrl: resultadoUrl,
      blobUrl: resultadoUrl,
      urlPublica: resultadoUrl
    };
  } catch (error) {
    console.error("Error al procesar el archivo:", error);
    alert("Hubo un error al adjuntar el archivo: " + error.message);
    throw error;
  }
}

function escaparHtml(valor) {
  return String(valor || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

window.descargarEvidencia = function(url, nombre = "archivo") {
  if (!url) {
    alert("No hay archivo disponible para descargar.");
    return;
  }

  const enlace = document.createElement("a");
  enlace.href = url;
  enlace.download = nombre || "archivo";
  enlace.rel = "noopener noreferrer";
  document.body.appendChild(enlace);
  enlace.click();
  document.body.removeChild(enlace);
};

// Muestra la evidencia dentro del portafolio. No abre una pestaña ni inicia
// la descarga al pulsar "Ver".
window.abrirEvidencia = function(url, nombre, mimeType = "") {
  if (!url) {
    alert("No hay archivo disponible para mostrar.");
    return;
  }

  const tipo = String(mimeType || "").toLowerCase();
  const nombreArchivo = nombre || "archivo";
  const esImagen = tipo.startsWith("image/") || url.startsWith("data:image/");
  const esPdf = tipo === "application/pdf" || url.startsWith("data:application/pdf");
  const anterior = document.getElementById("modal-evidencia");
  if (anterior) anterior.remove();

  const modal = document.createElement("div");
  modal.id = "modal-evidencia";
  modal.style.cssText = [
    "position:fixed", "inset:0", "z-index:10000", "padding:20px",
    "background:rgba(15,23,42,.82)", "display:flex",
    "align-items:center", "justify-content:center"
  ].join(";");

  const caja = document.createElement("div");
  caja.style.cssText = [
    "width:min(96vw,1100px)", "height:min(92vh,850px)", "background:#fff",
    "border-radius:14px", "overflow:hidden", "display:flex",
    "flex-direction:column", "box-shadow:0 20px 60px rgba(0,0,0,.35)"
  ].join(";");

  const barra = document.createElement("div");
  barra.style.cssText = "display:flex;align-items:center;justify-content:space-between;gap:12px;padding:12px 16px;background:#1e293b;color:#fff;";

  const titulo = document.createElement("strong");
  titulo.textContent = nombreArchivo;
  titulo.style.cssText = "overflow:hidden;text-overflow:ellipsis;white-space:nowrap;";

  const acciones = document.createElement("div");
  acciones.style.cssText = "display:flex;gap:8px;flex-shrink:0;";

  const descargar = document.createElement("button");
  descargar.type = "button";
  descargar.textContent = "📥 Descargar";
  descargar.className = "action-btn";
  descargar.addEventListener("click", () => window.descargarEvidencia(url, nombreArchivo));

  const cerrar = document.createElement("button");
  cerrar.type = "button";
  cerrar.textContent = "✕ Cerrar";
  cerrar.className = "action-btn";
  cerrar.addEventListener("click", () => modal.remove());

  acciones.append(descargar, cerrar);
  barra.append(titulo, acciones);

  const contenido = document.createElement("div");
  contenido.style.cssText = "flex:1;display:flex;align-items:center;justify-content:center;padding:18px;background:#e2e8f0;overflow:auto;";

  if (esImagen) {
    const imagen = document.createElement("img");
    imagen.src = url;
    imagen.alt = nombreArchivo;
    imagen.style.cssText = "max-width:100%;max-height:100%;object-fit:contain;background:#fff;border-radius:8px;";
    imagen.addEventListener("error", () => {
      contenido.replaceChildren();
      const aviso = document.createElement("p");
      aviso.textContent = "No se pudo cargar la imagen. Usa Descargar para guardarla.";
      contenido.appendChild(aviso);
    });
    contenido.appendChild(imagen);
  } else if (esPdf) {
    const visor = document.createElement("iframe");
    visor.src = url;
    visor.title = nombreArchivo;
    visor.style.cssText = "width:100%;height:100%;border:0;background:#fff;";
    contenido.appendChild(visor);
  } else {
    const aviso = document.createElement("div");
    aviso.style.cssText = "max-width:560px;text-align:center;background:#fff;padding:32px;border-radius:12px;color:#334155;";
    aviso.innerHTML = "<div style='font-size:48px'>📄</div><h3>Este documento no tiene vista previa en el navegador</h3><p>Los archivos Word, ZIP y RAR deben abrirse o descargarse con su programa correspondiente.</p>";
    contenido.appendChild(aviso);
  }

  caja.append(barra, contenido);
  modal.appendChild(caja);
  modal.addEventListener("click", (event) => {
    if (event.target === modal) modal.remove();
  });
  document.body.appendChild(modal);
};