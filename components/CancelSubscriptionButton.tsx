"use client";

import { useEffect, useState } from "react";
import { initializePaddle, type Paddle } from "@paddle/paddle-js";

const LIVE_TOKEN = process.env.NEXT_PUBLIC_PADDLE_LIVE_TOKEN;

export default function CancelSubscriptionButton() {
  const [paddle, setPaddle] = useState<Paddle | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!LIVE_TOKEN) {
      setError("Missing NEXT_PUBLIC_PADDLE_LIVE_TOKEN");
      return;
    }
    initializePaddle({ token: LIVE_TOKEN, environment: "production" }).then((instance) => {
      if (instance) setPaddle(instance);
    });
  }, []);

  function handleCancel() {
    if (!paddle) return;
    // Retain.demo simulates the live Cancellation Flow without a real subscription.
    // Requires this domain to be allowlisted for the live client-side token, and a
    // Cancellation Flow configured in the Paddle dashboard.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (paddle as any).Retain?.demo({ feature: "cancellationFlow" });
  }

  return (
    <div className="flex flex-col items-start gap-2">
      <button
        onClick={handleCancel}
        disabled={!paddle}
        className="rounded-md border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-600 shadow-sm hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Cancel subscription
      </button>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
