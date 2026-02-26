import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const articles = await getCollection('articles');
  const sorted = articles.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  return rss({
    title: 'Rens Vis',
    description: 'Senior Frontend Engineer — Angular, Flutter, design systems, frontend architecture',
    site: context.site,
    items: sorted.map((entry) => ({
      title: entry.data.title,
      description: entry.data.description,
      pubDate: entry.data.date,
      link: `/articles/${entry.id}`,
    })),
  });
}
