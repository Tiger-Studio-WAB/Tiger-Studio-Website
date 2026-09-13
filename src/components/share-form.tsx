import { createPlaytestShare } from "@/lib/actions/community";
import type { UiCopy } from "@/lib/i18n";

export function ShareForm({ copy, error }: { copy: UiCopy; error?: string }) {
  return (
    <form action={createPlaytestShare} className="space-y-5">
      {error ? (
        <p className="bg-brand-yellow/40 px-3 py-2 text-sm">
          {error === "validation" ? copy.formValidation : copy.formSaveError}
        </p>
      ) : null}
      <label className="block space-y-2">
        <span className="text-sm font-semibold">{copy.title}</span>
        <input required minLength={3} maxLength={160} name="title" className="field" />
      </label>
      <label className="block space-y-2">
        <span className="text-sm font-semibold">{copy.shareWhatToTry}</span>
        <textarea required minLength={10} maxLength={4000} name="what_to_try" rows={6} className="field" />
      </label>
      <label className="block space-y-2">
        <span className="text-sm font-semibold">{copy.shareLink}</span>
        <input type="url" name="link" className="field" />
      </label>
      <label className="block space-y-2">
        <span className="text-sm font-semibold">{copy.shareNotes}</span>
        <textarea name="notes" maxLength={2000} rows={3} className="field" />
      </label>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="is_anonymous" className="size-4 accent-brand-red" />
        {copy.shareAnonymous}
      </label>
      <button type="submit" className="btn btn-red">
        {copy.shareSubmit}
      </button>
    </form>
  );
}
