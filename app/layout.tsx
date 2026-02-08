import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Martin Rojas | Ingeniero de Software",
    template: "%s | Martin Roja | Ingeniero de Software",
  },
  description:
    "Ingeniero de software enfocado en desarrollo web, arquitectura y buenas prácticas. Portfolio profesional, proyectos académicos y personales, y blog técnico.",
  keywords: [
    "ingeniería de software",
    "desarrollo web",
    "full stack",
    "backend",
    "frontend",
    "arquitectura de software",
    "blog técnico",
    "portfolio desarrollador",
  ],
  authors: [{ name: "Martin Rojas" }],
  creator: "Martin Rojas",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://yourdomain.com",
    siteName: "Martin Rojas | Ingeniero de Software",
    title: "Martin Rojas | Ingeniero de Software",
    description: "Ingeniero de software enfocado en desarrollo web, arquitectura y buenas prácticas. Portfolio profesional, proyectos académicos y personales, y blog técnico.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Martin Rojas | Ingeniero de Software",
    description: "Ingeniero de software enfocado en desarrollo web, arquitectura y buenas prácticas. Portfolio profesional, proyectos académicos y personales, y blog técnico.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
