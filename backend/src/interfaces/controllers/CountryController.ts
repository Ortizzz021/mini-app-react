/**
 * ============================================================
 * CAPA: INTERFACES — Controller de Countries
 * ============================================================
 *
 * El controller es el PUENTE entre HTTP y la lógica de negocio.
 *
 * Responsabilidades del controller:
 *   1. Recibir el objeto Request de Express
 *   2. Extraer datos del request (params, query params, body)
 *   3. Llamar al caso de uso correspondiente
 *   4. Formatear y enviar la respuesta HTTP (status + JSON)
 *
 * El controller NO contiene lógica de negocio.
 * Eso va en los casos de uso (application layer).
 *
 * ═══════════════════════════════════════════════════════════
 * PARAMS vs QUERY PARAMS — Explicación:
 * ═══════════════════════════════════════════════════════════
 *
 * PARAMS (req.params):
 *   - Son parte de la URL, definidos con ":" en la ruta
 *   - Ejemplo: GET /api/countries/:id  →  /api/countries/42
 *   - Se acceden con: req.params.id  →  "42"
 *   - Se usan para identificar un recurso específico
 *
 * QUERY PARAMS (req.query):
 *   - Van después del "?" en la URL
 *   - Ejemplo: GET /api/countries?q=colombia&limit=10
 *   - Se acceden con: req.query.q  →  "colombia"
 *   - Se usan para filtrar, buscar, paginar, etc.
 * ═══════════════════════════════════════════════════════════
 */

import { Request, Response } from 'express';
import { GetAllCountries } from '../../application/use-cases/GetAllCountries';
import { GetCountryById } from '../../application/use-cases/GetCountryById';
import { SearchCountries } from '../../application/use-cases/SearchCountries';
import { CountryRepository } from '../../domain/repositories/CountryRepository';

export class CountryController {
  // Instancias de los casos de uso, inyectadas con el repositorio
  private getAllCountries: GetAllCountries;
  private getCountryById: GetCountryById;
  private searchCountries: SearchCountries;

  /**
   * El controller recibe el repositorio y crea los casos de uso.
   * Esto es inyección de dependencias: el controller no crea
   * el repositorio, lo recibe desde fuera.
   */
  constructor(repository: CountryRepository) {
    this.getAllCountries = new GetAllCountries(repository);
    this.getCountryById = new GetCountryById(repository);
    this.searchCountries = new SearchCountries(repository);
  }

  /**
   * GET /api/countries
   * GET /api/countries?q=colombia
   *
   * Si hay query param "q", filtra por nombre.
   * Si no hay query param, devuelve todos.
   *
   * Ejemplo con query param:
   *   curl "http://localhost:4000/api/countries?q=col"
   *   → Devuelve países que contengan "col" en el nombre
   *
   * Ejemplo sin query param:
   *   curl http://localhost:4000/api/countries
   *   → Devuelve todos los países
   */
  getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      // req.query.q contiene el query param "q" si existe
      const query = req.query.q as string | undefined;

      let countries;
      if (query) {
        // Si hay búsqueda, usar el caso de uso SearchCountries
        countries = await this.searchCountries.execute(query);
      } else {
        // Si no hay búsqueda, devolver todos
        countries = await this.getAllCountries.execute();
      }

      // Responder con status 200 y el array de países en JSON
      res.status(200).json(countries);
    } catch (error) {
      console.error('Error en getAll:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };

  /**
   * GET /api/countries/:id
   *
   * Busca un país por su ID numérico (route param).
   *
   * req.params.id contiene el valor del parámetro ":id" de la URL.
   * Ejemplo:
   *   curl http://localhost:4000/api/countries/42
   *   → req.params.id === "42" (string, hay que convertir a número)
   */
  getById = async (req: Request, res: Response): Promise<void> => {
    try {
      // req.params.id es un STRING, hay que convertirlo a número
      const id = parseInt(req.params.id as string, 10);

      // Validar que el ID sea un número válido
      if (isNaN(id)) {
        res.status(400).json({ error: 'El ID debe ser un número válido' });
        return;
      }

      const country = await this.getCountryById.execute(id);

      if (!country) {
        // Si no se encontró el país, responder con 404
        res.status(404).json({ error: `País con ID ${id} no encontrado` });
        return;
      }

      // Responder con el país encontrado
      res.status(200).json(country);
    } catch (error) {
      console.error('Error en getById:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };
}
