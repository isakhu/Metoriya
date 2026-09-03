import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Metoriya | Hospital Management",
  description: "A modern hospital operations dashboard for patients, doctors, appointments, records, pharmacy and billing.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
