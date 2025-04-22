import { Inter } from "next/font/google";
import "./globals.css";
import ReduxProvider from "./provide";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "HeavenHub | Find Your Dream Home",
  description: "Discover, list, and manage properties with ease on HeavenHub.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ReduxProvider>
        <body className={`${inter.variable} antialiased`}>{children}</body>
      </ReduxProvider>
    </html>
  );
}
