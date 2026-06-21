import type { Metadata } from "next";
import { SiteChrome } from "./components/SiteChrome";
import "./globals.css";

export const metadata: Metadata = {
  title: "Custom Extruded Aluminum Heat Sinks | Foshan Huixun Metal",
  description:
    "B2B factory website for custom extruded aluminum heat sinks, CNC machining, surface finishing, samples, and export shipment.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
