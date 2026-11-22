<div align="center">
  <h1>🅰️ Taller de Integración - FrontEnd</h1>
  <p><em>Front-End del Sistema de Control de Stock desarrollado con el framework Angular (3680) - 1C 2024 - UNLaM.</em></p>

  <!-- Badges -->
  <img src="https://img.shields.io/badge/Universidad-UNLaM-1F4F90?style=for-the-badge&logo=google-scholar&logoColor=white" alt="UNLaM" />
  <img src="https://img.shields.io/badge/Año-2024-2EA043?style=for-the-badge" alt="2024" />
  <img src="https://img.shields.io/badge/Framework-Angular_16.2-DD0031?style=for-the-badge&logo=angular&logoColor=white" alt="Angular" /><img src="https://img.shields.io/badge/-TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Grupo-1-7057D2?style=for-the-badge" alt="Grupo 1" />
  <img src="https://img.shields.io/badge/Estado-Completado-blue?style=for-the-badge" alt="Completado" />
</div>

<br>

## 📑 Índice
- [Información de la Asignatura](#informacion-de-la-asignatura)
- [Trayecto - Gestión y Complementarias](#trayecto)
- [Docentes](#docentes)
- [Integrantes del Grupo](#integrantes)
- [Guía de Configuración e Instalación](#guia-de-configuracion-e-instalacion)
- [Comandos Principales de Angular CLI](#comandos-principales-de-angular-cli)
- [Herramientas Utilizadas](#herramientas-utilizadas)
- [Estructura del Proyecto](#estructura-del-proyecto)

---

<a id="informacion-de-la-asignatura"></a>
## ℹ️ Información de la Asignatura
* **Carrera**: Ingeniería en Informática
* **Asignatura**: Taller de Integración (3680)
* **Cuatrimestre**: Primer Cuatrimestre
* **Año**: 2024
* **Grupo**: 1

<a id="trayecto"></a>
## 👨‍💻 Trayecto - Gestión y Complementarias
* **Año académico**: Segundo Año - Segundo Cuatrimestre
* **Responsable / Jefe de cátedra**: Eribe, Roberto
* **Carga horaria semanal**: 4 hs
* **Carga horaria total**: 64 hs
* **Modalidad**: Virtual
* **Correlativas anteriores**:
  * Principios de Calidad de Software (3626)
  * Introducción a la Gestión de Requisitos (3630)
  * Introducción a Proyectos Informáticos (3632)
  * Tópicos de Programación (3635)
  * Bases de Datos (3636)
  * Arquitectura de Computadoras (3638)

<a id="docentes"></a>
## 👨‍🏫 Docentes
* Bucher, Mariano
* Eribe, Roberto
* Paker, Fernando

<a id="integrantes"></a>
## 👥 Integrantes
<div align="center">

| DNI | Apellido/s | Nombre/s |
| :--: | :--: | :--: |
| **40.137.650** | Corrales | Mauro Exequiel |
| **44.834.085** | Justiniano | Maximo |
| **37.276.705** | Pompeo | Nicolas Ruben |
| **41.548.235** | Sandoval Vasquez | Juan Leandro |
| **37.841.788** | Sullca | Willian Fernando |

</div>

---

<a id="guia-de-configuracion-e-instalacion"></a>
## 🛠️ Guía de Configuración e Instalación

Este proyecto fue generado utilizando **[Angular CLI](https://github.com/angular/angular-cli)** versión `16.2.6`.

<div align="center">
  <img width="700" alt="Introducción a Angular" src="https://github.com/user-attachments/assets/208a9d0c-5f8b-4a74-83c2-eadf4049d1c0" />
  <br>
  <sup><em>Introducción a Angular</em></sup>
</div>

### 1. Instalación de Angular CLI 16.2

<div align="center">
  <img width="700" alt="¿Qué es Angular CLI?" src="https://github.com/user-attachments/assets/be6360c3-7307-470f-b637-568b3db8c396" />
  <br>
  <sup><em>¿Qué es Angular CLI?</em></sup>
</div>

* **En el proyecto local**:
  Abre una terminal en la carpeta raíz del proyecto y ejecuta:
  ```bash
  npm install @angular/cli@16.2
  ```

* **De forma global en la PC**:
  Para poder usar la versión `16.2` globalmente en cualquier terminal:
  ```bash
  npm install -g @angular/cli@16.2
  ```

* **Verificación de versión**:
  Para confirmar la instalación correcta de Node, npm y Angular CLI:
  ```bash
  ng version
  ```

### 2. Instalación de Dependencias y Componentes UI

* **Instalar paquetes del proyecto**:
  ```bash
  npm install
  ```

* **Agregar Angular Material**:
  ```bash
  ng add @angular/material
  ```

---

<a id="comandos-principales-de-angular-cli"></a>
## 🚀 Comandos Principales de Angular CLI

<div align="center">
  <img width="700" alt="¿Qué es TypeScript?" src="https://github.com/user-attachments/assets/ad9415cc-db2f-45ce-ba0a-02e2d57e8f2c" />
  <br>
  <sup><em>¿Qué es Angular CLI?</em></sup>
</div>

### Servidor de Desarrollo
Ejecuta `ng serve` para iniciar el servidor local. Navega a `http://localhost:4200/`. La aplicación se recargará automáticamente ante cualquier cambio en los archivos fuente.
```bash
ng serve
```

### Generación de Código (Scaffolding)
Para generar un nuevo componente, servicio o módulo:

* **Crear un nuevo proyecto**:
  ```bash
  ng new nombre-del-proyecto
  ```

* **Generar un Componente**:
  ```bash
  ng generate component components/home
  ```
  *Crea la estructura del componente (TypeScript, HTML, CSS, Test) en `src/app/components/home`.*

* **Generar un Servicio**:
  ```bash
  ng generate service services/auth/auth --flat
  ```
  *Genera el servicio en `src/app/services/auth` y lo registra en el módulo correspondiente.*

### Compilación (Build)
Para compilar los artefactos de producción en el directorio `dist/`:
```bash
ng build
```

### Pruebas (Tests)
* **Pruebas Unitarias**: Ejecutar con Karma.
  ```bash
  ng test
  ```
* **Pruebas End-to-End (E2E)**:
  ```bash
  ng e2e
  ```

---

<a id="herramientas-utilizadas"></a>
## 🛠️ Herramientas Utilizadas
* **Angular 16.2**: Framework de desarrollo Web de SPA (Single Page Application) basado en componentes.
* **TypeScript**: Lenguaje fuertemente tipado empleado para la lógica de componentes, modelos y servicios.
* **Angular Material**: Biblioteca de componentes UI para la interfaz del sistema de stock.
* **RxJS**: Librería para la programación reactiva y gestión de flujos de datos asíncronos en peticiones HTTP.
* **HTML5 & CSS3**: Maquetación y estilos visuales de la aplicación.
* **Node.js & npm**: Entorno de ejecución y gestor de paquetes del proyecto.
* **Karma & Jasmine**: Entorno y suite para pruebas unitarias automatizadas.
* **Visual Studio Code**: IDE principal utilizado para la codificación y desarrollo.

---

<a id="estructura-del-proyecto"></a>
## 📁 Estructura del Proyecto

```text
📦 TallerDeIntegracionFrontEnd
 ┣ 📂 src
 ┃ ┣ 📂 app
 ┃ ┃ ┣ 📂 components
 ┃ ┃ ┃ ┣ 📂 home
 ┃ ┃ ┃ ┃ ┣ 📜 home.component.ts
 ┃ ┃ ┃ ┃ ┣ 📜 home.component.html
 ┃ ┃ ┃ ┃ ┗ 📜 home.component.css
 ┃ ┃ ┃ ┣ 📂 login
 ┃ ┃ ┃ ┗ 📜 ... (otros componentes)
 ┃ ┃ ┣ 📂 services
 ┃ ┃ ┃ ┣ 📂 auth
 ┃ ┃ ┃ ┃ ┗ 📜 auth.service.ts
 ┃ ┃ ┃ ┣ 📂 data
 ┃ ┃ ┃ ┃ ┗ 📜 data.service.ts
 ┃ ┃ ┃ ┗ 📜 ... (otros servicios)
 ┃ ┃ ┣ 📜 app.component.ts
 ┃ ┃ ┣ 📜 app.module.ts
 ┃ ┃ ┗ 📜 app-routing.module.ts
 ┃ ┣ 📂 assets
 ┃ ┣ 📜 index.html
 ┃ ┗ 📜 main.ts
 ┣ 📜 angular.json
 ┣ 📜 package.json
 ┗ 📜 README.md
```
