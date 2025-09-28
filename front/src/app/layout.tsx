import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hospital Centenario",
  description: "Sistema de gestión institucional",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="h-full">
      <body className="min-h-screen font-sans text-white">
        <div className="min-h-screen flex flex-col bg-centenario">{children}</div>
      </body>
    </html>
  );
}