"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDemo } from "@/lib/demo-context";
import { PaddleLogoDark } from "@/components/PaddleLogo";

const OPTIONS = [
  {
    href: "/demo/payment-recovery",
    label: "01",
    title: "Payment Recovery",
    description: "Walk through the recovery email users would receive after a failed payment — personalised with their brand.",
  },
  {
    href: "/demo/payment-recovery-in-app",
    label: "02",
    title: "Payment Recovery In-App",
    description: "Show the in-app notification that surfaces inside their product, prompting customers to update their card before the subscription lapses.",
  },
  {
    href: "/demo/cancellation-flow",
    label: "03",
    title: "Cancellation Flows",
    description: "Trigger a live, interactive cancellation flow — surveys, salvage offers, and deflection logic — powered by real Retain data.",
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

  if (!hydrated || !prospect.companyName) return null;

  return (
    <div className="min-h-screen bg-paddle-warm50 flex flex-col">
      {/* Top bar */}
      <header className="flex items-center justify-between border-b border-paddle-warm200 px-8 py-5">
        <PaddleLogoDark className="w-20" />
        <span className="text-xs font-mono text-paddle-warm600/50 uppercase tracking-widest">
          {prospect.companyName}
        </span>
        <button
          onClick={() => router.push("/")}
          className="text-xs font-mono uppercase tracking-widest text-paddle-warm600/50 hover:text-paddle-warm600 transition"
        >
          ← New Demo
        </button>
      </header>

      {/* Content */}
      <div className="flex flex-1 flex-col px-8 py-12 max-w-4xl mx-auto w-full">
        <div className="mb-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-paddle-warm600/40 mb-3">
            Step 2 of 2 · Choose a demo
          </p>
          <h1 className="font-serrif text-[2.5rem] leading-tight text-paddle-warm600">
            What would you like<br />to show?
          </h1>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {OPTIONS.map((opt) => (
            <button
              key={opt.href}
              onClick={() => router.push(opt.href)}
              className="group relative flex flex-col rounded-lg border border-paddle-warm200 bg-white p-6 text-left transition hover:border-paddle-warm600 hover:shadow-md"
            >
              <span className="font-mono text-[10px] text-paddle-warm600/30 uppercase tracking-widest mb-4">
                {opt.label}
              </span>
              <p className="font-serrif text-xl leading-tight text-paddle-warm600 mb-3">
                {opt.title}
              </p>
              <p className="text-xs font-lausanne leading-relaxed text-paddle-warm600/60 flex-1">
                {opt.description}
              </p>
              <div className="mt-6 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-paddle-yellow" />
                <span className="font-mono text-[9px] uppercase tracking-widest text-paddle-warm600/40 group-hover:text-paddle-warm600 transition">
                  Launch demo
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Prospect summary strip */}
        <div className="mt-8 rounded-lg border border-paddle-warm200 bg-paddle-warm50 px-5 py-4 flex items-center gap-6 flex-wrap">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-widest text-paddle-warm600/40 mb-0.5">Contact</p>
            <p className="text-sm font-lausanne text-paddle-warm600">{prospect.contactName}</p>
          </div>
          <div className="h-4 w-px bg-paddle-warm200 hidden sm:block" />
          <div>
            <p className="font-mono text-[9px] uppercase tracking-widest text-paddle-warm600/40 mb-0.5">Title</p>
            <p className="text-sm font-lausanne text-paddle-warm600">{prospect.jobTitle}</p>
          </div>
          <div className="h-4 w-px bg-paddle-warm200 hidden sm:block" />
          <div>
            <p className="font-mono text-[9px] uppercase tracking-widest text-paddle-warm600/40 mb-0.5">Company</p>
            <p className="text-sm font-lausanne text-paddle-warm600">{prospect.companyName}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
