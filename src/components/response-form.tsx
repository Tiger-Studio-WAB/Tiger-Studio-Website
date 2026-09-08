"use client";

import { useActionState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { createResponse, type CreateResponseState } from "@/lib/actions/ideas";
import type { UiCopy } from "@/lib/i18n";
import type { ContentLanguage } from "@/lib/help-types";

const initialState: CreateResponseState = {};

export function ResponseForm({
  ideaId,
  copy,
  locale,
}: {
  ideaId: string;
  copy: UiCopy;
  locale: ContentLanguage;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const submit = useCallback(
    async (prev: CreateResponseState, formData: FormData) => {
      const next = await createResponse(prev, formData);
      if (next.ok) {
        formRef.current?.reset();
        router.refresh();
      }
      return next;
    },
    [router],
  );
  const [state, formAction, pending] = useActionState(submit, initialState);

  const errorMessage =
    state.error === "validation"
      ? locale === "zh"
        ? "回复再写完整一点。"
        : "Write a little more before posting."
      : state.error === "save"
        ? locale === "zh"
          ? "没保存成功，请再试一次。"
          : "Could not save this. Try again."
        : null;

  return (
    <form ref={formRef} action={formAction} className="space-y-4" aria-busy={pending}>
      <input type="hidden" name="idea_id" value={ideaId} />
      <input type="hidden" name="source_language" value={locale} />
      {errorMessage ? (
        <p className="bg-brand-yellow/40 px-3 py-2 text-sm" role="alert">
          {errorMessage}
        </p>
      ) : null}
      {state.ok && !pending ? (
        <p className="text-sm text-muted-foreground" aria-live="polite">
          {copy.replyPosted}
        </p>
      ) : null}
      <label className="block space-y-2">
        <span className="text-sm font-semibold">{copy.writeResponse}</span>
        <textarea
          required
          minLength={2}
          maxLength={4000}
          name="body"
          rows={4}
          className="field"
          disabled={pending}
        />
      </label>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="can_help" className="size-4 accent-brand-red" disabled={pending} />
        {copy.canHelp}
      </label>
      <button type="submit" className="btn btn-red" disabled={pending}>
        {pending ? copy.postingReply : copy.postResponse}
      </button>
    </form>
  );
}
