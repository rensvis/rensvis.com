"use client";

import * as React from "react";
import { FileText } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";

type SearchResult = {
  id: string;
  url: string;
  title: string;
  excerpt: string;
};

export function SearchCommand({
  trigger,
}: {
  trigger?: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [shortcut, setShortcut] = React.useState("Ctrl+K");

  React.useEffect(() => {
    const isMac =
      typeof navigator !== "undefined" &&
      /Mac|iPhone|iPod|iPad/i.test(navigator.userAgent);
    setShortcut(isMac ? "⌘K" : "Ctrl+K");
  }, []);
  const [results, setResults] = React.useState<SearchResult[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [pagefindReady, setPagefindReady] = React.useState<boolean | null>(null);

  const searchTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  React.useEffect(() => {
    if (!open) return;

    setPagefindReady(null);
    const pagefindUrl = `${window.location.origin}/pagefind/pagefind.js`;
    import(/* @vite-ignore */ pagefindUrl)
      .then((pagefind) => {
        pagefind.init?.();
        setPagefindReady(true);
      })
      .catch(() => setPagefindReady(false));
  }, [open]);

  React.useEffect(() => {
    if (!open || pagefindReady !== true) return;

    if (!query.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    clearTimeout(searchTimeoutRef.current);
    searchTimeoutRef.current = setTimeout(async () => {
      try {
        const pagefindUrl = `${window.location.origin}/pagefind/pagefind.js`;
        const pagefind = await import(/* @vite-ignore */ pagefindUrl);
        const search = await (pagefind.debouncedSearch ?? pagefind.search)(query);
        if (search === null) return;

        const data = await Promise.all(
          search.results.slice(0, 8).map(async (r: { id: string; data: () => Promise<{ url: string; excerpt: string; meta?: { title?: string } }> }) => {
            const d = await r.data();
            return {
              id: r.id,
              url: d.url,
              title: d.meta?.title ?? "Untitled",
              excerpt: d.excerpt ?? "",
            };
          })
        );
        setResults(data);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 200);

    return () => clearTimeout(searchTimeoutRef.current);
  }, [query, open, pagefindReady]);

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) {
      setQuery("");
      setResults([]);
    }
  };

  const handleSelect = (url: string) => {
    setOpen(false);
    window.location.href = url;
  };

  return (
    <>
      {trigger ?? (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setOpen(true)}
          aria-label="Search"
          className="gap-1.5 text-muted-foreground hover:text-foreground"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <kbd className="pointer-events-none hidden rounded border border-border bg-muted/50 px-1.5 py-0.5 font-mono text-[10px] font-medium text-muted-foreground sm:inline-block">
            {shortcut}
          </kbd>
        </Button>
      )}
      <CommandDialog
        open={open}
        onOpenChange={handleOpenChange}
        title="Search"
        description="Search across all articles."
        shouldFilter={false}
        className="min-h-[350px]"
      >
        <CommandInput
          placeholder="Search articles..."
          value={query}
          onValueChange={setQuery}
        />
        <CommandList className="max-h-[300px]">
          {pagefindReady === false && (
            <div className="py-6 text-center text-sm text-muted-foreground">
              <p>Search indexes are built when you deploy.</p>
              <a
                href="/search"
                className="mt-2 inline-block text-primary underline-offset-4 hover:underline"
              >
                Go to search page
              </a>
            </div>
          )}
          {pagefindReady === true && query.trim() === "" && !loading && (
            <div className="py-6 text-center text-sm text-muted-foreground">
              Type to search articles...
            </div>
          )}
          {pagefindReady === true && loading && (
            <div className="py-6 text-center text-sm text-muted-foreground">
              Searching...
            </div>
          )}
          {pagefindReady === true && !loading && query.trim() !== "" && results.length === 0 && (
            <CommandEmpty>No results found.</CommandEmpty>
          )}
          {pagefindReady === true && !loading && results.length > 0 && (
            <CommandGroup heading="Articles">
              {results.map((result) => (
                <CommandItem
                  key={result.id}
                  value={result.id}
                  onSelect={() => handleSelect(result.url)}
                >
                  <FileText className="size-4" />
                  <div className="flex min-w-0 flex-col">
                    <span className="truncate font-medium">{result.title}</span>
                    {result.excerpt && (
                      <span
                        className="truncate text-xs text-muted-foreground"
                        dangerouslySetInnerHTML={{ __html: result.excerpt }}
                      />
                    )}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}
