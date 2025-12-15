# UrbanFeet-Frontend

![Angular](https://img.shields.io/badge/angular-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
---

**Do you want to read it in English?** Click >>[here](https://github.com/Renzito0637d/UrbanFeet-Frontend/blob/main/README.EN.md)<<

Aplicación web realizada con **Angular**. Este repositorio contiene el código fuente del frontend desarrollado como parte del curso "Proyecto Web Integrador" en la **UTP**. El sistema simula la gestión digital para la empresa ficticia **Urban Feet**.

### 🛠️ Arquitectura Full Stack
Este proyecto funciona en conjunto con una API REST desarrollada por separado.
* **Frontend (Este repo):** Angular, TypeScript, Tailwind CSS.
* **Backend:** Spring Boot, JWT en cookies, Spring Security, ... -> **[Ver Repositorio Backend](https://github.com/Renzito0637d/UrbanFeet-Backend)**

## 📦 Características Principales

### 🛒 Módulo Cliente (Público)

- **Catálogo Interactivo:** Filtrado avanzado desde el servidor (Marca, Género, Tipo, Talla, Precio) sin perder paginación.
- **Carrito de Compras:** Gestión de estado local, validación de stock y cálculo de totales en tiempo real.
- **Pasarela de Pago Simulada:** Formulario reactivo para procesar pagos con validaciones condicionales (Tarjeta vs Yape/Plin).
- **Libro de Reclamaciones:** Formulario digital integrado con validación de sesión para autocompletado de datos.
- **Modo Oscuro/Claro:** Soporte nativo utilizando Tailwind CSS.

### 🛡️ Módulo Administrativo (Privado)

- **Dashboard Analítico:**
    - KPIs en tiempo real (Ventas, Usuarios, Pedidos).
    - Gráficos SVG generados dinámicamente.
    - Top productos más vendidos y tablas de pedidos recientes.
- **Gestión de Usuarios:** Tablas paginadas para Clientes y Administradores.
- **Reportes:** Exportación de datos de Ventas y Usuarios a **PDF** y **Excel** directamente desde el backend.
- **Gestión de Reclamaciones:** Bandeja de entrada para atender quejas y cambiar estados (Pendiente, Atendido).

## 🛠️ Tecnologías

- **Framework:** Angular 17+ (Standalone Components, Signals, inject()).
- **Estilos:** Tailwind CSS.
- **UI Components:** Angular Material (Dialogs, Icons).
- **Notificaciones:** Ngx-Sonner.
- **Http Client:** Integración REST con Spring Boot.

## 🚀 Instalación y Ejecución

1. **Clonar el repositorio:**
    ```
    git clone https://github.com/Renzito0637d/UrbanFeet-Frontend.git
    ```

2. **Entrar al directorio del proyecto:**
    ```
    cd UrbanFeet-Frontend
    ```

3. **Instalar dependencias:**
    ```
    npm install
    ```

4. **Ejecutar el servidor de desarrollo:**
    ```
    ng serve --open
    ```

### Selección de temas del proyecto
|Modo claro|Modo oscuro|
|---|---|
|![Modo claro](https://github.com/Renzito0637d/UrbanFeet-Frontend/blob/img-opti/Images/Captura%20de%20pantalla%20de%202025-12-14%2020-14-05.webp?raw=true)|![Modo oscuro](https://github.com/Renzito0637d/UrbanFeet-Frontend/blob/img-opti/Images/Captura%20de%20pantalla%20de%202025-12-14%2020-14-20.webp?raw=true)|

## Galería del proyecto

### > Inicio

![Inicio](https://github.com/Renzito0637d/UrbanFeet-Frontend/blob/img-opti/Images/Captura%20de%20pantalla%20de%202025-12-14%2020-16-06.webp?raw=true)

### > Catálogo con paginación + filtrado

![Catalogo](https://github.com/Renzito0637d/UrbanFeet-Frontend/blob/img-opti/Images/Captura%20de%20pantalla%20de%202025-12-14%2020-16-24.webp?raw=true)

### > Login

![Login](https://github.com/Renzito0637d/UrbanFeet-Frontend/blob/img-opti/Images/Captura%20de%20pantalla%20de%202025-12-14%2020-17-31.webp?raw=true)

### > Admin dashboard

![Admin dashboard](https://github.com/Renzito0637d/UrbanFeet-Frontend/blob/img-opti/Images/Captura%20de%20pantalla%20de%202025-12-15%2013-48-08.webp?raw=true)

### > Admin gestión de zapatillas y sus variaciones con paginación

![Admin zapatillas](https://github.com/Renzito0637d/UrbanFeet-Frontend/blob/img-opti/Images/Captura%20de%20pantalla%20de%202025-12-15%2013-48-33.webp?raw=true)

### [> Ver más](https://github.com/Renzito0637d/UrbanFeet-Frontend/blob/main/Gallery.md)
