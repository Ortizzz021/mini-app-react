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
