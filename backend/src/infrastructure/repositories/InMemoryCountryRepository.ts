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
  private countries: Country[] = [];

  /**
   * Inicializa el repositorio cargando datos desde la API externa.
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

    this.countries = data.map((item, index) => ({
      id: index + 1,
      name: item.name?.common ?? 'Sin nombre',
      capital: item.capital?.[0] ?? 'N/A',
      currency: item.currencies
        ? Object.values(item.currencies)[0]?.name ?? 'N/A'
        : 'N/A',
      flagUrl: item.flags?.png ?? '',
      latlng: (item.latlng && item.latlng.length >= 2
        ? [item.latlng[0], item.latlng[1]]
        : [0, 0]) as [number, number],
    }));

    this.countries.sort((a, b) => a.name.localeCompare(b.name));

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
   */
  async search(query: string): Promise<Country[]> {
    const lowerQuery = query.toLowerCase();
    return this.countries.filter((country) =>
      country.name.toLowerCase().includes(lowerQuery)
    );
  }
}
