import { config } from "@portfolio1/data/config";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/components"],
    },
    sitemap: `${config.site}/sitemap.xml`,
    host: config.site,
  };
}
