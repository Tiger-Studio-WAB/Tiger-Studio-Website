import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { CopyablePre } from "@/components/copyable-pre";
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
    <CopyablePre language={languageFromPreNode(node)} className={className} {...props}>
      {children}
    </CopyablePre>
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
