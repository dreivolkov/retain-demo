"use client";

import Link from "next/link";
import type { ProspectProfile } from "@/types/prospect";
import { fromAddress, fromDisplayName, subjectLine } from "@/lib/gmail-copy";

export default function GmailMock({ prospect }: { prospect: ProspectProfile }) {
  const recipientName = prospect.recipientName || "Khem";
  const senderFirstName = prospect.contactName.trim().split(/\s+/)[0] || "Our team";

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
            <SenderAvatar logo={prospect.logo} company={prospect.companyName} />
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
            {senderFirstName} from {prospect.companyName || "our team"}{" "}
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

const PADDLE_LOGO = "/paddle-logo.svg";

function SenderAvatar({ logo, company }: { logo: string; company: string }) {
  if (logo === PADDLE_LOGO) {
    // Paddle "p" mark — yellow circle with the brand P letterform
    return (
      <div className="h-10 w-10 shrink-0 rounded-full bg-[#FFD400] flex items-center justify-center overflow-hidden">
        <svg viewBox="455 448 210 244" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-7 w-7">
          <path d="M658.02 538.62C658.02 585.227 620.381 623.062 573.839 623.357H539.015V686.001H508.772V595.733H573.839C605.129 595.439 630.429 569.975 630.429 538.62C630.429 507.265 605.129 481.801 573.839 481.506H508.772V453.883H573.839C620.381 454.177 658.02 492.013 658.02 538.62Z" fill="#1C1A15"/>
          <path d="M508.772 491.318C508.842 518.129 530.548 539.863 557.317 539.863C530.548 539.863 508.842 561.596 508.772 588.407C508.703 561.596 486.997 539.863 460.228 539.863C486.997 539.863 508.703 518.129 508.772 491.318Z" fill="#1C1A15"/>
        </svg>
      </div>
    );
  }

  if (logo) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={logo}
        alt={company}
        className="h-10 w-10 shrink-0 rounded-full object-contain bg-white border border-gray-100 p-1"
      />
    );
  }

  return <div className="h-10 w-10 shrink-0 rounded-full bg-gray-200" />;
}
