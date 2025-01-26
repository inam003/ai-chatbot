import { Toaster } from "react-hot-toast";
import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AI Chatbot",
  description: "An AI chatbot for everything.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
