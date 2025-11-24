# Taller de Integración - FrontEnd

## Información de la Asignatura
* **Carrera**: Ingeniería en Informática
* **Asignatura**: Taller de Integración (3680)
* **Cuatrimestre**: Primer Cuatrimestre
* **Año**: 2024
* **Grupo**: 1

## Trayecto - Gestión y Complementarias

* **Año académico**: Segundo Año - Segundo Cuatrimestre
* **Responsable / Jefe de catedra**: Eribe, Roberto
* **Carga horaria semanal**: 4 hs
* **Carga horaria total**: 64 hs
* **Modalidad**: Virtual
* **Correlativas anteriores**
    * Principios de Calidad de Software (3626)
    * Introducción a la Gestión de Requisitos (3630)
    * Introducción a Proyectos Informáticos (3632)
    * Tópicos de Programación (3635)
    * Bases de Datos (3636)
    * Arquitectura de Computadoras (3638)

## Docentes
* Bucher, Mariano
* Eribe, Roberto
* Paker, Fernando

## Integrantes
| DNI | Apellido/s | Nombre/s |
|--|--|--|
| 40.137.650 | Corrales | Mauro Exequiel |
| 44.834.085 | Justiniano | Maximo |
| 37.276.705 | Pompeo | Nicolas Ruben |
| 41.548.235 | Sandoval Vasquez | Juan Leandro |
| 37.841.788 | Sullca | Willian Fernando |

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


# Mini Documentación


### Para agregar Angular CLI 16.2 a tu proyecto o a tu PC y verificar si está instalada, puedes seguir estos pasos:

Instalar Angular CLI 16.2 en tu proyecto:
Abre una terminal en la carpeta raíz de tu proyecto y ejecuta el siguiente comando:


`npm install @angular/cli@16.2`

Esto instalará Angular CLI 16.2 en tu proyecto, específicamente en la carpeta node_modules de tu proyecto.

Instalar Angular CLI 16.2 globalmente en tu PC:
Si deseas instalar Angular CLI 16.2 globalmente en tu PC para usarlo en cualquier proyecto, ejecuta el siguiente comando en tu terminal:


`npm install -g @angular/cli@16.2`

Esto instalará Angular CLI 16.2 globalmente en tu sistema.

Verificar la versión de Angular CLI:
Para verificar si Angular CLI está instalado correctamente y ver su versión, puedes ejecutar el siguiente comando en tu terminal:


`ng version`

Esto mostrará la versión de Angular CLI instalada tanto a nivel global como local (si está instalada en tu proyecto).

Al seguir estos pasos, podrás instalar Angular CLI 16.2 en tu proyecto o en tu PC y verificar si está instalada correctamente. Recuerda que los comandos deben ejecutarse en una terminal o símbolo del sistema con acceso a Node.js y npm.

`ng i` en el casopara instalar las dependencias

`ng add @angular/material` instalacion de materia...


# ###  Comandos Utilizados

## ng new <nombre_proyecto>: 

Este comando se utiliza para crear un nuevo proyecto Angular. Por ejemplo:
 
```console
ng new my-project
```

Crea una nueva carpeta con el nombre especificado y configura un nuevo proyecto Angular dentro de esa carpeta.

### ng generate component <nombre_componente>: 
Genera un nuevo componente Angular en la carpeta src/app. Por ejemplo:


```console
ng generate component components/home
```

Esto crea una carpeta home dentro de src/app/components con los archivos necesarios para el componente (archivo TypeScript, HTML, CSS, etc.).

### ng generate service <nombre_servicio>:
 Genera un nuevo servicio Angular en la carpeta src/app. Por ejemplo:


```console
ng generate service services/auth/auth --flat
```

Esto crea un archivo TypeScript para el servicio dentro de la carpeta src/app/services/auth y lo registra automáticamente en el módulo correspondiente.

# Estructura de Carpetas
## Componentes: 
Los componentes generados se guardarán en la carpeta **src/app/components** por defecto.


home
login
Otros componentes aquí...

## Servicios:
 Los servicios generados se guardarán en la carpeta **src/app/services** por defecto.

> auth

    > auth.service.ts

> data

    > data.service.ts

`Otros servicios aquí...`

Para una estructura más organizada, puedes crear subcarpetas dentro de la carpeta services para organizar tus servicios. 

Por ejemplo, una carpeta auth para el servicio de autenticación y una carpeta data para otros servicios relacionados con datos.

Siguiendo esta estructura, tus archivos estarán bien organizados y será más fácil mantener tu proyecto a medida que crezca.

