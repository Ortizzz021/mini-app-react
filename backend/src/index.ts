/**
 * ============================================================
 * ENTRY POINT — Servidor Express
 * ============================================================
 *
 * Este archivo es el punto de entrada de la aplicación.
 * Aquí se configura y arranca el servidor Express.
 *
 * Responsabilidades:
 *   1. Crear la aplicación Express
 *   2. Configurar middlewares (CORS, JSON parser)
 *   3. Inicializar el repositorio (cargar datos)
 *   4. Registrar las rutas
 *   5. Iniciar el servidor en el puerto configurado
 *
 * ═══════════════════════════════════════════════════════════
 * FLUJO COMPLETO DE UN REQUEST:
 * ═══════════════════════════════════════════════════════════
 *
 * 1. El cliente (frontend o Postman) envía:
 *    GET http://localhost:4000/api/countries?q=colombia
 *
 * 2. Express recibe el request y lo pasa por los middlewares:
 *    cors() → express.json() → ...
 *
 * 3. El Router encuentra la ruta que coincide:
 *    /api/countries → countryRoutes → GET / → controller.getAll
 *
 * 4. El Controller extrae datos del request:
 *    req.query.q = "colombia"
 *
 * 5. El Controller llama al caso de uso:
 *    searchCountries.execute("colombia")
 *
 * 6. El caso de uso llama al repositorio:
 *    repository.search("colombia")
 *
 * 7. El repositorio filtra los datos en memoria y devuelve:
 *    [{ id: 42, name: "Colombia", capital: "Bogotá", ... }]
 *
 * 8. El controller envía la respuesta:
 *    res.status(200).json(countries)
 *
 * 9. El cliente recibe el JSON con los países filtrados.
 * ═══════════════════════════════════════════════════════════
 */

import express from 'express';
import cors from 'cors';
import { InMemoryCountryRepository } from './infrastructure/repositories/InMemoryCountryRepository';
import { createCountryRoutes } from './interfaces/routes/countryRoutes';

// Puerto del servidor (se puede cambiar con variable de entorno)
const PORT = process.env.PORT || 4000;

async function main() {
  // ─── 1. Crear la aplicación Express ───
  const app = express();

  // ─── 2. Configurar middlewares ───

  // CORS: permite que el frontend (localhost:3000) haga
  // peticiones al backend (localhost:4000) sin ser bloqueado
  // por la política de Same-Origin del navegador.
  app.use(cors());

  // JSON parser: permite leer el body de peticiones POST/PUT
  // que envíen datos en formato JSON.
  app.use(express.json());

  // ─── 3. Inicializar el repositorio ───
  // Creamos la instancia concreta del repositorio
  const countryRepository = new InMemoryCountryRepository();

  // Cargamos los datos desde la API externa (restcountries.com)
  // Esto solo ocurre UNA VEZ al arrancar el servidor.
  await countryRepository.init();

  // ─── 4. Registrar las rutas ───
  // Montamos las rutas de countries bajo el prefijo /api/countries
  // Esto significa que:
  //   GET /api/countries      → controller.getAll
  //   GET /api/countries/:id  → controller.getById
  app.use('/api/countries', createCountryRoutes(countryRepository));

  // ─── 5. Ruta raíz de bienvenida ───
  app.get('/', (_req, res) => {
    res.json({
      message: '🌍 GeoExplorer API — Clean Architecture',
      endpoints: {
        allCountries: 'GET /api/countries',
        searchByName: 'GET /api/countries?q=nombre',
        countryById: 'GET /api/countries/:id',
      },
    });
  });

  // ─── 6. Iniciar el servidor ───
  app.listen(PORT, () => {
    console.log('');
    console.log('══════════════════════════════════════════════');
    console.log(`  🌍 GeoExplorer API corriendo en:`);
    console.log(`     http://localhost:${PORT}`);
    console.log('');
    console.log('  📡 Endpoints disponibles:');
    console.log(`     GET  http://localhost:${PORT}/api/countries`);
    console.log(`     GET  http://localhost:${PORT}/api/countries?q=colombia`);
    console.log(`     GET  http://localhost:${PORT}/api/countries/:id`);
    console.log('══════════════════════════════════════════════');
    console.log('');
  });
}

// Ejecutar y capturar errores de arranque
main().catch((error) => {
  console.error('❌ Error al iniciar el servidor:', error);
  process.exit(1);
});
