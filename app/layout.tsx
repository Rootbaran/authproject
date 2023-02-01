import "../styles/globals.css";

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html>
      <head />
      <body>
        <main className="bg-gray-800 h-screen text-white">{children}</main>
      </body>
    </html>
  );
}
