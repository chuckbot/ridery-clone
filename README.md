# 🏎️ Ridery MVP - Monorepo (Coro Edition)

Este es un MVP funcional de una plataforma de logística tipo Ride-sharing, construido con una arquitectura de monorepo moderna, tipado estricto de extremo a extremo y despliegue mediante contenedores.

## 🏗️ Arquitectura Técnica

El proyecto utiliza un **Monorepo** gestionado con `pnpm` y está dividido en tres capas principales:

* **`apps/client`**: Frontend desarrollado en **Nuxt 4** (Modo Compatibility) con **Vuetify 3**.
* **`apps/server`**: Backend de alto rendimiento construido con **Fastify**, **TypeScript** y **MongoDB**.
* **`packages/shared`**: El "corazón" del sistema. Contiene los esquemas de **Zod** y tipos de TypeScript compartidos para garantizar que el cliente y el servidor hablen el mismo idioma.

---

## 🛠️ Stack Tecnológico

* **Frontend**: Nuxt 4, Vuetify 3, Zod, TypeScript.
* **Backend**: Fastify, MongoDB (Mongoose), Docker.
* **Infraestructura**: Docker, pnpm Workspaces, GitHub Actions.

---

## 🚀 Guía de Inicio Rápido

Sigue estos pasos para levantar el entorno de desarrollo local en **Coro**.

### 1. Requisitos Previos
* Node.js (v20+)
* pnpm (`npm install -g pnpm`)
* Docker Desktop (o Docker Engine en WSL/Linux)

### 2. Instalación de Dependencias
Desde la raíz del proyecto, instala todas las dependencias del monorepo:
```bash
pnpm install
```

### 3. Infraestructura (Base de Datos)
```bash
docker run -d --name ridery-mongodb -p 27017:27017 mongo:latest
```

### 4. Poblado de Datos (Seeds)
Inserta los conductores iniciales en puntos estratégicos de Coro (Plaza Falcón, Paseo Talavera, etc.):
```bash
pnpm seed:drivers
```

### 5. Ejecución del Proyecto
Levanta el Backend y el Frontend simultáneamente con un solo comando:
```bash
pnpm dev
```

* Frontend: http://localhost:3000
* Backend: http://localhost:3001/api

---

## 📋 Documentación de Flujos
### Validación de Datos (Zod)

Utilizamos **@ridery/shared** para validar cada solicitud de viaje. Si intentas enviar coordenadas inválidas desde el formulario, el TripSchema rechazará la petición antes de que salga del cliente, garantizando la integridad del sistema.

### Despacho de Viajes

1. cliente envía una solicitud POST /api/trips.

2. servidor valida el esquema y emite un evento TRIP_CREATED.

3. DispatchService realiza una consulta geoespacial ($near) en MongoDB para encontrar conductores en un radio de 5km dentro de la ciudad de Coro.

---

## 👨‍💻 Autor
**Carlos Garcia**

