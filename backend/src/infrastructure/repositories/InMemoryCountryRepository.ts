/**
 * ============================================================
 * CAPA: INFRASTRUCTURE — Repositorio en Memoria
 * ============================================================
 *
 * Esta es la IMPLEMENTACIÓN CONCRETA del contrato CountryRepository.
 * Aquí sí hay dependencias externas (fetch a API, almacenamiento).
 *
 * Funciona así:
 *   1. Al llamar init(), hace fetch a restcountries.com
 *   2. Transforma los datos al formato de nuestra entidad Country
 *   3. Guarda todo en un array en memoria (simulando una BD)
 *   4. Los métodos getAll, getById, search operan sobre ese array
 *
 * Si mañana quisiéramos cambiar a MongoDB o PostgreSQL,
 * crearíamos otra clase (ej: MongoCountryRepository) que
 * implemente la misma interface, sin tocar los casos de uso.
 */

import { Country } from '../../domain/entities/Country';
import { CountryRepository } from '../../domain/repositories/CountryRepository';

/**
 * Interfaz que representa la estructura que devuelve la API externa
 * restcountries.com para cada país.
 */
interface RestCountryApiResponse {
  name: { common: string };
  capital?: string[];
  currencies?: Record<string, { name: string }>;
  flags: { png: string };
  latlng?: number[];
}

export class InMemoryCountryRepository implements CountryRepository {
  /**
   * Array en memoria que simula nuestra base de datos.
   * Se llena al llamar init() con datos de la API externa.
   */
  private countries: Country[] = [];

  /**
   * Inicializa el repositorio cargando datos desde la API externa.
   * Debe llamarse UNA VEZ al arrancar el servidor, antes de
   * servir peticiones.
   *
   * Transforma cada país de la API externa a nuestra entidad Country,
   * asignando un ID numérico secuencial (1, 2, 3, ...).
   */
  async init(): Promise<void> {
    console.log('📡 Cargando países desde restcountries.com...');

    const response = await fetch(
      'https://restcountries.com/v3.1/all?fields=name,capital,currencies,flags,latlng'
    );

    if (!response.ok) {
      throw new Error(`Error al obtener países: HTTP ${response.status}`);
    }

    const data = (await response.json()) as RestCountryApiResponse[];

    // Transformar datos de la API externa a nuestra entidad de dominio
    this.countries = data.map((item, index) => ({
      // Asignamos un ID numérico secuencial empezando desde 1
      id: index + 1,

      // Nombre común del país
      name: item.name?.common ?? 'Sin nombre',

      // Primera capital (algunos países tienen varias o ninguna)
      capital: item.capital?.[0] ?? 'N/A',

      // Nombre de la primera moneda listada
      currency: item.currencies
        ? Object.values(item.currencies)[0]?.name ?? 'N/A'
        : 'N/A',

      // URL de la bandera en formato PNG
      flagUrl: item.flags?.png ?? '',

      // Coordenadas [lat, lng], con fallback a [0, 0]
      latlng: (item.latlng && item.latlng.length >= 2
        ? [item.latlng[0], item.latlng[1]]
        : [0, 0]) as [number, number],
    }));

    // Ordenar alfabéticamente por nombre para mejor presentación
    this.countries.sort((a, b) => a.name.localeCompare(b.name));

    // Reasignar IDs después de ordenar para que sean consistentes
    this.countries = this.countries.map((country, index) => ({
      ...country,
      id: index + 1,
    }));

    console.log(`✅ ${this.countries.length} países cargados en memoria.`);
  }

  /**
   * Devuelve todos los países almacenados en memoria.
   */
  async getAll(): Promise<Country[]> {
    return this.countries;
  }

  /**
   * Busca un país por su ID numérico.
   * @param id - ID del país (empieza desde 1)
   * @returns El país encontrado o undefined
   *
   * Ejemplo: getById(42) → el país con id === 42
   */
  async getById(id: number): Promise<Country | undefined> {
    return this.countries.find((country) => country.id === id);
  }

  /**
   * Filtra países cuyo nombre contenga el texto de búsqueda.
   * La búsqueda es case-insensitive (no distingue mayúsculas).
   *
   * @param query - Texto parcial del nombre
   * @returns Array de países que coinciden
   *
   * Ejemplo: search("col") → ["Colombia"]
   */
  async search(query: string): Promise<Country[]> {
    const lowerQuery = query.toLowerCase();
    return this.countries.filter((country) =>
      country.name.toLowerCase().includes(lowerQuery)
    );
  }
}
