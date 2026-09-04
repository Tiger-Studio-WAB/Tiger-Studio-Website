export function ColorRail() {
  return (
    <div aria-hidden="true" className="color-rail">
      <span className="bg-navy" />
      <span className="bg-studio-gold" />
      <span className="bg-studio-red" />
    </div>
  );
}

export function AccentBars() {
  return (
    <div aria-hidden="true" className="mb-6 flex gap-2">
      <span className="h-2 w-14 rounded-full bg-navy" />
      <span className="h-2 w-14 rounded-full bg-studio-gold" />
      <span className="h-2 w-14 rounded-full bg-studio-red" />
    </div>
  );
}
