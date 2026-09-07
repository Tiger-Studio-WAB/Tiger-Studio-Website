"use client";

import { useEffect } from "react";

function copyText(text: string) {
  void (async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        return;
      }
      throw new Error("clipboard unavailable");
    } catch {
      const field = document.createElement("textarea");
      field.value = text;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.left = "-9999px";
      document.body.appendChild(field);
      field.select();
      document.execCommand("copy");
      field.remove();
    }
  })();
}

function markCopied(button: HTMLElement) {
  button.classList.add("is-copied");
  button.dataset.copied = "true";
  button.setAttribute("aria-label", "Copied");
  const label = button.querySelector(".copy-label");
  if (label) label.textContent = "Copied";
  window.setTimeout(() => {
    button.classList.remove("is-copied");
    button.dataset.copied = "false";
    button.setAttribute("aria-label", "Copy code");
    if (label) label.textContent = "Copy";
  }, 2000);
}

export function CodeCopyListener() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const button = (event.target as HTMLElement | null)?.closest<HTMLElement>(".code-block-copy");
      if (!button) return;
      const root = button.closest(".code-block");
      const text = (root?.querySelector("pre")?.textContent ?? "").replace(/\n$/, "");
      copyText(text);
      markCopied(button);
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
