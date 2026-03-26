export const metadata = {
  title: "Country App",
  description: "Explorador de países",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body style={{ margin: 0, fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial', background: '#e6f7ff', color: '#0f1720' }}>
        <div style={{ maxWidth: 980, margin: '0 auto', padding: 20 }}>
          {children}
        </div>
      </body>
    </html>
  );
}