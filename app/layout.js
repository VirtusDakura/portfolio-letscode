import { Inter, Space_Grotesk } from "next/font/google";
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata = {
  title: "LetsCode — Technology Company | Intelligent Digital Solutions",
  description:
    "LetsCode is a technology company focused on building intelligent, scalable digital solutions for businesses and organizations. From web and mobile applications to AI-powered systems.",
  openGraph: {
    title: "LetsCode — Technology Company | Intelligent Digital Solutions",
    description: "Turning ideas into impactful, real-world solutions that improve efficiency and drive growth. Welcome to LetsCode.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>

      <body className="font-sans">
        {/* Ambient background effects */}
        <div className="ambient" aria-hidden="true">
          <div className="ambient__orb ambient__orb--1" />
          <div className="ambient__orb ambient__orb--2" />
          <div className="ambient__orb ambient__orb--3" />
        </div>
        <div className="grain" aria-hidden="true" />

        <ClientLayoutWrapper>
          {children}
        </ClientLayoutWrapper>
      </body>
    </html>
  );
}
