"use client";

import { useEffect, useRef } from "react";
import { initializePaddle } from "@paddle/paddle-js";

type RetainFeature = "paymentRecovery" | "paymentRecoveryInApp" | "cancellationFlow" | "termOptimization";

const LIVE_TOKEN = process.env.NEXT_PUBLIC_PADDLE_LIVE_TOKEN;

interface Props {
  feature: RetainFeature;
  autoTrigger?: boolean;
  autoTriggerDelay?: number;
  children?: (trigger: () => void, ready: boolean) => React.ReactNode;
}

export default function RetainDemoTrigger({
  feature,
  autoTrigger = false,
  autoTriggerDelay = 0,
  children,
}: Props) {
  const paddleRef = useRef<Awaited<ReturnType<typeof initializePaddle>> | null>(null);
  const triggeredRef = useRef(false);

  function fire(paddle: NonNullable<typeof paddleRef.current>) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (paddle as any).Retain?.demo({ feature });
  }

  useEffect(() => {
    if (!LIVE_TOKEN) {
      console.error("Missing NEXT_PUBLIC_PADDLE_LIVE_TOKEN");
      return;
    }

    initializePaddle({ token: LIVE_TOKEN, environment: "production" }).then(
      (instance) => {
        if (!instance) return;
        paddleRef.current = instance;

        if (autoTrigger && !triggeredRef.current) {
          const delay = autoTriggerDelay > 0 ? autoTriggerDelay : 0;
          const timer = setTimeout(() => {
            triggeredRef.current = true;
            fire(instance);
          }, delay);
          return () => clearTimeout(timer);
        }
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (children) {
    return (
      <>
        {children(
          () => paddleRef.current && fire(paddleRef.current),
          !!paddleRef.current
        )}
      </>
    );
  }

  return null;
}
