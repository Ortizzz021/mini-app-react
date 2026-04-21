

import express from 'express';
import cors from 'cors';
import { InMemoryCountryRepository } from './infrastructure/repositories/InMemoryCountryRepository';
import { createCountryRoutes } from './interfaces/routes/countryRoutes';

const PORT = process.env.PORT || 4000;

async function main() {
  const app = express();

  app.use(cors());

  app.use(express.json());

  const countryRepository = new InMemoryCountryRepository();

  await countryRepository.init();

  app.use('/api/countries', createCountryRoutes(countryRepository));

  app.get('/', (_req, res) => {
    res.json({
      message: 'GeoExplorer API — Clean Architecture',
      endpoints: {
        allCountries: 'GET /api/countries',
        searchByName: 'GET /api/countries?q=nombre',
        countryById: 'GET /api/countries/:id',
      },
    });
  });

  app.listen(PORT, () => {
    console.log('');
    console.log('══════════════════════════════════════════════');
    console.log(`  🌍 GeoExplorer API corriendo en:`);
    console.log(`     http://localhost:${PORT}`);
    console.log('');
    console.log('  📡 Endpoints disponibles:');
    console.log(`     GET  http://localhost:${PORT}/api/countries`);
    console.log(`     GET  http://localhost:${PORT}/api/countries?q=colombia`);
    console.log(`     GET  http://localhost:${PORT}/api/countries/:id`);
    console.log('══════════════════════════════════════════════');
    console.log('');
  });
}

main().catch((error) => {
  console.error('❌ Error al iniciar el servidor:', error);
  process.exit(1);
});
