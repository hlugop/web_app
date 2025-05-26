# Sistema de Gestión de Citas para Leads

Esta es una aplicación web full-stack diseñada para la gestión de citas de prospectos (leads). Permite registrar información de leads, consultar disponibilidad de horarios y agendar citas. El sistema cuenta con un backend desarrollado en Node.js con Express y un frontend interactivo construido con React.

Esta es una versión inicial y funcional de la aplicación, que cumple con los requisitos básicos de un sistema de gestión de citas y sirve como una base sólida para futuras expansiones y mejoras.

## Características Principales

*   **Gestión de Leads:**
    *   Registro de nuevos leads con información de contacto y empresa.
    *   Listado de leads registrados con opciones de búsqueda (por nombre, empresa) y paginación.
*   **Gestión de Citas:**
    *   Programación de nuevas citas para leads existentes.
    *   Comprobación de disponibilidad de horarios en tiempo real basada en la configuración de horas de trabajo y citas existentes.
    *   Listado de citas programadas con opciones de filtrado (por estado, rango de fechas) y paginación.
    *   Cancelación de citas programadas.
*   **Consulta de Disponibilidad:**
    *   Visualización de horarios disponibles y ocupados por día en un formato de calendario/agenda.
*   **API Documentada:**
    *   Backend con documentación Swagger/OpenAPI accesible para pruebas e integración.

## Tecnologías Utilizadas

### Backend
*   **Node.js:** Entorno de ejecución para JavaScript del lado del servidor.
*   **Express.js:** Framework minimalista para aplicaciones web Node.js, utilizado para construir la API REST.
*   **JSON File:** Utilizado como base de datos simple para persistencia de datos (`db.json`).
*   **CORS:** Middleware para habilitar el Cross-Origin Resource Sharing.
*   **Swagger (OpenAPI):** Para la documentación de la API, utilizando `swagger-ui-express` y `swagger-jsdoc`.

### Frontend
*   **React:** Biblioteca de JavaScript para construir interfaces de usuario interactivas.
*   **Vite:** Herramienta de desarrollo frontend moderna y rápida para la creación de proyectos React.
*   **React Router DOM:** Para la gestión de rutas y navegación en la aplicación de una sola página (SPA).
*   **Context API:** Para la gestión del estado global de la aplicación (leads, citas, notificaciones).
*   **Axios:** Cliente HTTP basado en promesas para realizar peticiones al backend.
*   **CSS:** Para el estilizado de componentes, utilizando estilos en línea y globales definidos en `index.css`.

## Estructura del Proyecto

El proyecto está organizado en dos directorios principales:

*   `backend/`: Contiene todo el código fuente del servidor Node.js y la API REST.
    *   `controllers/`: Lógica de negocio para cada ruta.
    *   `middleware/`: Middlewares personalizados (ej. CORS).
    *   `models/`: Lógica de acceso y manipulación de datos (`database.js`).
    *   `routes/`: Definición de las rutas de la API.
    *   `swaggerConfig.js`: Configuración para la documentación Swagger.
    *   `db.json`: Archivo JSON que actúa como base de datos.
    *   `index.js`: Punto de entrada del servidor backend.
*   `frontend/`: Contiene todo el código fuente de la aplicación cliente React.
    *   `src/`: Directorio principal del código React.
        *   `components/`: Componentes reutilizables de la interfaz de usuario (core, leads, citas).
        *   `context/`: Proveedores y hooks de Context API para el estado global.
        *   `pages/`: Componentes que representan las diferentes páginas de la aplicación.
        *   `services/`: Lógica para la comunicación con la API backend (`api.js`).
        *   `App.jsx`: Componente raíz que configura el enrutamiento.
        *   `main.jsx`: Punto de entrada de la aplicación frontend.
*   `README.md`: Este archivo.

## Prerrequisitos

Antes de comenzar, asegúrate de tener instalado lo siguiente en tu sistema:

*   **Node.js:** Se recomienda la versión LTS más reciente (e.g., v18.x o v20.x). Puedes descargarlo desde [nodejs.org](https://nodejs.org/).
*   **npm (Node Package Manager):** Viene incluido con la instalación de Node.js. Se utilizará para la gestión de dependencias del proyecto.

## Instalación

Sigue estos pasos para configurar el entorno de desarrollo local:

1.  **Clona el repositorio:**
    Si tienes Git instalado, clona el repositorio a tu máquina local:
    ```bash
    git clone <URL_DE_ESTE_REPOSITORIO>
    cd <NOMBRE_DEL_DIRECTORIO_DEL_PROYECTO>
    ```
    (Reemplaza `<URL_DE_ESTE_REPOSITORIO>` con la URL real del repositorio y `<NOMBRE_DEL_DIRECTORIO_DEL_PROYECTO>` con el nombre del directorio creado al clonar, usualmente el nombre del repositorio).
    Si no tienes Git, puedes descargar el código fuente como un archivo ZIP y extraerlo.

2.  **Configuración del Backend:**
    *   Navega al directorio del backend:
      ```bash
      cd backend
      ```
    *   Instala las dependencias del servidor:
      ```bash
      npm install
      ```

3.  **Configuración del Frontend:**
    *   Navega al directorio del frontend (desde la raíz del proyecto):
      ```bash
      cd ../frontend 
      ```
      O si estás en `backend/`, puedes usar `cd ../frontend`. Si estás en la raíz, `cd frontend`.
    *   Instala las dependencias del cliente:
      ```bash
      npm install
      ```

## Ejecución de la Aplicación

Una vez completada la instalación, puedes iniciar los servidores del backend y frontend por separado.

### Backend
1.  Abre una terminal y navega al directorio `backend/`:
    ```bash
    cd backend
    ```
2.  Inicia el servidor de desarrollo (recomendado, con reinicio automático ante cambios):
    ```bash
    npm run dev
    ```
    Alternativamente, puedes iniciar el servidor en modo producción (sin reinicio automático):
    ```bash
    npm start
    ```
3.  Por defecto, el servidor backend se ejecutará en `http://localhost:3001`.

### Frontend
1.  Abre **otra** terminal y navega al directorio `frontend/`:
    ```bash
    cd frontend 
    ```
    (Asegúrate de estar en la raíz del proyecto antes de ejecutar `cd frontend`).
2.  Inicia el servidor de desarrollo de Vite:
    ```bash
    npm run dev
    ```
3.  Por defecto, la aplicación frontend se abrirá en tu navegador en `http://localhost:5173`. Si no se abre automáticamente, puedes navegar a esa URL manualmente.

Asegúrate de que el servidor backend esté en ejecución antes de utilizar completamente las funcionalidades del frontend que dependen de la API.

## Documentación de la API

La API del backend está documentada utilizando Swagger/OpenAPI. Una vez que el servidor backend esté en ejecución (generalmente en `http://localhost:3001`), puedes acceder a la interfaz interactiva de Swagger UI en tu navegador a través de la siguiente URL:

[http://localhost:3001/api-docs](http://localhost:3001/api-docs)

Esta documentación te permitirá explorar todos los endpoints disponibles, ver los esquemas de solicitud y respuesta, y probar la API directamente desde el navegador.

## Guía Básica de Uso

Una vez que tanto el backend como el frontend estén en ejecución, puedes comenzar a utilizar la aplicación:

1.  **Acceso a la Aplicación:**
    *   Abre tu navegador y ve a `http://localhost:5173` (o el puerto que indique el servidor de desarrollo del frontend).

2.  **Página Principal (Dashboard):**
    *   Verás un resumen general y enlaces rápidos a las principales secciones.

3.  **Registrar un Nuevo Lead:**
    *   Navega a la sección "Leads" (o "Registrar Nuevo Lead" desde el dashboard).
    *   Haz clic en el botón "Register New Lead".
    *   Completa el formulario con los datos del prospecto (nombre, email, teléfono, empresa) y envíalo.
    *   Recibirás una notificación de éxito o error.

4.  **Ver Lista de Leads:**
    *   En la sección "Leads", verás la lista de todos los leads registrados.
    *   Puedes usar los filtros para buscar por nombre o empresa y navegar por las páginas si hay muchos registros.

5.  **Programar una Nueva Cita:**
    *   Navega a la sección "Citas" (o "Schedule New Appointment" desde el dashboard).
    *   Haz clic en el botón "Schedule New Appointment".
    *   Selecciona un lead existente del menú desplegable.
    *   Elige una fecha. El sistema mostrará los horarios disponibles para esa fecha.
    *   Selecciona un horario disponible, ajusta la duración si es necesario, y añade notas.
    *   Envía el formulario. Recibirás una notificación.

6.  **Ver Lista de Citas:**
    *   En la sección "Citas", verás la lista de todas las citas programadas.
    *   Puedes filtrar por estado (programada, completada, cancelada) o por rango de fechas.
    *   Las citas programadas tendrán la opción de ser canceladas.

7.  **Consultar Disponibilidad General:**
    *   Navega a la sección "Disponibilidad" (o "Check Availability").
    *   Selecciona una fecha para ver todos los intervalos de tiempo del día y su estado (Disponible/Ocupado).

8.  **Navegación:**
    *   Utiliza la barra de navegación en la parte superior para moverte entre las diferentes secciones de la aplicación.

## Estado Actual de la Aplicación

Esta aplicación es una **versión inicial y funcional** que cumple con los objetivos principales de gestión de leads y citas. Ha sido desarrollada con un enfoque en la simplicidad y la funcionalidad central.

**Posibles futuras mejoras y expansiones podrían incluir:**

*   Integración con una base de datos más robusta (ej. PostgreSQL, MongoDB).
*   Autenticación y autorización de usuarios.
*   Notificaciones por correo electrónico para recordatorios de citas.
*   Un panel de administración más avanzado.
*   Pruebas unitarias y de integración más exhaustivas.
*   Mejoras en la interfaz de usuario y experiencia de usuario (UI/UX).

## Consideraciones para el Despliegue (Producción)

Para desplegar esta aplicación en un entorno de producción, considera las siguientes recomendaciones:

1.  **Configuración de Entorno:**
    *   **Variables de Entorno:** Utiliza variables de entorno para todas las configuraciones sensibles o específicas del entorno.
        *   **Backend (`.env` file, gestionado por el hosting/PM2):**
            *   `PORT`: Puerto para el servidor Node.js (ej. `3001` o el asignado por el proveedor de hosting).
            *   `NODE_ENV=production`: Para optimizaciones de Express y otras dependencias.
            *   `CORS_ORIGIN_WHITELIST`: Una lista separada por comas de los dominios frontend permitidos (ej. `https://tu-dominio-frontend.com`).
        *   **Frontend (archivo `.env.production` o variables de entorno del build system):**
            *   `VITE_API_URL`: La URL completa del backend API de producción (ej. `https://api.tu-dominio.com/api` o `/api` si se usa un proxy).
    *   Asegúrate de que los archivos `.env` locales no se suban al control de versiones (deben estar en `.gitignore`). Proporciona archivos `.env.example` como guía.

2.  **Backend:**
    *   **CORS:** Configura el middleware CORS en el backend para permitir solicitudes únicamente desde el/los dominio(s) de tu frontend de producción (usando la variable `CORS_ORIGIN_WHITELIST`).
    *   **Process Manager:** Utiliza un gestor de procesos como PM2 o nodemon en modo producción (aunque PM2 es más robusto) para mantener la aplicación Node.js en ejecución continua, gestionar logs y reinicios automáticos.
    *   **HTTPS:** Asegúrate de que el servidor Node.js (o el proxy inverso) esté configurado para servir sobre HTTPS.

3.  **Frontend:**
    *   **Build:** Genera los archivos estáticos optimizados ejecutando `npm run build` en el directorio `frontend/`. Esto creará un directorio `dist/`.
    *   **Servidor Web:** Sirve el contenido del directorio `frontend/dist/` utilizando un servidor web estático como Nginx, Apache, Vercel, Netlify, GitHub Pages, etc.

4.  **Estrategia de Despliegue Común (Proxy Inverso):**
    *   Considera servir tanto el frontend estático como la API del backend bajo el mismo dominio para simplificar la configuración de CORS y la gestión de SSL.
    *   Puedes usar un servidor web como Nginx como proxy inverso:
        *   Nginx sirve los archivos estáticos del frontend.
        *   Nginx redirige las solicitudes a una ruta específica (ej. `/api/*`) al servidor backend Node.js que se ejecuta en su propio puerto.

5.  **Base de Datos:**
    *   Para un uso en producción real y escalable, reemplaza el archivo `db.json` por un sistema de base de datos más robusto como PostgreSQL, MySQL, MongoDB, etc. Esto requerirá modificaciones en la lógica de acceso a datos del backend.

6.  **Seguridad Adicional:**
    *   Implementa cabeceras de seguridad HTTP (ej. usando Helmet.js para Express).
    *   Considera la limitación de velocidad (rate limiting) para proteger contra ataques de fuerza bruta o abuso.

7.  **Logging y Monitorización:**
    *   Configura un sistema de logging más detallado y persistente para el backend en producción.
    *   Utiliza herramientas de monitorización para supervisar el estado y rendimiento de la aplicación.
