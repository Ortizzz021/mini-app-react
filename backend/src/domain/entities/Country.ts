export interface Country {
  id: number;

  name: string;

  capital: string;

  currency: string;

  flagUrl: string;

  /**
   * Coordenadas geográficas [latitud, longitud].
   * Ejemplo: [4.0, -72.0] para Colombia
   */
  latlng: [number, number];
}
