import { config } from "@portfolio1/data/config";
import { getBlogPosts } from "@portfolio1/lib/mdx";

export default function sitemap() {
  const posts = getBlogPosts().map((post) => ({
    url: `${config.site}/blogs/${post.slug}`,
    lastModified: new Date(post.metadata.publishedAt),
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  return [
    {
      url: config.site,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${config.site}/blogs`,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${config.site}/resume`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...posts,
  ];
}
