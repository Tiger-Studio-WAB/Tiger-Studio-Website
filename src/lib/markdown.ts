const FENCE = /(```[\s\S]*?```|~~~[\s\S]*?~~~)/g;
const HTML_COMMENT = /<!--[\s\S]*?-->/g;

export function stripHtmlComments(source: string) {
  return source
    .split(FENCE)
    .map((part) => (part.startsWith("```") || part.startsWith("~~~") ? part : part.replace(HTML_COMMENT, "")))
    .join("");
}

export function prepareMarkdownBody(source: string) {
  return stripHtmlComments(source)
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
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
