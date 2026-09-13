import { NextResponse } from "next/server";
import { readLocalNewsAsset } from "@/lib/news";

const TYPES: Record<string, string> = {
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  gif: "image/gif",
  webp: "image/webp",
  svg: "image/svg+xml",
};

export async function GET(
  _request: Request,
  context: { params: Promise<{ path: string[] }> },
) {
  const { path } = await context.params;
  const relative = path.join("/");
  const file = await readLocalNewsAsset(relative);
  if (!file) {
    return new NextResponse("Not found", { status: 404 });
  }
  const ext = relative.split(".").pop()?.toLowerCase() ?? "";
  return new NextResponse(file, {
    headers: {
      "Content-Type": TYPES[ext] ?? "application/octet-stream",
      "Cache-Control": "public, max-age=120",
    },
  });
}
