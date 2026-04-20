/**
 * ============================================================
 * CAPA: APPLICATION — Caso de Uso: Buscar países por nombre
 * ============================================================
 *
 * Este caso de uso filtra países cuyo nombre coincida
 * parcialmente con el texto de búsqueda proporcionado.
 *
 * Aquí se demuestra el uso de QUERY PARAMS:
 *   GET /api/countries?q=colom  →  busca países con "colom" en el nombre
 *
 * El query param "q" lo extrae el controller y lo pasa aquí.
 */

import { Country } from '../../domain/entities/Country';
import { CountryRepository } from '../../domain/repositories/CountryRepository';

export class SearchCountries {
  constructor(private readonly repository: CountryRepository) {}

  /**
   * Ejecuta el caso de uso: buscar países por nombre.
   * @param query - Texto parcial para filtrar países (case-insensitive)
   * @returns Promesa con los países que coinciden
   *
   * Ejemplo:
   *   searchCountries.execute("col") → ["Colombia", "Colombia"]
   *   searchCountries.execute("united") → ["United States", "United Kingdom", ...]
   */
  async execute(query: string): Promise<Country[]> {
    return this.repository.search(query);
  }
}
