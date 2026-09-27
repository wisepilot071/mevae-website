export function ContentsList({ items }: { items: string[] }) {
  return (
    <ul className="border-t rule">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-4 border-b rule py-4">
          <span aria-hidden="true" className="h-px w-6 bg-gold" />
          {item}
        </li>
      ))}
    </ul>
  );
}
