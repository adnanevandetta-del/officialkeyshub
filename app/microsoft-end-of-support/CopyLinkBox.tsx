"use client";

import { useState } from "react";

// "Link to this page" box: gives bloggers, forums and IT teams a ready-made
// link, which is how a reference page like this earns backlinks.
export default function CopyLinkBox({ url }: { url: string }) {
  const html = `<a href="${url}">Microsoft end of support dates</a> (Official Keys Hub)`;
  const [copied, setCopied] = useState<"" | "url" | "html">("");

  const copy = async (text: string, which: "url" | "html") => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(which);
      setTimeout(() => setCopied(""), 2000);
    } catch {
      // Clipboard can be blocked; the text is still selectable below.
    }
  };

  return (
    <div className="rounded-2xl border border-sky-200 bg-white p-5 md:p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-1">Use this table</h2>
      <p className="text-gray-600 mb-4 text-sm">
        Free to link from your blog, forum answer, IT policy or newsletter. It updates itself, so the link stays accurate.
      </p>
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-2">
          <code className="flex-1 min-w-0 break-all rounded-lg bg-gray-50 px-3 py-2 text-xs text-gray-800 ring-1 ring-gray-200">{url}</code>
          <button
            type="button"
            onClick={() => copy(url, "url")}
            className="shrink-0 rounded-lg bg-sky-700 px-4 py-2 text-sm font-bold text-white hover:bg-sky-800"
          >
            {copied === "url" ? "Copied" : "Copy link"}
          </button>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <code className="flex-1 min-w-0 break-all rounded-lg bg-gray-50 px-3 py-2 text-xs text-gray-800 ring-1 ring-gray-200">{html}</code>
          <button
            type="button"
            onClick={() => copy(html, "html")}
            className="shrink-0 rounded-lg bg-white px-4 py-2 text-sm font-bold text-sky-700 ring-1 ring-sky-300 hover:bg-sky-50"
          >
            {copied === "html" ? "Copied" : "Copy HTML"}
          </button>
        </div>
      </div>
    </div>
  );
}
