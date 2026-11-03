import type { Metadata } from "next";
import { Google_Sans_Flex, Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const googleSansFlex = Google_Sans_Flex({
  variable: "--font-google-flex",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SciPrimeX",
  description:
    "SciPrimeX turns scientific research into AI-powered solutions for health and education, from Siegen and Port Harcourt.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${googleSansFlex.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
