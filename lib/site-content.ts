/**
 * Reads the CMS-managed member photos, team photos and testimonials for this
 * site from the STX backend (admin panel -> Site assets -> Playmakers).
 *
 * Every failure, timeout or non-200 returns `{}` and every section falls back
 * to the content in lib/content.ts, so a dead backend renders the artboard's
 * page rather than a blank one. An empty section behaves the same way — and one
 * uploaded card means exactly one card, never one plus the placeholders.
 */
const SITE = 'playmakers';
const REVALIDATE_SEC = 300;

export interface SiteItem {
  url: string | null;
  alt: string;
  logoUrl: string | null;
  logoAlt: string;
  title: string | null;
  subtitle: string | null;
  body: string | null;
}

export interface SiteSections {
  gallery?: SiteItem[];
  team?: SiteItem[];
  testimonials?: SiteItem[];
}

export async function siteContent(): Promise<SiteSections> {
  const base = process.env.BACKEND_URL;
  if (!base) return {};
  // A failed fetch must NOT read as "no content": that rendered the built-in
  // default images and the 5-minute page cache then kept that version (seen 5 Nov
  // 2026 after admin edits + API restarts). Throwing instead makes Next keep
  // serving the last good page; at build time it still falls back (builds must not
  // depend on the API). One retry rides out an API restart. A section that is
  // genuinely empty still falls back to the defaults (that's an editorial choice).
  for (let attempt = 1; ; attempt++) {
    try {
      const res = await fetch(`${base}/api/public/site-content?site=${SITE}`, {
      next: { revalidate: REVALIDATE_SEC },
      signal: AbortSignal.timeout(8000),
    });
      if (!res.ok) throw new Error(`site-content (playmakers) responded ${res.status}`);
      const json = (await res.json()) as { sections?: SiteSections };
      return json.sections ?? {};
    } catch (error) {
      // At build time keep the old fallback: a build must not depend on the API
      // (local builds have none), and the first background refresh replaces it.
      if (process.env.NEXT_PHASE === 'phase-production-build') return {};
      if (attempt >= 2) throw error;
      await new Promise((r) => setTimeout(r, 1500));
    }
  }
}
