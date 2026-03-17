import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vyalo",
  description: "Your live local concierge on WhatsApp.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
