import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function Home() {
  const mainStyle = { padding: 24 };
  const titleStyle = { fontSize: 28, fontWeight: 700, margin: 0 };
  const paragraphStyle = { marginTop: 12, color: "#374151", lineHeight: 1.5 };
  const buttonStyle = {
    marginTop: 16,
    background: "#0f1720",
    color: "#fff",
    padding: "8px 14px",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
  };

  return (
    <div>
      <Header />

      <main style={mainStyle}>
        <h1 style={titleStyle}>GeoExplorer</h1>

        <p style={paragraphStyle}>
          Esta aplicación permite explorar información de países del mundo de forma
          rápida y sencilla.
        </p>

        <p style={paragraphStyle}>
          Problema: poco conocimiento sobre algunos países.
        </p>

        <p style={paragraphStyle}>
          Integrantes: Juan Pablo Berrío - Daniel Ortiz
        </p>

        <Link href="/countries">
          <button style={buttonStyle}>Ver países</button>
        </Link>
      </main>

      <Footer />
    </div>
  );
}