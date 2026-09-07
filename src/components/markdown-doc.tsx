import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { CopyablePre } from "@/components/copyable-pre";
import { resolveDocHref } from "@/lib/docs";

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
          pre: CopyablePre,
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
