export interface AffiliateLink {
  label: string;
  href: string;
  description: string;
}

/**
 * Optional block for affiliate links. Renders nothing when the list is empty.
 * Links are marked sponsored for search engines and disclosed to readers.
 */
export function AffiliateBlock({ links, heading = "Related offers" }: { links: AffiliateLink[]; heading?: string }) {
  if (links.length === 0) return null;
  return (
    <aside aria-label={heading} className="card my-8 p-5">
      <h2 className="font-display text-lg font-bold">{heading}</h2>
      <p className="mt-1 text-xs text-[var(--muted)]">
        These are affiliate links. We may earn a commission if you sign up, at no extra cost to you.
      </p>
      <ul className="mt-3 space-y-3">
        {links.map((l) => (
          <li key={l.href}>
            <a href={l.href} target="_blank" rel="sponsored noopener noreferrer" className="font-semibold text-[var(--accent-text)] underline underline-offset-2">
              {l.label}
            </a>
            <p className="text-sm text-[var(--muted)]">{l.description}</p>
          </li>
        ))}
      </ul>
    </aside>
  );
}
