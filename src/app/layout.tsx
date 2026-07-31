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
      <body className="h-full flex flex-col bg-dotted text-indigo-950 font-sans p-4 sm:p-8 md:p-12 items-center justify-center">
        <main className="w-full max-w-[500px] aspect-[4/5] max-h-[850px] h-full relative bg-white rounded-[32px] sm:rounded-[40px] shadow-2xl shadow-purple-500/10 overflow-hidden flex flex-col">
          
          {/* Decorative Corner Flowers */}
          <div className="absolute top-[-10px] left-[-10px] z-50 pointer-events-none opacity-90 scale-75 origin-top-left">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="32" cy="32" r="16" fill="#FBCFE8" />
              <path d="M32 8C34 16 38 20 44 22C38 24 34 28 32 36C30 28 26 24 20 22C26 20 30 16 32 8Z" fill="#F9A8D4" />
              <circle cx="32" cy="32" r="6" fill="#FDE68A" />
            </svg>
          </div>
          <div className="absolute top-4 right-4 z-50 pointer-events-none opacity-80 scale-50 origin-top-right">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M32 0C34 12 40 18 52 20C40 22 34 28 32 40C30 28 24 22 12 20C24 18 30 12 32 0Z" fill="#FFF" stroke="#FDE68A" strokeWidth="4"/>
              <circle cx="32" cy="20" r="4" fill="#FDE68A" />
            </svg>
          </div>

          <div className="flex-1 w-full h-full relative overflow-y-auto no-scrollbar">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
