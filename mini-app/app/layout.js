
export const metadata = {
  title: "Country App",
  description: "Explorador de países",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        {children}
      </body>
    </html>
  );
}