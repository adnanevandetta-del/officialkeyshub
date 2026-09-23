import Link from "next/link";
import type { ComponentProps } from "react";

// Styling for MDX article bodies so auto-generated posts match the look of the
// hand-written .tsx articles (light theme, blue accents).
export const mdxComponents = {
  h2: (props: ComponentProps<"h2">) => (
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-10 mb-4" {...props} />
  ),
  h3: (props: ComponentProps<"h3">) => (
    <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3" {...props} />
  ),
  p: (props: ComponentProps<"p">) => (
    <p className="text-gray-700 text-lg leading-relaxed mb-5" {...props} />
  ),
  ul: (props: ComponentProps<"ul">) => (
    <ul className="list-disc pl-6 space-y-2 mb-5 text-gray-700 text-lg" {...props} />
  ),
  ol: (props: ComponentProps<"ol">) => (
    <ol className="list-decimal pl-6 space-y-2 mb-5 text-gray-700 text-lg" {...props} />
  ),
  li: (props: ComponentProps<"li">) => <li className="leading-relaxed" {...props} />,
  a: ({ href = "#", ...props }: ComponentProps<"a">) => {
    const internal = href.startsWith("/");
    if (internal) {
      return <Link href={href} className="text-blue-600 font-semibold hover:underline" {...props} />;
    }
    return (
      <a
        href={href}
        className="text-blue-600 font-semibold hover:underline"
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      />
    );
  },
  strong: (props: ComponentProps<"strong">) => <strong className="font-bold text-gray-900" {...props} />,
  blockquote: (props: ComponentProps<"blockquote">) => (
    <blockquote className="border-l-4 border-blue-500 bg-blue-50 pl-5 py-3 my-6 text-gray-700 italic rounded-r-lg" {...props} />
  ),
  code: (props: ComponentProps<"code">) => (
    <code className="bg-gray-100 text-blue-700 px-1.5 py-0.5 rounded font-mono text-[0.9em]" {...props} />
  ),
  pre: (props: ComponentProps<"pre">) => (
    <pre className="bg-gray-900 text-gray-100 rounded-xl p-5 overflow-x-auto my-6 text-sm" {...props} />
  ),
  table: (props: ComponentProps<"table">) => (
    <div className="overflow-x-auto my-6">
      <table className="w-full border-collapse text-left text-gray-700" {...props} />
    </div>
  ),
  th: (props: ComponentProps<"th">) => (
    <th className="border border-gray-200 bg-gray-50 px-4 py-2 font-bold text-gray-900" {...props} />
  ),
  td: (props: ComponentProps<"td">) => (
    <td className="border border-gray-200 px-4 py-2" {...props} />
  ),
};
