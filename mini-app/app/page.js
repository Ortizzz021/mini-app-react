import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Header />

      <main className="p-6">
        <h1 className="text-3xl font-bold">GeoExplorer</h1>

        <p className="mt-4">
          Esta aplicación permite explorar información de países del mundode forma rápida y sencilla.
        </p>

        <p className="mt-2">
          Problema: poco conocimiento sobre algunos países.
        </p>

        <p className="mt-2">
          Integrantes: Juan Pablo Berrío - Daniel Ortiz
        </p>

        <Link href="/countries">
          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
            Ver países
          </button>
        </Link>
      </main>

      <Footer />
    </div>
  );
}