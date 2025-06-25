import type { Metadata } from "next";
import {  Geist_Mono } from "next/font/google";
import "./globals.css";
import "./call-styles.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GoToTopButton from "@/components/GoToTopButton";
import { AuthProvider } from "@/contexts/AuthContext";
import { DoshaProvider } from "@/contexts/DoshaContext";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ananta Svastha | Ayurvedic Wellness App",
  description: "Discover your dosha type and achieve balance with personalized Ayurvedic recommendations",
  keywords: "ayurveda, dosha, vata, pitta, kapha, wellness, health, balance, personalized health",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
      className={`${geistMono.variable} font-sans antialiased selection:bg-[#334036] selection:text-[#F7F5EF]`}
      >
      <AuthProvider>
        <DoshaProvider>
          <Navbar />
          <main className="min-h-screen bg-white">
            {children}
          </main>
          <GoToTopButton />
          <Footer />
        </DoshaProvider>
      </AuthProvider>
      </body>
    </html>
  );
}
