import './globals.css';

export const metadata = {
  title: "Country App",
  description: "Explorador de países",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="bg-sky-50 text-slate-900 antialiased">
        <div className="max-w-4xl mx-auto p-6">
          {children}
        </div>
      </body>
    </html>
  );
}