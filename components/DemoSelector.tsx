"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDemo } from "@/lib/demo-context";

const OPTIONS = [
  {
    href: "/demo/payment-recovery",
    title: "Demo Payment Recovery",
    description: "Walk through the dunning email that recovers a failed payment.",
  },
  {
    href: "/demo/payment-recovery-in-app",
    title: "Demo Payment Recovery In-App",
    description: "Show the in-app notification that prompts a card update.",
  },
  {
    href: "/demo/cancellation-flow",
    title: "Demo Cancellation Flows",
    description: "Trigger the live Retain cancellation flow modal.",
  },
];

export default function DemoSelector() {
  const router = useRouter();
  const { prospect, hydrated } = useDemo();

  useEffect(() => {
    if (hydrated && (!prospect.companyName || !prospect.screenshotDataUrl)) {
      router.replace("/");
    }
  }, [hydrated, prospect, router]);

  if (!hydrated || !prospect.companyName) {
    return null;
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <div className="mb-8 flex items-center gap-3">
        {prospect.logo && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={prospect.logo}
            alt={prospect.companyName}
            className="h-10 w-10 rounded object-contain"
          />
        )}
        <div>
          <p className="text-sm text-gray-500">Demoing for</p>
          <h1 className="text-lg font-semibold text-gray-900">{prospect.companyName}</h1>
        </div>
      </div>

      <div className="space-y-3">
        {OPTIONS.map((opt) => (
          <button
            key={opt.href}
            onClick={() => router.push(opt.href)}
            className="w-full rounded-lg border border-gray-200 bg-white p-4 text-left shadow-sm transition hover:border-gmailblue hover:shadow"
          >
            <p className="font-medium text-gray-900">{opt.title}</p>
            <p className="mt-1 text-sm text-gray-500">{opt.description}</p>
          </button>
        ))}
      </div>

      <button
        onClick={() => router.push("/")}
        className="mt-8 text-sm text-gray-500 underline underline-offset-2 hover:text-gray-700"
      >
        Start a new prospect
      </button>
    </div>
  );
}
