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
    <html lang="es">
      <body
        className="min-h-screen font-sans text-neutral-900"
        style={{
          backgroundImage: "linear-gradient(to bottom right, #e0f7fa, #80deea)",
        }}
      >
        <div className="relative z-0">{children}</div>
      </body>
    </html>
  );
}