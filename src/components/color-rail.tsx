export function ColorRail() {
  return (
    <div aria-hidden="true" className="color-rail">
      <span className="bg-wab-teal" />
      <span className="bg-wab-cyan" />
      <span className="bg-wab-purple" />
      <span className="bg-wab-gold" />
      <span className="bg-wab-red" />
      <span className="bg-wab-blue" />
    </div>
  );
}

export function AccentBars() {
  return (
    <div aria-hidden="true" className="mb-6 flex gap-2">
      <span className="h-2 w-14 rounded-full bg-wab-teal" />
      <span className="h-2 w-14 rounded-full bg-wab-cyan" />
      <span className="h-2 w-14 rounded-full bg-wab-purple" />
    </div>
  );
}
