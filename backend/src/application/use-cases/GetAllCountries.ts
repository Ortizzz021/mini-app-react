/**
 * ============================================================
 * CAPA: APPLICATION — Caso de Uso: Obtener todos los países
 * ============================================================
 *
 * Los casos de uso (use cases) contienen la LÓGICA DE NEGOCIO.
 * Cada caso de uso representa UNA operación específica.
 *
 * Este caso de uso:
 *   1. Recibe un repositorio (por inyección de dependencias)
 *   2. Llama a repository.getAll()
 *   3. Devuelve los datos
 *
 * NO sabe nada de HTTP, Express, ni bases de datos.
 * Solo conoce el contrato del repositorio (interface).
 */

import { Country } from '../../domain/entities/Country';
import { CountryRepository } from '../../domain/repositories/CountryRepository';

export class GetAllCountries {
  /**
   * Inyección de dependencias via constructor.
   * Recibimos la INTERFACE, no la implementación concreta.
   * Esto permite cambiar el repositorio sin modificar este código.
   */
  constructor(private readonly repository: CountryRepository) {}

  /**
   * Ejecuta el caso de uso: obtener todos los países.
   * @returns Promesa con el array de todos los países
   */
  async execute(): Promise<Country[]> {
    return this.repository.getAll();
  }
}
