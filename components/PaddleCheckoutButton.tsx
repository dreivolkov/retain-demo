"use client";

import { useEffect, useState } from "react";
import { initializePaddle, type Paddle } from "@paddle/paddle-js";

const SANDBOX_TOKEN = process.env.NEXT_PUBLIC_PADDLE_SANDBOX_TOKEN;
const SANDBOX_PRICE_ID = process.env.NEXT_PUBLIC_PADDLE_SANDBOX_PRICE_ID;

export default function PaddleCheckoutButton({
  autoOpen = false,
  label = "Update payment information",
  className,
}: {
  autoOpen?: boolean;
  label?: string;
  className?: string;
}) {
  const [paddle, setPaddle] = useState<Paddle | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!SANDBOX_TOKEN) {
      setError("Missing NEXT_PUBLIC_PADDLE_SANDBOX_TOKEN");
      return;
    }
    initializePaddle({ token: SANDBOX_TOKEN, environment: "sandbox" }).then((instance) => {
      if (instance) {
        setPaddle(instance);
        if (autoOpen) {
          openCheckout(instance);
        }
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function openCheckout(instance: Paddle) {
    if (!SANDBOX_PRICE_ID) {
      setError("Missing NEXT_PUBLIC_PADDLE_SANDBOX_PRICE_ID");
      return;
    }
    instance.Checkout.open({
      items: [{ priceId: SANDBOX_PRICE_ID, quantity: 1 }],
    });
  }

  if (error) {
    return (
      <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
    );
  }

  if (autoOpen) return null;

  return (
    <button
      onClick={() => paddle && openCheckout(paddle)}
      disabled={!paddle}
      className={className}
    >
      {label}
    </button>
  );
}
