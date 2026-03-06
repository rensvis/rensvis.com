import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const articles = await getCollection('articles');
  const sorted = articles.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  return rss({
    title: 'Rens Vis',
    description: 'Senior Frontend Engineer — design systems, micro frontends, frontend architecture, UX',
    site: context.site,
    items: sorted.map((entry) => ({
      title: entry.data.title,
      description: entry.data.description,
      pubDate: entry.data.date,
      link: new URL(`/articles/${entry.id}`, context.site).href,
    })),
  });
}
