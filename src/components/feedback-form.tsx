import { createProductFeedback } from "@/lib/actions/community";
import type { UiCopy } from "@/lib/i18n";

export function FeedbackForm({
  copy,
  shareId,
  error,
}: {
  copy: UiCopy;
  shareId: string;
  error?: string;
}) {
  return (
    <form action={createProductFeedback} className="space-y-5">
      <input type="hidden" name="share_id" value={shareId} />
      {error ? (
        <p className="rounded-[var(--radius-md)] bg-brand-yellow/40 px-3 py-2 text-sm">
          {error === "validation" ? copy.replyValidation : copy.formSaveError}
        </p>
      ) : null}
      <label className="block space-y-2">
        <span className="text-sm font-semibold">{copy.feedbackBody}</span>
        <textarea required minLength={10} maxLength={4000} name="body" rows={6} className="field" />
      </label>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="is_anonymous" className="size-4 accent-brand-red" />
        {copy.feedbackAnonymous}
      </label>
      <button type="submit" className="btn btn-red">
        {copy.feedbackSubmit}
      </button>
    </form>
  );
}
