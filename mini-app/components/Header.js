import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center justify-between py-4 border-b">
      <h1 className="text-lg font-semibold">Country App</h1>

      <nav className="flex gap-4">
        <Link href="/" className="text-slate-700 hover:text-slate-900">Home</Link>
        <Link href="/countries" className="text-slate-700 hover:text-slate-900">Países</Link>
      </nav>
    </header>
  );
}