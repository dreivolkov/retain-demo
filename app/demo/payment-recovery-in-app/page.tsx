"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDemo } from "@/lib/demo-context";
import LandingScreenshot from "@/components/LandingScreenshot";
import RetainDemoTrigger from "@/components/RetainDemoTrigger";

export default function PaymentRecoveryInAppPage() {
  const router = useRouter();
  const { prospect, hydrated } = useDemo();

  useEffect(() => {
    if (hydrated && !prospect.companyName) {
      router.replace("/");
    }
  }, [hydrated, prospect, router]);

  if (!hydrated || !prospect.companyName) return null;

  return (
    <LandingScreenshot screenshotDataUrl={prospect.screenshotDataUrl}>
      {/* Auto-launches Retain's real in-app payment recovery notification after a short delay */}
      <RetainDemoTrigger feature="paymentRecoveryInApp" autoTrigger autoTriggerDelay={1200} />
    </LandingScreenshot>
  );
}
