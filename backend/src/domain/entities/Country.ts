/**
 * ============================================================
 * CAPA: DOMAIN — Entidad Country
 * ============================================================
 *
 * Esta es la entidad principal del dominio. Representa la
 * estructura de datos de un país dentro de nuestra aplicación.
 *
 * La capa de dominio es el NÚCLEO de Clean Architecture:
 *   - No depende de ninguna otra capa
 *   - No importa Express, bases de datos ni librerías externas
 *   - Define las reglas de negocio y las estructuras de datos
 *
 * Cada propiedad mapea los datos que necesitamos de la API
 * externa (restcountries.com) a un formato propio y limpio.
 */

export interface Country {
  /** Identificador único asignado internamente */
  id: number;

  /** Nombre común del país (ej: "Colombia") */
  name: string;

  /** Nombre de la capital (ej: "Bogotá") */
  capital: string;

  /** Nombre de la moneda principal (ej: "Colombian peso") */
  currency: string;

  /** URL de la imagen de la bandera del país */
  flagUrl: string;

  /**
   * Coordenadas geográficas [latitud, longitud].
   * Ejemplo: [4.0, -72.0] para Colombia
   */
  latlng: [number, number];
}
