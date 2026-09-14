const HTML_COMMENT_OPEN = "<!--";
const HTML_COMMENT_CLOSE = "-->";

export function stripHtmlComments(source: string) {
  let out = "";
  let i = 0;
  let fence: string | null = null;

  while (i < source.length) {
    if (!fence && (source.startsWith("```", i) || source.startsWith("~~~", i))) {
      fence = source.slice(i, i + 3);
      out += fence;
      i += 3;
      continue;
    }
    if (fence && source.startsWith(fence, i)) {
      out += fence;
      i += 3;
      fence = null;
      continue;
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
    .replace(/^[ \t]*<!-{2,}[\s\S]*?-{2,}>[ \t]*$/gm, "")
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

export function markdownAssetBase(
  source: "local" | "github",
  filePath: string,
  options: { localPrefix: string; githubBase: string; stemFolder?: boolean },
) {
  const normalized = filePath.replace(/\\/g, "/");
  const folder = options.stemFolder
    ? normalized.replace(/\.md$/i, "")
    : normalized.replace(/\/[^/]+$/, "");
  if (source === "github") {
    return folder ? `${options.githubBase.replace(/\/$/, "")}/${folder}` : options.githubBase.replace(/\/$/, "");
  }
  return folder ? `${options.localPrefix}/${folder}` : options.localPrefix;
}
