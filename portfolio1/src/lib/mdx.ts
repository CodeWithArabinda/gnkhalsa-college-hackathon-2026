import matter from "gray-matter";

export type Metadata = {
  title: string;
  publishedAt: string;
  summary: string;
  image?: string;
  author?: string;
  tags?: string[];
};

// Vite's import.meta.glob parses all files under /src/content/blogs/*.mdx
const mdxFiles = import.meta.glob("/src/content/blogs/*.mdx", {
  query: "?raw",
  eager: true,
});

export function getBlogPosts() {
  return Object.entries(mdxFiles).map(([filePath, rawModule]) => {
    const rawContent = (rawModule as any).default || (rawModule as string);
    const { data, content } = matter(rawContent);
    const slug = filePath.split("/").pop()?.replace(/\.mdx$/, "") || "";

    return {
      metadata: data as Metadata,
      slug,
      content,
    };
  });
}

export function getBlogPost(slug: string) {
  const posts = getBlogPosts();
  const post = posts.find((p) => p.slug === slug);
  if (!post) {
    throw new Error(`Blog post not found: ${slug}`);
  }
  return {
    metadata: post.metadata,
    content: post.content,
  };
}
