"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const API_BASE = "http://localhost:4000/api";

export default function Countries() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = search
      ? `${API_BASE}/countries?q=${encodeURIComponent(search)}`
      : `${API_BASE}/countries`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al conectar con el backend:", err);
        setLoading(false);
      });
  }, [search]);

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
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {loading ? (
          <p className="text-sm text-slate-600">Cargando datos...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {countries.map((country) => (
              <article
                key={country.id}
                className="bg-white rounded-lg shadow-sm border p-4 flex flex-col"
              >
                <div className="flex-shrink-0 mb-3 h-40 bg-slate-50 rounded overflow-hidden flex items-center justify-center">
                  <img
                    src={country.flagUrl}
                    alt={country.name}
                    className="h-full object-contain"
                  />
                </div>

                <h2 className="text-lg font-medium mb-1">{country.name}</h2>

                <p className="text-sm text-slate-600 mb-1">Capital: {country.capital}</p>

                <p className="text-sm text-slate-600 mb-2">Moneda: {country.currency}</p>

                <div className="mt-auto text-sm text-slate-500">
                  {Array.isArray(country.latlng) && country.latlng.length >= 2 ? (
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