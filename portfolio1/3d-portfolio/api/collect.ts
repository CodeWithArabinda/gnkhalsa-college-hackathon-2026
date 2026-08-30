import { UMAMI_ORIGIN } from "../src/lib/umami";

const OWN = new Set([
  "localhost",
  "127.0.0.1",
  "nareshkhatri.dev",
  "www.nareshkhatri.dev",
]);

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(204).end();
  }

  let host: string;
  try {
    const raw = typeof req.body === "string" ? req.body : JSON.stringify(req.body);
    if (raw.length > 512) return res.status(204).end();
    host = String(JSON.parse(raw)?.host ?? "")
      .toLowerCase()
      .slice(0, 253);
  } catch {
    return res.status(204).end();
  }

  if (!/^[a-z0-9.-]+\.[a-z]{2,}$/.test(host)) return res.status(204).end();
  if (OWN.has(host) || host.endsWith(".nareshkhatri.dev")) return res.status(204).end();

  const origin = (req.headers["origin"] as string) ?? "";
  console.log(`[analytics] host=${host} origin=${origin}`);

  const websiteId = process.env.UMAMI_DEPLOY_SITE_ID;
  if (websiteId && UMAMI_ORIGIN) {
    try {
      await fetch(`${UMAMI_ORIGIN}/api/send`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "user-agent": (req.headers["user-agent"] as string) ?? "collect",
        },
        body: JSON.stringify({
          type: "event",
          payload: {
            website: websiteId,
            hostname: host,
            url: "/",
            name: "deploy",
          },
        }),
      });
    } catch {
      /* best-effort */
    }
  }

  return res.status(204).end();
}
