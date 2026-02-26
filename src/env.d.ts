/// <reference types="astro/client" />

interface PagefindUIOptions {
  element?: string;
}

declare const PagefindUI: new (options?: PagefindUIOptions) => void;
