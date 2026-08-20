"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDemo } from "@/lib/demo-context";
import LandingScreenshot from "@/components/LandingScreenshot";
import CancelSubscriptionButton from "@/components/CancelSubscriptionButton";

export default function CancellationFlowPage() {
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
      <div className="absolute right-6 top-6 rounded-xl border border-gray-200 bg-white p-4 shadow-2xl">
        <p className="text-sm font-semibold text-gray-900">
          {prospect.companyName} account settings
        </p>
        <p className="mt-1 text-xs text-gray-500">Manage your subscription</p>
        <div className="mt-3">
          <CancelSubscriptionButton />
        </div>
      </div>
    </LandingScreenshot>
  );
}
