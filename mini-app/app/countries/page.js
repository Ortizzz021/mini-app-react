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
      .then(res => res.json())
      .then(data => {
        setCountries(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Header />

      <main className="p-6">
        <h1 className="text-2xl font-bold mb-4">Lista de Países</h1>

        {/* Buscador */}
        <input
          type="text"
          placeholder="Buscar país..."
          className="border p-2 mb-4 w-full"
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Loading */}
        {loading && <p>Cargando...</p>}

        {/* Lista */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredCountries.map((country, index) => (
            <div key={index} className="border p-4 rounded shadow">
              <img src={country.flags.png} alt="flag" className="w-full h-32 object-cover" />

              <h2 className="font-bold mt-2">
                {country.name.common}
              </h2>

              <p>Capital: {country.capital?.[0]}</p>

              <p>
                Moneda: {country.currencies
                  ? Object.values(country.currencies)[0].name
                  : "N/A"}
              </p>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}