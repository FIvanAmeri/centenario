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
    <html lang="es" className="w-full h-full">
      <body
        className="min-h-screen w-full h-full 
                   /* 🚨 PRUEBA DE DIAGNÓSTICO: GRADIENTE AZUL A ROJO 🚨 */
                   bg-gradient-to-br from-blue-500 to-red-500 
                   flex items-center justify-center"
      >
        {children}
      </body>
    </html>
  );
}
