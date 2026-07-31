import type { Metadata } from "next";
import { Caveat, Quicksand } from "next/font/google";
import "./globals.css";

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "For Shalu",
  description: "A little story for Girlfriend's Day",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${caveat.variable} ${quicksand.variable} h-[100dvh] antialiased overflow-hidden`}
    >
      <body className="h-full flex flex-col bg-gradient-to-br from-purple-100 to-pink-100 text-slate-800 font-sans">
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
          {/* Subtle decorative background - can add petals/hearts animation later */}
        </div>
        <main className="flex-1 w-full max-w-[430px] mx-auto h-full relative overflow-hidden bg-white/30 backdrop-blur-sm sm:border-x sm:border-white/20 sm:shadow-2xl">
          {children}
        </main>
      </body>
    </html>
  );
}
