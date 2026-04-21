import { Country } from '../../domain/entities/Country';
import { CountryRepository } from '../../domain/repositories/CountryRepository';

export class GetCountryById {
  constructor(private readonly repository: CountryRepository) {}

  /**
   * Ejecuta el caso de uso: buscar país por ID.
   * @param id - Identificador numérico del país
   * @returns Promesa con el país encontrado, o undefined si no existe
   */
  async execute(id: number): Promise<Country | undefined> {
    return this.repository.getById(id);
  }
}
