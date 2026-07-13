# Registro de Inteligencia Artificial Utilizada

En cumplimiento con los requerimientos académicos del proyecto **TechStore**, a continuación se detallan las herramientas de Inteligencia Artificial (IA) empleadas como apoyo en el diseño, desarrollo, solución de errores y documentación de la aplicación virtual.

---

## Detalle de Herramientas y Uso

| Herramienta | Uso Principal |
| :--- | :--- |
| **Antigravity (Google Gemini)** | Copiloto principal de desarrollo: generación de estructura de componentes React, lógica de estados del carrito, diseño responsivo premium, solución de errores de sintaxis en CSS y automatización del sembrado de base de datos. |
| **GitHub Copilot / ChatGPT** | Explicación conceptual de funciones de Mongoose y React hooks, así como generación de variables de estilo CSS en modo oscuro. |

---

## Prompts Más Relevantes Utilizados

### Prompt 1: Creación de Estilos CSS en Modo Oscuro
* **Prompt:**
  > "Genera estilos CSS responsivos para una tienda de tecnología virtual con una paleta de colores oscura premium basada en negro profundo, azul y morado neón. Agrega efectos de cristal (glassmorphism) para el Header, bordes brillantes de neón que reaccionen al hover de las tarjetas de producto, y haz que las imágenes de los productos sean perfectamente cuadradas con una grilla modular."
* **Uso y Modificaciones:**
  Este prompt sirvió de base para poblar el archivo `App.css`. El resultado fue excelente para las tarjetas y el banner. Sin embargo, requirió ajustes manuales en los puntos de quiebre de los media queries (`@media`) para evitar que el buscador de la barra superior rompiera el diseño en pantallas de tabletas de 1024px.

### Prompt 2: Lógica de Carrito de Compras Completa
* **Prompt:**
  > "Crea un componente modal en React llamado CartModal que muestre los productos agregados en el carrito en una lista, permitiendo al usuario aumentar o disminuir cantidades directamente con botones + y -, eliminar ítems con un botón de basura 🗑️, ver el costo total acumulado y finalizar la compra simulando un checkout exitoso con un mensaje de éxito."
* **Uso y Modificaciones:**
  Fue utilizado para diseñar la lógica del componente `CartModal.jsx` y su interacción con `App.jsx`. Se le añadieron modificaciones menores para integrar de manera segura la función de limpieza total de carrito (`onClearCart`) cuando el checkout se realiza con éxito, asegurando que el estado no quedara corrupto.

### Prompt 3: Solución de Procesos Colgados en Puerto 5000 (Windows)
* **Prompt:**
  > "Estoy teniendo un error en Node.js de tipo EADDRINUSE: address already in use :::5000 en Windows. Escríbeme un comando de PowerShell de una sola línea para encontrar el proceso de red que está escuchando en ese puerto y matarlo de raíz."
* **Uso y Modificaciones:**
  El comando de PowerShell generado se ejecutó con éxito en la terminal:
  `Stop-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess -Force`
  Este solucionó la dificultad de forma inmediata sin necesidad de reiniciar la computadora. No requirió modificaciones adicionales.

---

## Reflexión sobre el Uso de Inteligencia Artificial
El uso de herramientas de IA durante el ciclo de vida del desarrollo permitió acelerar drásticamente la maquetación visual del proyecto y resolver problemas técnicos complejos de configuración (como puertos bloqueados de red en segundo plano). Al actuar como un copiloto de programación en parejas (*pair programming*), la IA facilitó la concentración en la arquitectura de los componentes y las buenas prácticas, logrando un código final más ordenado, modular y semántico.
