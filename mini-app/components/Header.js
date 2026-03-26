import Link from "next/link";

export default function Header() {
  const headerStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 20px', borderBottom: '1px solid #e9e9e9' };
  const titleStyle = { fontSize: 18, fontWeight: 600 };
  const navStyle = { display: 'flex', gap: 12 };
  const linkStyle = { color: '#0f1720', textDecoration: 'none', fontSize: 14 };

  return (
    <header style={headerStyle}>
      <h1 style={titleStyle}>Country App</h1>

      <nav style={navStyle}>
        <Link href="/" style={linkStyle}>Home</Link>
        <Link href="/countries" style={linkStyle}>Países</Link>
      </nav>
    </header>
  );
}