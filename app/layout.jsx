import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata = {
  title: "PCXPAY",
  description: "PCXPAY | Embedded Finance & Global Payments Infrastructure",
  openGraph: {
    title: "PCXPAY",
    description: "PCXPAY | Embedded Finance & Global Payments Infrastructure",
    siteName: "PCXPAY",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.variable} suppressHydrationWarning>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
