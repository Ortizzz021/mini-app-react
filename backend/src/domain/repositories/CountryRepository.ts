/**
 * ============================================================
 * CAPA: DOMAIN — Contrato/Interface del Repositorio
 * ============================================================
 *
 * Esta interface define el CONTRATO que cualquier repositorio
 * de países debe cumplir. Es una abstracción pura:
 *
 *   - NO dice CÓMO se obtienen los datos (eso es infrastructure)
 *   - Solo dice QUÉ operaciones están disponibles
 *
 * Gracias a este contrato podemos:
 *   1. Cambiar la fuente de datos sin tocar casos de uso
 *      (hoy es "en memoria", mañana podría ser MongoDB)
 *   2. Testear con mocks fácilmente
 *   3. Respetar el Principio de Inversión de Dependencias (DIP)
 */

import { Country } from '../entities/Country';

export interface CountryRepository {
  /**
   * Obtiene todos los países disponibles.
   * @returns Promesa con el array completo de países
   */
  getAll(): Promise<Country[]>;

  /**
   * Obtiene un país por su ID único.
   * @param id - Identificador numérico del país
   * @returns Promesa con el país encontrado, o undefined si no existe
   */
  getById(id: number): Promise<Country | undefined>;

  /**
   * Busca países cuyo nombre contenga el texto proporcionado.
   * La búsqueda NO distingue entre mayúsculas y minúsculas.
   * @param query - Texto parcial o completo del nombre del país
   * @returns Promesa con los países que coinciden con la búsqueda
   */
  search(query: string): Promise<Country[]>;
}
