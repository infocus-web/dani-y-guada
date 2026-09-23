# 💍 Invitación Digital Interactiva de Alta Gama

Una experiencia web de invitación interactiva, moderna y elegante para bodas y eventos especiales, rediseñada a partir de formatos tradicionales de Canva y optimizada para ser compartida por WhatsApp, redes sociales o desplegada en **GitHub Pages**.

---

## ✨ Características Principales

- **Sobre Digital Interactivo:** Animación de apertura de sobre con sello de lacre personalizado y efecto de revelado.
- **Música de Fondo:** Reproductor sutil con sintetizador armónico ambiental sin dependencias de red externas.
- **Contador Regresivo en Tiempo Real:** Días, horas, minutos y segundos exactos con tipografía tabular.
- **Guardar Fecha (Save the Date):** Integración directa con Google Calendar y descarga automática de archivo `.ics` para Apple Calendar y Outlook.
- **Locaciones & Navegación:** Tarjetas interactivas de Ceremonia y Recepción con enlaces directos a Google Maps y Waze.
- **Itinerario / Cronograma:** Línea de tiempo visual del minuto a minuto del evento.
- **Código de Vestimenta:** Guía de etiqueta con paleta visual de colores recomendados y notas de protocolo.
- **Mesa de Regalos & Transferencia:** Botón de 1-clic para copiar CLABE interbancaria / alias con confirmación visual.
- **Galería de Fotos:** Visualizador de momentos especiales con vista ampliada (lightbox).
- **Hospedaje Recomendado:** Tarjetas de hoteles con códigos de descuento para invitados foráneos.
- **Confirmación RSVP por WhatsApp:** Formulario con número de pases, restricciones dietéticas, petición musical para el DJ y generación automática del mensaje de WhatsApp.
- **Panel de Personalización en Vivo:** Permite editar nombres, fecha, lugares, teléfono y temas de color directamente desde la interfaz.

---

## 🚀 Cómo Volcar y Publicar en GitHub

### Paso 1: Inicializar el repositorio Git local

Abre tu terminal en la carpeta del proyecto y ejecuta:

```bash
# 1. Inicializar git
git init

# 2. Agregar todos los archivos
git add .

# 3. Crear el primer commit
git commit -m "Invitación digital interactiva lista para publicar"

# 4. Establecer la rama principal
git branch -M main
```

### Paso 2: Conectar con tu repositorio en GitHub

1. Entra a [github.com/new](https://github.com/new) y crea un nuevo repositorio (por ejemplo `mi-boda-invitacion`).
2. Copia la URL de tu repositorio y ejecuta:

```bash
git remote add origin https://github.com/TU-USUARIO/mi-boda-invitacion.git
git push -u origin main
```

### Paso 3: Activar GitHub Pages Gratis en 1 Clic

1. En tu repositorio en GitHub, ve a **Settings** (Configuración) > **Pages**.
2. En la sección **Build and deployment** > **Source**, selecciona **GitHub Actions**.
3. El archivo `.github/workflows/deploy.yml` ya incluido se encargará de compilar y desplegar tu sitio automáticamente.
4. En 1-2 minutos, tu invitación estará en línea en:
   `https://TU-USUARIO.github.io/mi-boda-invitacion/`

---

## 🛠️ Comandos de Desarrollo Local

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build

# Previsualizar el build
npm run preview
```

---

Desarrollado con React 19, TypeScript, Tailwind CSS y Motion.
