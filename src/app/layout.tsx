import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Umayer GitHub Analytics",
  description: "Advanced GitHub analytics dashboard for UmayerCoding1",
  keywords: ["GitHub", "Analytics", "Dashboard", "Next.js", "TypeScript", "Tailwind CSS"],
  authors: [{ name: "UmayerCoding1" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased selection:bg-emerald-500/30`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative min-h-screen overflow-x-hidden bg-black">
            {/* Background Gradients */}
            <div className="fixed inset-0 z-[-1] overflow-hidden">
              <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full animate-pulse-slow" />
              <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-500/5 blur-[120px] rounded-full" />
            </div>

            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
