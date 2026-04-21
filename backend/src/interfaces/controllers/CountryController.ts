import { Request, Response } from 'express';
import { GetAllCountries } from '../../application/use-cases/GetAllCountries';
import { GetCountryById } from '../../application/use-cases/GetCountryById';
import { SearchCountries } from '../../application/use-cases/SearchCountries';
import { CountryRepository } from '../../domain/repositories/CountryRepository';

export class CountryController {
  private getAllCountries: GetAllCountries;
  private getCountryById: GetCountryById;
  private searchCountries: SearchCountries;

  constructor(repository: CountryRepository) {
    this.getAllCountries = new GetAllCountries(repository);
    this.getCountryById = new GetCountryById(repository);
    this.searchCountries = new SearchCountries(repository);
  }

  /**
   * GET /api/countries
   * GET /api/countries?q=colombia
   */
  getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const query = req.query.q as string | undefined;

      let countries;
      if (query) {
        countries = await this.searchCountries.execute(query);
      } else {
        countries = await this.getAllCountries.execute();
      }

      res.status(200).json(countries);
    } catch (error) {
      console.error('Error en getAll:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };

  /**
   * GET /api/countries/:id
   */
  getById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id as string, 10);

      if (isNaN(id)) {
        res.status(400).json({ error: 'El ID debe ser un número válido' });
        return;
      }

      const country = await this.getCountryById.execute(id);

      if (!country) {
        res.status(404).json({ error: `País con ID ${id} no encontrado` });
        return;
      }

      res.status(200).json(country);
    } catch (error) {
      console.error('Error en getById:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };
}
