import React from "react";
import { Header } from "./_components/Header";
import "./_css/app.scss";
import { AuthProvider } from "./_providers/Auth";
import "./styles.css";

export const metadata = {
  description: "SS.live - Payload Auth",
  title: "SS.live - Payload Auth",
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
      </body>
    </html>
  );
}
