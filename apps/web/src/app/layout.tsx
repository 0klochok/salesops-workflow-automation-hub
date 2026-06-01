import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "SalesOps Workflow Automation Hub",
  description: "Local frontend demo for deterministic lead intake automation.",
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
