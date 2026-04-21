import { Router } from 'express';
import { CountryController } from '../controllers/CountryController';
import { CountryRepository } from '../../domain/repositories/CountryRepository';

/**
 * Crea y configura el router de countries.
 *
 * @param repository - Implementación del repositorio de países
 * @returns Router de Express configurado con las rutas
 */
export function createCountryRoutes(repository: CountryRepository): Router {
  const router = Router();
  const controller = new CountryController(repository);

  router.get('/', controller.getAll);

  router.get('/:id', controller.getById);

  return router;
}
