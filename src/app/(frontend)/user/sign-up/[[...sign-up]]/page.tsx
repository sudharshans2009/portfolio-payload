import React from "react";
import { SignUp } from "@clerk/nextjs";
import { BackgroundAll } from "@/components/background";

export default function SignUpPage() {
  return (
    <main className="relative flex min-h-screen flex-col items-center z-10">
      <BackgroundAll />
      <div className="flex flex-col items-center justify-center w-full max-w-7xl px-4 mx-auto">
        <section
          className="relative w-full pt-28 flex flex-col item-center justify-center"
          id="home"
        >
          <div className="w-full max-w-7xl mx-auto relative z-10">
            <div className="flex flex-col items-center mb-8">
              <SignUp />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
