"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Countries() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?fields=name,capital,currencies,flags,latlng")
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const filteredCountries = countries.filter((country) =>
    country?.name?.common?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Header />

      <main className="py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Lista de Países</h1>
          <input
            type="text"
            placeholder="Buscar país..."
            className="border rounded-md px-3 py-2 w-64 text-sm"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {loading ? (
          <p className="text-sm text-slate-600">Cargando datos...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCountries.map((country, index) => (
              <article
                key={country?.name?.common ?? index}
                className="bg-white rounded-lg shadow-sm border p-4 flex flex-col"
              >
                <div className="flex-shrink-0 mb-3 h-40 bg-slate-50 rounded overflow-hidden flex items-center justify-center">
                  <img
                    src={country?.flags?.png}
                    alt={country?.name?.common ?? 'bandera'}
                    className="h-full object-contain"
                  />
                </div>

                <h2 className="text-lg font-medium mb-1">{country?.name?.common ?? "Sin nombre"}</h2>

                <p className="text-sm text-slate-600 mb-1">Capital: {country?.capital?.[0] ?? "N/A"}</p>

                <p className="text-sm text-slate-600 mb-2">Moneda: {country?.currencies ? Object.values(country.currencies)[0]?.name : "N/A"}</p>

                <div className="mt-auto text-sm text-slate-500">
                  {Array.isArray(country?.latlng) && country.latlng.length >= 2 ? (
                    <p>Ubicación: lat {country.latlng[0].toFixed(4)}, lng {country.latlng[1].toFixed(4)}</p>
                  ) : (
                    <p>Ubicación: N/D</p>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}