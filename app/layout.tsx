import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Figtree } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Loop Social — Opening very soon in South Ajax",
  description:
    "South Ajax’s new social sports destination featuring 6 indoor pickleball courts, cricket training lanes, a café and a dedicated event space for parties, gatherings and celebrations. Minutes from Hwy 401.",
};

export const viewport: Viewport = {
  themeColor: "#15263A",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${figtree.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
