import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { resolveDocHref } from "@/lib/docs";

function languageFromPreNode(node: unknown) {
  if (!node || typeof node !== "object" || !("children" in node)) return undefined;
  const children = (node as { children?: unknown[] }).children;
  const code = children?.find((child) => {
    return Boolean(child && typeof child === "object" && "tagName" in child && child.tagName === "code");
  }) as { properties?: { className?: string[] | string } } | undefined;
  const className = code?.properties?.className;
  const token = Array.isArray(className)
    ? className.find((item) => item.startsWith("language-"))
    : typeof className === "string"
      ? className
      : undefined;
  return token?.replace(/^language-/, "") || undefined;
}

function MarkdownPre({
  children,
  className,
  node,
  ...props
}: React.ComponentProps<"pre"> & { node?: unknown }) {
  return (
    <div className="code-block">
      <div className="code-block-bar">
        <span className="code-block-lang">{languageFromPreNode(node) || "\u00a0"}</span>
        <button type="button" className="code-block-copy" data-copied="false" aria-label="Copy code">
          <svg
            className="copy-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <rect x="9" y="9" width="13" height="13" rx="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
          <svg
            className="copied-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            aria-hidden="true"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
          <span className="copy-label">Copy</span>
        </button>
      </div>
      <pre {...props} className={className}>
        {children}
      </pre>
    </div>
  );
}

export function MarkdownDoc({
  source,
  currentSlug = [],
}: {
  source: string;
  currentSlug?: string[];
}) {
  return (
    <div className="prose-docs">
      <Markdown
        remarkPlugins={[remarkGfm]}
        components={{
          pre: MarkdownPre,
          a: ({ href, children }) => {
            const next = resolveDocHref(href, currentSlug) ?? href;
            return (
              <a
                href={next}
                {...(next?.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {children}
              </a>
            );
          },
        }}
      >
        {source}
      </Markdown>
    </div>
  );
}
