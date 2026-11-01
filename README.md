# 🛒 Mercat Asistent — Landing Page Oficial

Sitio web oficial de presentación y portal de acceso para **Mercat Asistent**, el asistente inteligente de compras en supermercado diseñado para calcular subtotales exactos en tiempo real, interpretar códigos QR de productos al peso y controlar el presupuesto antes de pasar por caja.

---

## 🚀 Despliegue en Vivo

* **Web Oficial / Landing Page:** [https://huligan-spring.github.io/Mercat_web/](https://huligan-spring.github.io/Mercat_web/)
* **Aplicación PWA:** [https://huligan-spring.github.io/Mercat_front/](https://huligan-spring.github.io/Mercat_front/)
* **Repositorio Frontend (PWA):** [Mercat_front](https://github.com/huligan-spring/Mercat_front)
* **Repositorio Backend (API REST):** [Mercat](https://github.com/huligan-spring/Mercat)

---

## ✨ Características de la Landing Page

* **Smartphone Mockup Interactivo (Aspect Ratio 9:16):**
  * **Vídeo demostrativo real:** Reproductor HTML5 optimizado con grabación de pantalla de la app en uso real.
  * **Simulador de escáner en directo:** Simulación interactiva con síntesis de audio a 1800 Hz (Web Audio API), animación de haz láser y actualización de la barra de presupuesto por colores.
* **Diseño 100% Responsivo:** Adaptado a dispositivos móviles, tablets y monitores de escritorio.
* **Código QR Integrado:** Acceso inmediato a la PWA con un solo escaneo desde el móvil.
* **Arquitectura Modular:** Separación estricta entre marcado semántico (`index.html`), hojas de estilo (`css/`), scripts (`js/`) y recursos estáticos (`assets/`).
* **Sin dependencias de compilación:** Funciona directamente sobre GitHub Pages con soporte nativo de Tailwind CDN y Google Fonts.

---

## 📁 Estructura del Proyecto

```text
Mercat_web/
├── assets/
│   ├── demo.mp4               # Vídeo real demostrativo en el smartphone (21.4 MB)
│   ├── favicon.svg            # Favicon vectorial con la identidad de marca
│   └── qr-mercat.png          # Código QR escaneable hacia la PWA
├── css/
│   └── styles.css             # Resets tipográficos estándar, scrollbars y animación del láser
├── js/
│   └── main.js                # Lógica interactiva (menú móvil, audio Web Audio API, reproductor y simulador)
├── index.html                 # Página principal estructurada con Tailwind Play CDN y paleta corporativa
└── README.md                  # Documentación del proyecto
```

---

## 🛠️ Publicación en GitHub Pages

1. Inicializar el repositorio y subir los cambios a GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: landing page modular y optimizada para Mercat Asistent"
   git branch -M main
   git remote add origin https://github.com/huligan-spring/Mercat_web.git
   git push -u origin main
   ```
2. En GitHub, ir a **Settings** > **Pages**.
3. En **Build and deployment > Source**, seleccionar **Deploy from a branch**.
4. En **Branch**, seleccionar rama `main` y carpeta `/ (root)`.
5. Guardar los cambios. En 1-2 minutos la web estará disponible en `https://huligan-spring.github.io/Mercat_web/`.

---

## 📄 Licencia

Distribuido bajo la **Licencia MIT**. Consulta el código fuente y las directrices de privacidad Local-First en el repositorio.
