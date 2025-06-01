import React from "react";
import { Header } from "./_components/Header";
import "./_css/app.scss";
import { AuthProvider } from "./_providers/Auth";
import "./styles.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata = {
  description: "SS.me - Payload Auth",
  title: "SS.me - Payload Auth",
};

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;

  return (
    <html lang="en">
      <body>
        <AuthProvider api="rest">
          <Header />
          <main className="main">{children}</main>
        </AuthProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
