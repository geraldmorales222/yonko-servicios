"use client";

import { useEffect, useRef, useState, createElement } from "react";

interface LazyModelViewerProps {
  src: string;
  poster: string;
  alt: string;
  style?: React.CSSProperties;
  autoRotate?: boolean;
  rotationPerSecond?: string;
  shadowIntensity?: string;
  exposure?: string;
}

export default function LazyModelViewer({
  src,
  poster,
  alt,
  style,
  autoRotate = true,
  rotationPerSecond = "24deg",
  shadowIntensity = "0.8",
  exposure = "0.95",
}: LazyModelViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoadScript, setShouldLoadScript] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldLoadScript(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldLoadScript) return;
    if (document.getElementById("model-viewer-script")) return;

    const script = document.createElement("script");
    script.id = "model-viewer-script";
    script.type = "module";
    script.src = "https://ajax.googleapis.com/ajax/libs/model-viewer/3.5.0/model-viewer.min.js";
    document.body.appendChild(script);
  }, [shouldLoadScript]);

  return (
    <div ref={containerRef} className="relative h-full w-full">
      {shouldLoadScript
        ? createElement("model-viewer", {
            src,
            poster,
            alt,
            "camera-controls": true,
            "auto-rotate": autoRotate,
            "rotation-per-second": rotationPerSecond,
            "interaction-prompt": "none",
            reveal: "auto",
            loading: "lazy",
            "shadow-intensity": shadowIntensity,
            exposure,
            style: {
              width: "100%",
              height: "100%",
              pointerEvents: "none",
              ...style,
            },
          })
        : poster && (
            <img
              src={poster}
              alt={alt}
              className="h-full w-full object-contain p-4"
              loading="lazy"
            />
          )}
    </div>
  );
}
