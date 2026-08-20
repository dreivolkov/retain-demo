"use client";

import { useEffect, useState } from "react";

export default function InAppNotificationBanner({
  companyName,
  onUpdateClick,
}: {
  companyName: string;
  onUpdateClick: () => void;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`absolute bottom-6 right-6 w-80 rounded-xl border border-gray-200 bg-white p-4 shadow-2xl transition-all duration-500 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5 text-xl">💳</div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-900">Payment failed</p>
          <p className="mt-1 text-sm text-gray-600">
            Your recent payment for {companyName || "your account"} didn&apos;t go
            through. Update your card to keep your subscription active.
          </p>
          <button
            onClick={onUpdateClick}
            className="mt-3 rounded-md bg-gmailblue px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700"
          >
            Update card
          </button>
        </div>
      </div>
    </div>
  );
}
