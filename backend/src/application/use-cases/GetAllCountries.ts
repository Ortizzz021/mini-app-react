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
