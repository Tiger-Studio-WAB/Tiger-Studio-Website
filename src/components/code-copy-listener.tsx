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
  button.closest(".code-block")?.classList.add("is-copied");
  window.setTimeout(() => {
    button.classList.remove("is-copied");
    button.dataset.copied = "false";
    button.setAttribute("aria-label", "Copy code");
    if (label) label.textContent = "Copy";
    button.closest(".code-block")?.classList.remove("is-copied");
  }, 2500);
}

declare global {
  interface Window {
    __tigerCopyCode?: (button: HTMLElement) => void;
    __tigerCopyBound?: boolean;
  }
}

function tigerCopyCode(button: HTMLElement) {
  const root = button.closest(".code-block");
  const text = (root?.querySelector("pre")?.textContent ?? "").replace(/\n$/, "");
  copyText(text);
  markCopied(button);
}

function onActivate(event: Event) {
  const target = event.target;
  if (!(target instanceof Element)) return;
  const button = target.closest(".code-block-copy");
  if (button instanceof HTMLElement) tigerCopyCode(button);
}

if (typeof window !== "undefined") {
  window.__tigerCopyCode = tigerCopyCode;
  document.documentElement.classList.add("copy-listener-ready");
  if (!window.__tigerCopyBound) {
    window.__tigerCopyBound = true;
    window.addEventListener("click", onActivate, true);
  }
}

export function bindCodeCopyListener() {
  window.__tigerCopyCode = tigerCopyCode;
  document.documentElement.classList.add("copy-listener-ready");
  if (!window.__tigerCopyBound) {
    window.__tigerCopyBound = true;
    window.addEventListener("click", onActivate, true);
  }
}

export function CodeCopyListener() {
  useEffect(() => bindCodeCopyListener(), []);
  return null;
}
