"use client";

import { useEffect, useState, useRef } from "react";

interface CounterProps {
  end: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}

export default function Counter({
  end,
  duration = 2000,
  decimals = 0,
  prefix = "",
  suffix = "",
}: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let animationFrame: number;

    const checkPreloaderAndStart = () => {
      if (document.querySelector('.preloader-modern')) {
        setTimeout(checkPreloaderAndStart, 500);
        return;
      }

      let startTime: number;

      const updateCount = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;

        // Easing function (easeOutExpo)
        const easeOutExpo = (x: number): number => {
          return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
        };

        const percentage = Math.min(progress / duration, 1);
        const easedProgress = easeOutExpo(percentage);
        const currentCount = easedProgress * end;

        if (percentage < 1) {
          setCount(currentCount);
          animationFrame = requestAnimationFrame(updateCount);
        } else {
          setCount(end);
        }
      };

      animationFrame = requestAnimationFrame(updateCount);
    };

    checkPreloaderAndStart();

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [end, duration, isVisible]);

  return (
    <span ref={ref}>
      {prefix}
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
}
