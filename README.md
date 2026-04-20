# GeoExplorer - FullStack Project

GeoExplorer es una aplicación web integral diseñada para explorar información detallada de países. El proyecto ha sido reestructurado recientemente para separar las responsabilidades en una arquitectura de Frontend y Backend, permitiendo una mayor escalabilidad y mantenibilidad.

## 🏗️ Estructura del Proyecto

El repositorio está organizado de la siguiente manera:

```text
mini-app-react/
├── backend/            # API REST (Node.js + Express + TypeScript)
│   ├── src/
│   │   ├── domain/         # Entidades y reglas de negocio
│   │   ├── application/    # Casos de uso
│   │   ├── infrastructure/ # Implementaciones técnicas (Repositorios, Persistencia)
│   │   ├── interfaces/     # Adaptadores de entrada (Controladores, Rutas)
│   │   └── index.ts        # Punto de entrada del servidor
│   └── package.json
└── frontend/           # Aplicación Web (Next.js + React + Tailwind CSS)
    ├── app/                # Next.js App Router (Páginas y Layouts)
    ├── components/         # Componentes React reutilizables
    └── package.json
```

---

## 🚀 Inicio Rápido

Para ejecutar el proyecto completo localmente, sigue estos pasos:

### 1. Requisitos Previos
- **Node.js**: v18 o superior recomendado.
- **npm**: v9 o superior.

### 2. Configuración del Backend
El backend proporciona la API de datos de países siguiendo principios de **Clean Architecture**.

```bash
cd backend
npm install
npm run dev
```
*El servidor se iniciará en [http://localhost:4000](http://localhost:4000).*

### 3. Configuración del Frontend
El frontend es una aplicación moderna construida con **Next.js 15+** que consume los datos del backend.

```bash
cd ../frontend
npm install
npm run dev
```
*La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).*

---

## 🛠️ Tecnologías Utilizadas

### Backend
- **TypeScript**: Para un desarrollo con tipado fuerte.
- **Express**: Framework de servidor web.
- **Clean Architecture**: Organización por capas (Domain, Application, Infrastructure, Interface).
- **CORS**: Habilitado para comunicación segura con el frontend.

### Frontend
- **Next.js**: Framework de React con App Router.
- **React 19**: Biblioteca de UI.
- **Tailwind CSS 4**: Para un diseño responsivo y moderno.
- **Fetch API**: Para la comunicación con el backend local.

---

## 📡 Endpoints de la API (Backend)

| Método | Endpoint | Descripción |
| :--- | :--- | :--- |
| `GET` | `/api/countries` | Obtiene el listado completo de países. |
| `GET` | `/api/countries?q=nombre` | Busca países por nombre. |
| `GET` | `/api/countries/:id` | Obtiene los detalles de un país específico por ID. |

---

## 📝 Notas de Implementación

- **Separación de Capas**: El backend utiliza Clean Architecture para desacoplar la lógica de negocio de los detalles técnicos como la API externa de `restcountries.com`.
- **Estilos**: El frontend utiliza Tailwind CSS para una estética premium y minimalista.
- **React 19**: Se utilizan las últimas características de React para un rendimiento óptimo.

---

## 🤝 Contribuir

1. Haz un fork del repositorio.
2. Crea una rama con tu mejora: `git checkout -b feature/nueva-funcionalidad`.
3. Envía tus cambios mediante un Pull Request explicativo.
