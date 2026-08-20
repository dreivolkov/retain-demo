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
  const [error, setError] = useState<string | null>(null);

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
      if (!res.ok) {
        throw new Error(data.error || "Screenshot failed");
      }

      updateProspect({
        ...form,
        screenshotDataUrl: data.image,
      });
      router.push("/demo/select");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Field
        label="Prospect's company name"
        value={form.companyName}
        onChange={(v) => setForm((f) => ({ ...f, companyName: v }))}
        placeholder="Acme Inc"
      />
      <div className="grid grid-cols-2 gap-4">
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
        label="Prospect's landing page URL"
        value={form.landingPage}
        onChange={(v) => setForm((f) => ({ ...f, landingPage: v }))}
        placeholder="https://acme.com"
        type="url"
      />
      <Field
        label="Prospect's logo URL"
        value={form.logo}
        onChange={(v) => setForm((f) => ({ ...f, logo: v }))}
        placeholder="https://acme.com/logo.png"
        type="url"
      />

      {error && (
        <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
      )}

      <button
        type="submit"
        disabled={!canSubmit || status === "loading"}
        className="w-full rounded-md bg-gmailblue px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === "loading" ? "Capturing landing page…" : "Build the demo"}
      </button>
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
      <span className="mb-1 block text-sm font-medium text-gray-700">{label}</span>
      <input
        type={type}
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-gmailblue focus:outline-none focus:ring-1 focus:ring-gmailblue"
      />
    </label>
  );
}
