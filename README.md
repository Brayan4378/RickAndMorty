Rick & Morty Explorer

Aplicación web desarrollada con Angular 18 que consume la Rick and Morty API.

Información del Proyecto

- Nombre del Proyecto: Rick & Morty Explorer
- API Utilizada: Rick and Morty API
- Framework: Angular 18
- Arquitectura: Atomic Design (Átomos, Moléculas, Organismos, Páginas)
- Lenguaje: TypeScript
- Estilos: SCSS

Instrucciones de Instalación y Ejecución

Prerrequisitos
- Node.js versión 18 o superior
- npm versión 9 o superior
- Angular CLI instalado globalmente

Instalación
1. Clonar el repositorio:  
   git clone https://github.com/Brayan4378/RickAndMorty.git
2. Entrar al directorio del proyecto:  
   cd RickAndMorty
3. Instalar dependencias:  
   npm install

Ejecución  
Para iniciar el proyecto:  
npm start -O

Características

Guard de Rutas
- MultiverseGuard controla el acceso a /locations y /locations/:id
- El usuario debe activar el Portal Gun desde la página principal
- Si no está activado, se redirige al inicio con un mensaje de advertencia

Diseño
- Tema oscuro inspirado en el multiverso
- Tipografía Outfit de Google Fonts
- Componentes reutilizables siguiendo Atomic Design

MultiverseGuard

El guard verifica si el Portal Gun está activo mediante el servicio MultiverseAccessService.
- Si está activo, permite acceso
- Si no, redirige al inicio con el parámetro portalRequired=true
- La página principal muestra un aviso para activar el Portal Gun

API Endpoints Utilizados

GET /api/character - Lista de personajes  
GET /api/character/:id - Detalle de personaje  
GET /api/character/1,2,3 - Varios personajes  
GET /api/episode - Lista de episodios  
GET /api/episode/:id - Detalle de episodio  
GET /api/episode/1,2,3 - Varios episodios  
GET /api/location - Lista de ubicaciones  
GET /api/location/:id - Detalle de ubicación
