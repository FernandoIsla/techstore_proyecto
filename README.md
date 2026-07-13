# Desarrollo de una Tienda Virtual de Tecnología (TechStore Chile)

Este proyecto consiste en el desarrollo de una aplicación web responsiva e interactiva para la empresa **TechStore Chile**, implementada como una solución full-stack utilizando un frontend en React y un backend en Node.js/Express conectado a una base de datos local MongoDB mediante Mongoose.

El diseño sigue una estética de modo oscuro premium basada en negro profundo, azul y morado neón, con efectos modernos de iluminación, cristal esmerilado (*glassmorphism*) y animaciones fluidas al pasar el cursor por los productos.

---

## Integrantes
* **Estudiante:** Fernando Isla
* **Carrera:** Ingeniería en Informática
* **Asignatura:** Programación Front-End (INACAP)

---

## Objetivo del Proyecto
Desarrollar una aplicación web interactiva y responsiva que permita la visualización de un catálogo de productos cargado dinámicamente desde un JSON en MongoDB, con funcionalidades de buscador, filtro por categorías, ordenación de precios, guardado de productos favoritos, inicio de sesión/registro de usuarios y un carrito de compras interactivo con desglose de ítems, cantidades y simulación de pagos.

---

## Tecnologías Utilizadas

### Frontend:
* **React 19** & **Vite 8**
* **HTML5** & **CSS3** (Estilos puros/tradicionales con variables CSS y responsive design)
* **JavaScript ES6**
* **Lucide-React** (Librería de iconos vectoriales para carrito, búsqueda, redes sociales y favoritos)

### Backend & Base de Datos:
* **Node.js**
* **Express.js** (API REST para servir productos y gestionar la conexión)
* **MongoDB Community Server** (Servicio de base de datos local)
* **Mongoose** (Modelado y conexión orientada a objetos de la base de datos)

---

## Estructura del Proyecto

```text
Tech_store/
├── backend/
│   ├── data/
│   │   └── productos.json       # Datos iniciales para sembrar la base de datos
│   ├── models/
│   │   └── Product.js           # Esquema de producto de Mongoose
│   ├── node_modules/
│   ├── package.json
│   ├── package-lock.json
│   └── server.js                # Punto de entrada Express y poblamiento automático
├── frontend/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   │   └── hero.png         # Imagen de héroe para el Banner
│   │   ├── components/
│   │   │   ├── AuthModal.jsx    # Modal de Login y Registro
│   │   │   ├── banner.jsx       # Banner principal
│   │   │   ├── CartModal.jsx    # Detalle de compra y carrito
│   │   │   ├── cart.jsx         # Indicador de cantidad en cabecera
│   │   │   ├── Footer.jsx       # Pie de página y beneficios de compra
│   │   │   ├── Header.jsx       # Cabecera con buscador y redes sociales
│   │   │   ├── Navbar.jsx       # Menú de navegación
│   │   │   ├── ProductCard.jsx  # Tarjeta de producto individual y favoritos
│   │   │   └── ProductList.jsx  # Grilla contenedora de productos
│   │   ├── data/
│   │   │   └── productos.json   # JSON local de productos de respaldo
│   │   ├── App.css              # Estilos CSS generales de la aplicación
│   │   ├── App.jsx              # Coordinador de estados y modales
│   │   ├── index.css            # Estilos base globales
│   │   └── main.jsx             # Punto de entrada de React
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
├── README.md                    # Documento de entrega
└── IA_UTILIZADA.md              # Documentación de uso de Inteligencia Artificial
```

---

## Instrucciones de Instalación y Ejecución

### Prerrequisitos:
* Tener instalado **Node.js** (LTS) en el sistema.
* Tener el servicio local de **MongoDB** iniciado en el puerto por defecto (`mongodb://127.0.0.1:27017`).

### 1. Iniciar el Servidor Backend:
1. Abre una terminal en la carpeta `/backend`:
   ```bash
   cd backend
   npm install
   ```
2. Ejecuta el servidor de base de datos:
   ```bash
   node server.js
   ```
   *Deberías ver en consola los mensajes: `Servidor listo en http://localhost:5000`, `Conectado a MongoDB` y `Base de datos poblada` (si es la primera ejecución).*

### 2. Iniciar el Servidor Frontend (Vite):
1. Abre otra terminal independiente en la carpeta `/frontend`:
   ```bash
   cd frontend
   npm install
   ```
2. Corre la aplicación de Vite en modo de desarrollo:
   ```bash
   npm run dev
   ```
3. Abre el enlace indicado en consola (generalmente `http://localhost:5173` o `http://localhost:5174`) en tu navegador web.

---

## Dificultades Encontradas y Solución

1. **Variables de Entorno del Sistema (Ruta de Node.js):** 
   * *Problema:* El comando `npm` y `node` no se reconocían globalmente en algunas sesiones de terminal.
   * *Solución:* Se especificaron las ejecuciones inyectando temporalmente la ruta de Node.js a las variables del proceso (`$env:Path = "C:\Program Files\nodejs;" + $env:Path`) o mediante rutas absolutas.
2. **Conflictos de Puertos (Port In Use):**
   * *Problema:* Un proceso anterior quedó colgado en segundo plano en el puerto `5000`, lo que impedía que el backend levantara correctamente (`EADDRINUSE`).
   * *Solución:* Se utilizó PowerShell para identificar y finalizar de raíz el proceso fantasma mediante `Stop-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess -Force`.
3. **Sincronización del Sembrado:**
   * *Problema:* Al modificar las fotos de placeholder de productos por fotos de tecnología reales en `productos.json`, el backend no los actualizaba porque ya detectaba documentos previos (`conteo > 0`).
   * *Solución:* Se diseñó un script temporal de limpieza que ejecutó un `dropCollection` a la base de datos de MongoDB antes de reiniciar el servidor, forzando la repoblación correcta.

---

## Conclusiones
Este proyecto permitió aplicar de forma práctica los conocimientos de componentización en React, estructurando la interfaz en componentes lógicos, reutilizables e independientes. La comunicación unidireccional y bidireccional mediante `Props` y callbacks facilitó el flujo de datos entre el contenedor principal (`App.jsx`) y elementos interactivos como los modales de carrito o autenticación.

Además, el uso de variables CSS tradicionales y selectores responsivos (`flex`, `grid`) facilitó la creación de una experiencia premium en modo oscuro que se adapta a pantallas móviles y de escritorio.
