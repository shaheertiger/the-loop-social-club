import type { Metadata } from "next";
import { Bridge } from "./Bridge";

// Invisible page embedded by the main site's forms. See app/_lib/site.ts.
export const metadata: Metadata = {
  title: "Form submission bridge",
  robots: { index: false, follow: false },
};

export default function SubmitBridgePage() {
  return <Bridge />;
}
