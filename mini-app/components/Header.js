import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between">
      <h1>Country App</h1>

      <nav>
        <Link href="/" className="mr-4">Home</Link>
        <Link href="/countries">Países</Link>
      </nav>
    </header>
  );
}