"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDemo } from "@/lib/demo-context";
import GmailMock from "@/components/GmailMock";

export default function PaymentRecoveryPage() {
  const router = useRouter();
  const { prospect, hydrated } = useDemo();

  useEffect(() => {
    if (hydrated && !prospect.companyName) {
      router.replace("/");
    }
  }, [hydrated, prospect, router]);

  if (!hydrated || !prospect.companyName) return null;

  return <GmailMock prospect={prospect} />;
}
