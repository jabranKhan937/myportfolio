"use client";

import { useEffect, useRef } from "react";

export function WorldCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    let stop = () => {};
    let gone = false;

    void import("@/components/world-scene").then(({ mountWorld }) => {
      if (gone) return;
      stop = mountWorld(canvas);
    });

    return () => {
      gone = true;
      stop();
    };
  }, []);

  return <canvas ref={ref} className="world" id="world" aria-hidden="true" />;
}
