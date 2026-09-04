export function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="border border-studio-line bg-studio-soft px-6 py-12 text-center">
      <p className="text-xl font-semibold text-navy">{title}</p>
      <p className="mt-2 text-studio-muted">{body}</p>
    </div>
  );
}
