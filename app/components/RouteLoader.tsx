"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

type LoadingContextValue = {
  navigateTo: (href: string) => void;
};

const LoadingContext = createContext<LoadingContextValue>({ navigateTo: () => {} });

export function useRouteLoading() {
  return useContext(LoadingContext);
}

const MIN_LOADING_MS = 700;

export default function RouteLoader({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isFirstRender = useRef(true);
  const fallbackTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (fallbackTimer.current) clearTimeout(fallbackTimer.current);
    setLoading(false);
  }, [pathname]);

  const navigateTo = (href: string) => {
    if (href === pathname) return;
    setLoading(true);

    if (fallbackTimer.current) clearTimeout(fallbackTimer.current);
    setTimeout(() => {
      router.push(href);
    }, MIN_LOADING_MS);
    fallbackTimer.current = setTimeout(() => setLoading(false), MIN_LOADING_MS + 2500);
  };

  return (
    <LoadingContext.Provider value={{ navigateTo }}>
      {loading && (
        <div className="route-loader">
          <div className="route-loader-inner">
            <Image
              src="/images/logo/MyDEV.png"
              alt="Memuat"
              width={250}
              height={250}
              className="route-loader-logo"
              priority
            />
            <span className="route-loader-spinner"></span>
          </div>
        </div>
      )}
      {children}
    </LoadingContext.Provider>
  );
}
