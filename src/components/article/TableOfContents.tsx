export interface Heading {
  depth: number;
  slug: string;
  text: string;
}

interface Props {
  headings: Heading[];
  title?: string;
}

export function TableOfContents({ headings, title = "Contents" }: Props) {
  if (headings.length === 0) return null;

  if (headings.some((h) => h.depth === 1)) {
    console.warn(
      "[TableOfContents] Article content contains h1 headings. Use h2 as the top-level heading in content (the page title is already h1).",
    );
  }

  const filtered = headings.filter((h) => h.depth === 2 || h.depth === 3);
  if (filtered.length === 0) return null;

  const h2Indices = filtered
    .map((h, i) => (h.depth === 2 ? i : -1))
    .filter((i) => i >= 0);

  function getSubsections(h2Index: number): Heading[] {
    const nextH2Index = h2Indices.find((i) => i > h2Index) ?? filtered.length;
    return filtered
      .slice(h2Index + 1, nextH2Index)
      .filter((h) => h.depth === 3);
  }

  return (
    <nav
      aria-label="Table of contents"
      className="not-prose mb-8 rounded-lg border border-border bg-muted/30 p-4"
    >
      <h2 className="mb-3 text-foreground">{title}</h2>
      {h2Indices.length > 0 ? (
        <ol className="list-none space-y-1 pl-0">
          {h2Indices.map((h2Index, index) => {
            const heading = filtered[h2Index];
            const subsections = getSubsections(h2Index);
            return (
              <li key={heading.slug}>
                <a
                  href={`#${heading.slug}`}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {index + 1}. {heading.text}
                </a>
                {subsections.length > 0 && (
                  <ul className="ml-4 mt-1 list-disc space-y-0.5 pl-4">
                    {subsections.map((sub) => (
                      <li key={sub.slug}>
                        <a
                          href={`#${sub.slug}`}
                          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                          {sub.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ol>
      ) : (
        <ul className="list-disc space-y-0.5 pl-4">
          {filtered.map((heading) => (
            <li key={heading.slug}>
              <a
                href={`#${heading.slug}`}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
