"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDemo } from "@/lib/demo-context";

export default function QuestionnaireForm() {
  const router = useRouter();
  const { prospect, updateProspect } = useDemo();
  const [form, setForm] = useState({
    companyName: prospect.companyName,
    contactName: prospect.contactName,
    jobTitle: prospect.jobTitle,
    landingPage: prospect.landingPage,
    logo: prospect.logo,
  });
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [dummyLoading, setDummyLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const DUMMY = {
    companyName: "Paddle",
    contactName: "Irina",
    jobTitle: "Head of Growth",
    landingPage: "https://www.paddle.com/",
    logo: "/paddle-logo.svg",
  };

  async function handleDummy() {
    setDummyLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/screenshot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: DUMMY.landingPage }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Screenshot failed");
      updateProspect({ ...DUMMY, screenshotDataUrl: data.image });
      router.push("/demo/select");
    } catch (err) {
      setDummyLoading(false);
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  const canSubmit =
    form.companyName.trim() &&
    form.contactName.trim() &&
    form.jobTitle.trim() &&
    form.landingPage.trim() &&
    form.logo.trim();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setStatus("loading");
    setError(null);

    try {
      const res = await fetch("/api/screenshot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: form.landingPage }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Screenshot failed");

      updateProspect({ ...form, screenshotDataUrl: data.image });
      router.push("/demo/select");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Field
        label="Company name"
        value={form.companyName}
        onChange={(v) => setForm((f) => ({ ...f, companyName: v }))}
        placeholder="Acme Inc"
      />
      <div className="grid grid-cols-2 gap-3">
        <Field
          label="Contact name"
          value={form.contactName}
          onChange={(v) => setForm((f) => ({ ...f, contactName: v }))}
          placeholder="Jamie Rivera"
        />
        <Field
          label="Job title"
          value={form.jobTitle}
          onChange={(v) => setForm((f) => ({ ...f, jobTitle: v }))}
          placeholder="VP of Growth"
        />
      </div>
      <Field
        label="Landing page URL"
        value={form.landingPage}
        onChange={(v) => setForm((f) => ({ ...f, landingPage: v }))}
        placeholder="https://acme.com"
        type="url"
      />
      <Field
        label="Logo URL"
        value={form.logo}
        onChange={(v) => setForm((f) => ({ ...f, logo: v }))}
        placeholder="https://acme.com/logo.png"
        type="url"
      />

      {error && (
        <p className="rounded border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700 font-lausanne">
          {error}
        </p>
      )}

      <div className="pt-2 space-y-2">
        <button
          type="submit"
          disabled={!canSubmit || status === "loading" || dummyLoading}
          className="w-full rounded bg-paddle-yellow px-5 py-3 text-sm font-lausanne font-semibold text-paddle-warm600 transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {status === "loading" ? "Capturing landing page…" : "Build the demo →"}
        </button>

        <div className="flex items-center gap-3 py-1">
          <div className="h-px flex-1 bg-paddle-warm200" />
          <span className="font-mono text-[9px] uppercase tracking-widest text-paddle-warm600/30">or</span>
          <div className="h-px flex-1 bg-paddle-warm200" />
        </div>

        <button
          type="button"
          onClick={handleDummy}
          disabled={status === "loading" || dummyLoading}
          className="w-full rounded border border-paddle-warm200 px-5 py-3 text-sm font-lausanne text-paddle-warm600/70 transition hover:border-paddle-warm600 hover:text-paddle-warm600 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {dummyLoading ? "Capturing landing page…" : "Use dummy data"}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.15em] text-paddle-warm600/60">
        {label}
      </span>
      <input
        type={type}
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded border border-paddle-warm200 bg-white px-3 py-2.5 text-sm font-lausanne text-paddle-warm600 placeholder:text-paddle-warm600/30 focus:border-paddle-warm600 focus:outline-none transition"
      />
    </label>
  );
}
