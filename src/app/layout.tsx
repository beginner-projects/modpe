import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/ui/navbar/navbar";
import { MetaMaskContextProvider } from "@/context/useMetaMask";



export const metadata: Metadata = {
  title: "MRAB CLUB",
  description: "Blockchain businesses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <body>
        <MetaMaskContextProvider>
          <Navbar />
          {children}
        </MetaMaskContextProvider>
      </body>


    </html>
  );
}
