# GeoExplorer

GeoExplorer es una aplicación minimalista construida con Next.js que permite explorar datos básicos de países: bandera, capital, moneda y ubicación geográfica (latitud/longitud). Está pensada para uso educativo y de referencia rápida.

## Características

- Listado dinámico de países (fetch a https://restcountries.com).
- Búsqueda por nombre de país en tiempo real.
- Visualización de bandera, capital, moneda y coordenadas (lat,lng).
- Diseño minimalista usando Tailwind CSS.
- Rutas con la carpeta `app` de Next.js (Next 13+).

## Requisitos

- Node.js (v18+ recomendado)
- npm (o yarn/pnpm)

## Instalación

1. Desde la raíz del proyecto ejecutar:

```bash
npm install
```

2. Iniciar el servidor de desarrollo:

```bash
npm run dev
```

3. Abrir en el navegador: http://localhost:3000

## Estructura importante

- `app/` – Rutas y componentes principales (Next.js App Router).
- `components/` – Header, Footer y otros componentes reutilizables.
- `app/globals.css` – Estilos globales y directivas de Tailwind.
- `tailwind.config.js` – Configuración de Tailwind CSS.

## Notas de implementación

- Tailwind está configurado usando PostCSS. Si después de instalar dependencias no ves estilos, ejecuta `npm run dev` y revisa la salida en consola para identificar errores de PostCSS/Tailwind.
- El listado de países se obtiene por fetch desde `https://restcountries.com/v3.1/all?fields=name,capital,currencies,flags,latlng` y se renderiza dinámicamente en el cliente usando `useEffect`, con manejo de estado `loading`.

## Desarrollo y pruebas

- Para ver los cambios en caliente usa `npm run dev`.
- Para construir para producción usa `npm run build` y luego `npm start`.

## Despliegue

Puedes desplegar en Vercel (soporte nativo para Next.js) o en cualquier plataforma que soporte Node.js. Asegúrate de construir (`npm run build`) antes de publicar.

## Problemas comunes

- Si Tailwind no aplica utilidades: verifica `postcss.config.mjs`, que `tailwindcss` y `@tailwindcss/postcss` estén instalados y que `tailwind.config.js` incluya las rutas correctas en `content`.
- Si el puerto 3000 está ocupado Next propone otro puerto; cierra procesos en ejecución (`taskkill /PID <pid> /F` en Windows) o usa la URL que aparece en la consola.

## Contribuir

1. Haz un fork del repositorio.
2. Crea una rama con tu cambio: `git checkout -b feature/mi-cambio`.
3. Realiza commits claros y haz un PR.

---

Si quieres, puedo añadir secciones específicas (por ejemplo, cómo agregar tests, o instrucciones para Docker/Vercel).
