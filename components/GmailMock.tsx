"use client";

import Link from "next/link";
import type { ProspectProfile } from "@/types/prospect";
import { fromAddress, fromDisplayName, subjectLine } from "@/lib/gmail-copy";

export default function GmailMock({ prospect }: { prospect: ProspectProfile }) {
  const recipientName = prospect.recipientName || "there";

  return (
    <div className="min-h-screen bg-white text-[#202124]">
      {/* Gmail top bar */}
      <div className="flex items-center gap-4 border-b border-gray-200 px-6 py-3">
        <div className="flex items-center gap-2 text-xl font-medium text-gray-700">
          <span className="text-2xl">📧</span> Gmail
        </div>
        <div className="ml-4 flex-1 max-w-xl rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-500">
          Search mail
        </div>
        <div className="ml-auto h-8 w-8 rounded-full bg-gray-300" />
      </div>

      <div className="mx-auto max-w-4xl px-6 py-6">
        <div className="mb-4 flex items-center gap-3">
          <Link href="/demo/select" className="text-gray-500 hover:text-gray-700">
            ←
          </Link>
          <h1 className="text-xl">
            Your 💳 payment for {prospect.companyName || "your account"} failed
          </h1>
          <span className="rounded bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-800">
            External
          </span>
          <span className="rounded bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
            Inbox
          </span>
        </div>

        <div className="border-b border-gray-100 pb-4">
          <div className="flex items-start gap-3">
            <div className="h-10 w-10 shrink-0 rounded-full bg-gray-200" />
            <div>
              <p className="font-medium">
                {fromDisplayName(prospect)}{" "}
                <span className="font-normal text-gray-500">
                  &lt;{fromAddress(prospect)}&gt;
                </span>
              </p>
              <p className="text-xs text-gray-500">to me</p>
            </div>
            <span className="ml-auto text-xs text-gray-400">just now</span>
          </div>
        </div>

        <div className="space-y-4 py-8 text-[15px] leading-relaxed">
          <p>Hey {recipientName},</p>
          <p>
            {prospect.contactName || "Our team"} from {prospect.companyName || "our team"}{" "}
            here. It looks like your subscription payment of $99.99 didn&apos;t go
            through.{" "}
            <Link
              href="/demo/payment-recovery/checkout"
              className="text-gmailblue underline underline-offset-2"
            >
              Please update your information here
            </Link>{" "}
            and we&apos;ll give it another try.
          </p>
          <p>Let us know if you have any questions.</p>
          <p>—</p>
          <div>
            <p>{prospect.contactName}</p>
            <p>
              {prospect.jobTitle} at {prospect.companyName}
            </p>
          </div>
          {prospect.logo && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={prospect.logo}
              alt={prospect.companyName}
              className="h-24 w-24 rounded-lg object-contain"
            />
          )}
        </div>

        <p className="border-t border-gray-100 pt-4 text-xs text-gray-500">
          This order process is conducted by our online reseller &amp; Merchant of
          Record, Paddle.com, who also handle order related inquiries and returns.
        </p>
      </div>
    </div>
  );
}
