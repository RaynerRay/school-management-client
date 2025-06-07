"use client";

import { useState } from "react";
import { X } from "lucide-react";

export default function PromoBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative bg-[#0070f3] text-white px-4 py-3 text-center text-sm font-medium">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-x-1.5">
        <span>✨</span>

        <span>
          Get a Reliable School Management System and Support Innovation
        </span>

        <span>!</span>
        <span>🚀</span>
        <a
          target="_blank"
          href="https://wa.me/message/LLX6C4XEGRKII1"
          className="ml-1 inline-flex items-center underline hover:opacity-90"
        >
          Chat with Me →
        </a>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-2 rounded-lg p-1 hover:bg-blue-600"
          aria-label="Dismiss banner"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
