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

  const mainStyle = { padding: 24 };
  const titleStyle = { fontSize: 20, fontWeight: 700, marginBottom: 12 };
  const inputStyle = { width: '100%', padding: 10, border: '1px solid #e5e7eb', borderRadius: 6, marginBottom: 16 };
  const listStyle = { display: 'flex', flexWrap: 'wrap', gap: 16 };
  // reducir el ancho base de las tarjetas para que no se expandan demasiado
  const cardStyle = { flex: '1 1 260px', border: '1px solid #eaeaea', borderRadius: 8, padding: 12, boxShadow: '0 1px 3px rgba(0,0,0,0.04)', background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'stretch' };
  // hacer la imagen más alta y usar contain para mostrar la bandera completa
  const imgStyle = { width: '100%', height: 150, objectFit: 'contain', background: '#f8fafc', borderRadius: 6, marginBottom: 8, display: 'block' };
  const countryTitle = { fontSize: 16, fontWeight: 600, margin: '8px 0' };
  const smallText = { color: '#6b7280', fontSize: 13, margin: 0 };

  return (
    <div>
      <Header />

      <main style={mainStyle}>
        <h1 style={titleStyle}>Lista de Países</h1>

        <input
          type="text"
          placeholder="Buscar país..."
          style={inputStyle}
          onChange={(e) => setSearch(e.target.value)}
        />

        {loading && <p>Cargando...</p>}

        <div style={listStyle}>
          {filteredCountries.map((country, index) => (
            <div key={index} style={cardStyle}>
              <img src={country.flags.png} alt="flag" style={imgStyle} />
              <h2 style={countryTitle}>
                {country.name?.common || "Sin nombre"}
              </h2>

              <p style={smallText}>
                Capital: {country.capital?.[0] || "N/A"}
              </p>

              <p style={smallText}>
                Moneda: {country.currencies
                  ? Object.values(country.currencies)[0]?.name
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