import Header from "../components/Header";
import "../styles/globals.css";

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html className="scroll-auto [color-scheme:dark]">
      <head />
      <body>
        <main className="bg-gray-800 min-h-screen h-full text-white">
          <Header />
          {children}
        </main>
      </body>
    </html>
  );
}
