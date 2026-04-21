import { Country } from '../../domain/entities/Country';
import { CountryRepository } from '../../domain/repositories/CountryRepository';

export class SearchCountries {
  constructor(private readonly repository: CountryRepository) {}

  /**
   * Ejecuta el caso de uso: buscar países por nombre.
   * @param query - Texto parcial para filtrar países (case-insensitive)
   * @returns Promesa con los países que coinciden
   */
  async execute(query: string): Promise<Country[]> {
    return this.repository.search(query);
  }
}
