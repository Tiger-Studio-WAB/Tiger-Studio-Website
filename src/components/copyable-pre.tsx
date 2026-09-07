"use client";

import { isValidElement, useRef, useState, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

function nodeText(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(nodeText).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) {
    return nodeText(node.props.children);
  }
  return "";
}

function languageOf(node: ReactNode): string | undefined {
  const child = Array.isArray(node) ? node[0] : node;
  if (!isValidElement<{ className?: string }>(child)) return undefined;
  const className = child.props.className;
  if (typeof className !== "string") return undefined;
  return className.match(/language-([a-z0-9+_-]+)/i)?.[1];
}

function CopyIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export function CopyablePre(props: React.ComponentProps<"pre"> & { node?: unknown }) {
  const { children, className, node, ...rest } = props;
  void node;
  const rootRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef(0);
  const [copied, setCopied] = useState(false);
  const language = languageOf(children);

  useGSAP(
    () => {
      return () => window.clearTimeout(timerRef.current);
    },
    { scope: rootRef },
  );

  async function onCopy() {
    const text = nodeText(children).replace(/\n$/, "");
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const pre = rootRef.current?.querySelector("pre");
      if (!pre) return;
      const range = document.createRange();
      range.selectNodeContents(pre);
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);
      document.execCommand("copy");
      selection?.removeAllRanges();
    }

    setCopied(true);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const button = rootRef.current?.querySelector(".code-block-copy");
    if (button && !reduce) {
      gsap.fromTo(
        button,
        { scale: 0.88 },
        { scale: 1, duration: 0.35, ease: "back.out(2)", overwrite: "auto" },
      );
    }
    if (rootRef.current && !reduce) {
      gsap.fromTo(
        rootRef.current,
        { boxShadow: "inset 0 0 0 2px var(--brand-yellow)" },
        { boxShadow: "inset 0 0 0 0px transparent", duration: 0.85, ease: "power2.out", overwrite: "auto" },
      );
    }
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div ref={rootRef} className="code-block">
      <div className="code-block-bar">
        {language ? <span className="code-block-lang">{language}</span> : <span />}
        <button
          type="button"
          className="code-block-copy"
          onClick={onCopy}
          aria-label={copied ? "Copied" : "Copy code"}
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <span className="sr-only" aria-live="polite">
        {copied ? "Copied to clipboard" : ""}
      </span>
      <pre {...rest} className={className}>
        {children}
      </pre>
    </div>
  );
}
