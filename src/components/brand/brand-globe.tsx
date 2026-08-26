/**
 * <BrandGlobe /> — the interactive 3D brand mark.
 *
 * Replaces the flat logo in the navbar (small, ambient) and on the homepage
 * hero / About page (large, with country markers). The flat mark is still used
 * for the favicon and footer wordmark.
 */
import { lazy, Suspense, useEffect, useState } from "react";
import type { GlobeMarker } from "./globe-scene";
import { cn } from "@/lib/utils";

const GlobeScene = lazy(() => import("./globe-scene"));

export function BrandGlobe({
  size = 220,
  markers = [],
  interactive = true,
  showMotto = true,
  className,
}: {
  size?: number;
  markers?: GlobeMarker[];
  interactive?: boolean;
  showMotto?: boolean;
  className?: string;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div
      className={cn("relative select-none", className)}
      style={{ width: size, height: size }}
      aria-label="Blue World Cosmetics globe mark — drag to spin"
      role="img"
    >
      <div className="absolute inset-0 grid place-items-center">
        {mounted ? (
          <Suspense fallback={<GlobeFallback size={size} />}>
            <GlobeScene markers={markers} interactive={interactive} size={size} />
          </Suspense>
        ) : (
          <GlobeFallback size={size} />
        )}
      </div>
      {showMotto && <MottoArc size={size} />}
    </div>
  );
}

function GlobeFallback({ size }: { size: number }) {
  return (
    <div
      className="animate-pulse rounded-full bg-primary/25"
      style={{ width: size * 0.72, height: size * 0.72 }}
    />
  );
}

/** "GOD IS OUR STRENGTH" curved along the bottom arc, as on the original mark. */
function MottoArc({ size }: { size: number }) {
  const id = `motto-arc-${size}`;
  return (
    <svg
      viewBox="0 0 200 200"
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <path id={id} d="M 16 104 A 84 84 0 0 0 184 104" fill="none" />
      </defs>
      <text
        className="fill-accent font-display"
        style={{ fontSize: size < 90 ? 15 : 13, fontWeight: 800, letterSpacing: "0.14em" }}
      >
        <textPath href={`#${id}`} startOffset="50%" textAnchor="middle">
          GOD IS OUR STRENGTH
        </textPath>
      </text>
    </svg>
  );
}
