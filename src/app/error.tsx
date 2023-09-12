"use client";

import { useEffect } from "react";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import LogoError from "@/components/LogoError";
import BottomError from "@/components/bottomError";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <>
      <Header />
      <main id="error404">
        <div className="container">
          <LogoError />
          <div className="center">
            <h1>Something went wrong !</h1>
            <button onClick={() => reset()} className="btn-primary">
              Try again
            </button>
          </div>
          <BottomError />
        </div>
      </main>
      <Footer />
    </>
  );
}
