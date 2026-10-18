"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type RevealProps = {
  className: string;
  children: ReactNode;
};

export function Reveal({ className, children }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.18 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <article ref={ref} className={shown ? `${className} is-in` : className} data-reveal="">
      {children}
    </article>
  );
}
