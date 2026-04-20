/**
 * ============================================================
 * CAPA: INTERFACES — Rutas de Countries
 * ============================================================
 *
 * Aquí se DEFINEN las rutas HTTP (endpoints) del recurso Country.
 * Las rutas solo conectan URLs con métodos del controller.
 *
 * Separar rutas y controllers es una buena práctica porque:
 *   - Las rutas solo definen QUÉ URL va a QUÉ método
 *   - Los controllers manejan la LÓGICA de cada endpoint
 *   - Es más fácil de mantener y testear por separado
 *
 * Endpoints definidos:
 *   GET  /api/countries       → Listar todos o buscar con ?q=
 *   GET  /api/countries/:id   → Obtener uno por ID
 */

import { Router } from 'express';
import { CountryController } from '../controllers/CountryController';
import { CountryRepository } from '../../domain/repositories/CountryRepository';

/**
 * Crea y configura el router de countries.
 *
 * Recibe el repositorio por parámetro para inyectarlo en el controller.
 * Esto mantiene la cadena de inyección de dependencias:
 *   index.ts → routes → controller → use cases → repository
 *
 * @param repository - Implementación del repositorio de países
 * @returns Router de Express configurado con las rutas
 */
export function createCountryRoutes(repository: CountryRepository): Router {
  const router = Router();
  const controller = new CountryController(repository);

  // GET /api/countries         → Devuelve todos los países
  // GET /api/countries?q=text  → Filtra países por nombre (query param)
  router.get('/', controller.getAll);

  // GET /api/countries/:id     → Devuelve un país por su ID (route param)
  // Ejemplo: /api/countries/42
  router.get('/:id', controller.getById);

  return router;
}
