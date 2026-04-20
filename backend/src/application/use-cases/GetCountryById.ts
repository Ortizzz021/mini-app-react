/**
 * ============================================================
 * CAPA: APPLICATION — Caso de Uso: Obtener país por ID
 * ============================================================
 *
 * Este caso de uso busca un país específico usando su ID.
 *
 * Flujo:
 *   1. Recibe el ID como parámetro
 *   2. Llama a repository.getById(id)
 *   3. Devuelve el país encontrado o undefined
 *
 * El controller se encargará de responder 404 si es undefined.
 * El caso de uso NO debe manejar respuestas HTTP.
 */

import { Country } from '../../domain/entities/Country';
import { CountryRepository } from '../../domain/repositories/CountryRepository';

export class GetCountryById {
  constructor(private readonly repository: CountryRepository) {}

  /**
   * Ejecuta el caso de uso: buscar país por ID.
   * @param id - Identificador numérico del país
   * @returns Promesa con el país encontrado, o undefined si no existe
   *
   * Ejemplo de uso desde el controller:
   *   const country = await getCountryById.execute(42);
   *   if (!country) res.status(404).json({ error: 'Not found' });
   */
  async execute(id: number): Promise<Country | undefined> {
    return this.repository.getById(id);
  }
}
