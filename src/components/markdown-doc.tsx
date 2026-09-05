import Markdown from "react-markdown";

export function MarkdownDoc({ source }: { source: string }) {
  return (
    <div className="prose-docs">
      <Markdown
        components={{
          a: ({ href, children }) => (
            <a
              href={href}
              {...(href?.startsWith("http")
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              {children}
            </a>
          ),
        }}
      >
        {source}
      </Markdown>
    </div>
  );
}
