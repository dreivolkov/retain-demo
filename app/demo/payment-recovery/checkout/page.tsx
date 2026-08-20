"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDemo } from "@/lib/demo-context";
import LandingScreenshot from "@/components/LandingScreenshot";
import PaddleCheckoutButton from "@/components/PaddleCheckoutButton";

export default function PaymentRecoveryCheckoutPage() {
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
      <PaddleCheckoutButton autoOpen />
    </LandingScreenshot>
  );
}
