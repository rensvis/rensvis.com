import { SITE } from './site';
import { AUTHOR } from './author';

export function articleSchema(entry: {
  data: { title: string; description: string; date: Date; tags: string[] };
  id: string;
}): string {
  const url = `${SITE.url}/articles/${entry.id}`;
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: entry.data.title,
    description: entry.data.description,
    datePublished: entry.data.date.toISOString(),
    author: {
      '@type': 'Person',
      name: AUTHOR.name,
      url: SITE.url,
    },
    publisher: {
      '@type': 'Person',
      name: AUTHOR.name,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    url,
    keywords: entry.data.tags.join(', '),
  });
}

export function websiteSchema(): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    description: SITE.description,
    url: SITE.url,
  });
}
