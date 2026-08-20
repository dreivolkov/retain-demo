"use client";

import type { ReactNode } from "react";

export default function LandingScreenshot({
  screenshotDataUrl,
  children,
}: {
  screenshotDataUrl: string | null;
  children?: ReactNode;
}) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gray-100">
      {screenshotDataUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={screenshotDataUrl}
          alt="Prospect landing page"
          className="absolute inset-0 h-full w-full object-cover object-top"
        />
      ) : (
        <div className="flex h-screen items-center justify-center text-gray-400">
          No screenshot captured
        </div>
      )}
      <div className="absolute inset-0 bg-black/10" />
      {children}
    </div>
  );
}
