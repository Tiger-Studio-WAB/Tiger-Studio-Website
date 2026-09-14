const HTML_COMMENT_OPEN = "<!--";
const HTML_COMMENT_CLOSE = "-->";

export function stripHtmlComments(source: string) {
  let out = "";
  let i = 0;
  let fence: string | null = null;

  const atLineStart = () => i === 0 || source[i - 1] === "\n";
  const takeFenceLine = () => {
    const lineEnd = source.indexOf("\n", i);
    const end = lineEnd === -1 ? source.length : lineEnd + 1;
    out += source.slice(i, end);
    i = end;
  };

  while (i < source.length) {
    if (atLineStart() && (source.startsWith("```", i) || source.startsWith("~~~", i))) {
      const mark = source.slice(i, i + 3);
      if (!fence) {
        fence = mark;
        takeFenceLine();
        continue;
      }
      if (fence === mark) {
        fence = null;
        takeFenceLine();
        continue;
      }
    }
    if (!fence && source.startsWith(HTML_COMMENT_OPEN, i)) {
      const end = source.indexOf(HTML_COMMENT_CLOSE, i + HTML_COMMENT_OPEN.length);
      i = end === -1 ? source.length : end + HTML_COMMENT_CLOSE.length;
      continue;
    }
    out += source[i];
    i += 1;
  }

  return out;
}

export function prepareMarkdownBody(source: string) {
  return stripHtmlComments(source)
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function omitMatchingTitleHeading(source: string, title?: string) {
  const normalized = title?.replace(/\s+/g, " ").trim().toLowerCase();
  if (!normalized) return source;
  return source.replace(/^#\s+(.+?)\s*(?:\r?\n)+/, (full, heading: string) => {
    return heading.replace(/\s+/g, " ").trim().toLowerCase() === normalized ? "" : full;
  });
}

export function resolveMarkdownImage(src: string | undefined, imageBase?: string) {
  if (!src) return src;
  if (/^https?:\/\//i.test(src) || src.startsWith("/")) return src;
  if (!imageBase) return src;
  return `${imageBase.replace(/\/$/, "")}/${src.replace(/^\.\//, "")}`;
}

function parentFolder(filePath: string) {
  const slash = filePath.lastIndexOf("/");
  return slash === -1 ? "" : filePath.slice(0, slash);
}

export function markdownAssetBase(
  source: "local" | "github",
  filePath: string,
  options: { localPrefix: string; githubBase: string; stemFolder?: boolean },
) {
  const normalized = filePath.replace(/\\/g, "/").replace(/^\.\//, "");
  const folder = options.stemFolder ? normalized.replace(/\.md$/i, "") : parentFolder(normalized);
  const root = source === "github" ? options.githubBase : options.localPrefix;
  const base = root.replace(/\/$/, "");
  return folder ? `${base}/${folder}` : base;
}
