import type { Metadata, Viewport } from "next";
import { Figtree, Instrument_Serif, Unbounded } from "next/font/google";
import "./globals.css";

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Loop Social — Opening soon in Ajax, Ontario",
  description:
    "Loop Social is a new indoor home for pickleball, cricket and a cozy café in Ajax, Ontario. Join the list for opening dates, early court bookings and launch events.",
};

export const viewport: Viewport = {
  themeColor: "#273D57",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${unbounded.variable} ${figtree.variable} ${instrumentSerif.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
