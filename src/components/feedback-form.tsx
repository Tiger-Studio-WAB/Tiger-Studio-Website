import { createProductFeedback } from "@/lib/actions/community";
import type { PlaytestShare } from "@/lib/help-types";
import type { UiCopy } from "@/lib/i18n";

export function FeedbackForm({
  copy,
  shares,
  error,
}: {
  copy: UiCopy;
  shares: PlaytestShare[];
  error?: string;
}) {
  return (
    <form action={createProductFeedback} className="space-y-5">
      {error ? (
        <p className="bg-brand-yellow/40 px-3 py-2 text-sm">
          {error === "validation" ? copy.formValidation : copy.formSaveError}
        </p>
      ) : null}
      <label className="block space-y-2">
        <span className="text-sm font-semibold">{copy.feedbackTarget}</span>
        <select name="share_id" className="field" defaultValue="">
          <option value="">{copy.feedbackTargetFree}</option>
          {shares.map((share) => (
            <option key={share.id} value={share.id}>
              {share.title}
            </option>
          ))}
        </select>
      </label>
      <label className="block space-y-2">
        <span className="text-sm font-semibold">{copy.feedbackTarget}</span>
        <input required minLength={2} maxLength={160} name="target" className="field" />
      </label>
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
