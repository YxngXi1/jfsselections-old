import type { Metadata } from "next";
import "./globals.css";
import { AOSInitializer } from "../components/AOSInitializer";

export const metadata: Metadata = {
  title: "John Fraser Elections",
  description: "Created my JFSS SAC",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AOSInitializer />
        {children}
      </body>
    </html>
  );
}
