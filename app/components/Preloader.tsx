"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Preloader() {
  const [show, setShow] = useState(true);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Wait for the fake progress bar animation to complete (2.9s) + slight delay
    const timer1 = setTimeout(() => {
      setIsReady(true);
    }, 3000);

    // Completely unmount after the slide-up curtain effect finishes
    const timer2 = setTimeout(() => {
      setShow(false);
    }, 3900);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  if (!show) return null;

  return (
    <div className={`preloader-modern ${isReady ? "slide-up" : ""}`}>
      <div className="preloader-content-modern">
        <Image
          src="/images/logo/MyDEV.png"
          alt="MyDEV Loading"
          width={250}
          height={250}
          className={`preloader-logo-modern ${isReady ? "fade-zoom" : ""}`}
          priority
        />
        <div className={`progress-track ${isReady ? "hide-progress" : ""}`}>
          <div className="progress-fill"></div>
        </div>
      </div>
    </div>
  );
}
