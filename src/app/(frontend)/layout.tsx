import { Geist } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";

import "@/app/styles.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { generateMetadata } from "@/lib/metadata";
import Script from "next/script";
import { Metadata, Viewport } from "next";
import QueryProvider from "@/components/providers/query-provider";
import { headers } from "next/headers";
import UnreadReplys from "@/components/unread-replys";
import payloadConfig from "@/payload.config";
import { getPayload } from "payload";

const geistSans = Geist({
  variable: "--font-geist-sans",
  preload: true,
  subsets: ["latin"],
});

export const metadata: Metadata = generateMetadata(
  "https://sudharshans2009.live",
  "SS.live",
);

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const request = await headers();
  const ip =
    request.get("x-forwarded-for") || request.get("x-real-ip") || "Unknown IP";
  const config = await payloadConfig;
  const payload = await getPayload({ config });
  const { user } = await payload.auth({ headers: request });

  return (
    <html lang="en" className="scheme-dark dark" suppressHydrationWarning>
      <body
        className={cn("antialiased", geistSans.className)}
        suppressHydrationWarning
      >
        <QueryProvider>
          <ThemeProvider>
            <Navbar user={user} />
            {children}
            <Footer />
            <UnreadReplys ip={ip} />
          </ThemeProvider>
        </QueryProvider>
        <Toaster position="bottom-right" richColors />
        {typeof window !== "undefined" && (
          <>
            <Script src="./scripts/script.js" />
            <Script src="./scripts/sw.js" />
          </>
        )}
      </body>
    </html>
  );
}
