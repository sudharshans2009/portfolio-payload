import { Poppins } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
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
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "@/app/styles.css";
import { ClerkProvider } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

const poppins = Poppins({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = generateMetadata(
  "https://sudharshans.me",
  "SS.me"
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
  const user = await currentUser();

  return (
    <ClerkProvider>
      <html lang="en" className="scheme-dark dark" suppressHydrationWarning>
        <body
          className={cn("antialiased", poppins.className)}
          suppressHydrationWarning
        >
          <QueryProvider>
            <ThemeProvider>
              <Navbar />
              {children}
              <Footer />
              <UnreadReplys email={user?.primaryEmailAddress?.emailAddress} />
            </ThemeProvider>
          </QueryProvider>
          <Toaster position="bottom-right" richColors />
          <Analytics />
          <SpeedInsights />
          {typeof window !== "undefined" && (
            <>
              <Script src="./scripts/script.js" />
              <Script src="./scripts/sw.js" />
            </>
          )}
        </body>
      </html>
    </ClerkProvider>
  );
}
