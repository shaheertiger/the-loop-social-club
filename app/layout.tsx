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
  title: "Loop Social — Opening very soon in South Ajax",
  description:
    "South Ajax’s new social sports destination featuring 6 indoor pickleball courts, cricket training lanes, a café and a dedicated event space for parties, gatherings and celebrations. Minutes from Hwy 401.",
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
