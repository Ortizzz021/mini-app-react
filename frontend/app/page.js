import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Header />

      <main className="py-8">
        <h1 className="text-4xl font-extrabold text-slate-900">GeoExplorer</h1>

        <p className="mt-6 text-slate-700 max-w-2xl">
          GeoExplorer es una herramienta minimalista para explorar datos clave de
          países alrededor del mundo: banderas, capitales, monedas y ubicación geográfica (latitud y longitud).
          Permite a estudiantes, profesores y cualquier persona interesada obtener
          respuestas rápidas sobre países, comparar información básica y visualizar
          coordenadas para usos educativos o de investigación.
        </p>

        <p className="mt-4 text-slate-700 max-w-2xl">
          Problema que resuelve: mucha información está fragmentada en múltiples
          fuentes; GeoExplorer centraliza datos esenciales en una interfaz simple y
          accesible, haciendo la indagación rápida y sin distracciones.
        </p>

        <p className="mt-4 text-slate-700 max-w-2xl">
          Integrantes: Juan Pablo Berrío - Daniel Ortiz
        </p>

        <Link href="/countries">
          <button className="mt-6 bg-slate-900 text-white px-4 py-2 rounded-md">
            Ver países
          </button>
        </Link>
      </main>

      <Footer />
    </div>
  );
}