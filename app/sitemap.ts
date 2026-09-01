import type { MetadataRoute } from 'next'
import { allBlogPosts } from '@/lib/blog-posts'

const SITE_ORIGIN = 'https://coopventilationcalc.com'

// lastmod policy (Google, 2026): `lastmod` is only used when it is CONSISTENTLY
// accurate, and a wrong value is worse than no value — inaccurate dates get the
// whole sitemap's lastmod discounted, not just the offending URL. So:
//
//   /       -> OMITTED. The homepage changes when the calculator, FAQ, or copy
//              changes, and none of that is tracked as a date anywhere. A
//              build-time stamp here would claim a change on every deploy.
//   /blog   -> newest post's publishedAt. The index genuinely changes when a
//              post is added, so this is a real content date, not a clock read.
//   posts   -> publishedAt. Honest about publication; understates edits, which
//              is the safe direction. Entries with no date omit lastmod rather
//              than falling back to build time.
//
// Never reintroduce `new Date()` here. A no-op redeploy must produce a
// byte-identical sitemap.

function newestPublishedAt(): string | undefined {
  const dates = allBlogPosts
    .map((post) => post.publishedAt)
    .filter((d): d is string => Boolean(d))
    .sort()
  return dates.length ? dates[dates.length - 1] : undefined
}

export default function sitemap(): MetadataRoute.Sitemap {
  const blogIndexModified = newestPublishedAt()

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      // No trailing slash, to byte-match the canonical the homepage actually
      // emits. Next strips the slash from `alternates.canonical`, so submitting
      // `${SITE_ORIGIN}/` here meant the URL we asked Google to index and the
      // URL the page declared canonical differed by one character. Aligning the
      // sitemap is the cheap side of that fix; the alternative (`trailingSlash:
      // true`) would rewrite every URL on the site.
      url: SITE_ORIGIN,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_ORIGIN}/blog`,
      ...(blogIndexModified ? { lastModified: new Date(blogIndexModified) } : {}),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]

  const postRoutes: MetadataRoute.Sitemap = allBlogPosts.map((post) => ({
    url: `${SITE_ORIGIN}/blog/${post.slug}`,
    ...(post.publishedAt ? { lastModified: new Date(post.publishedAt) } : {}),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticRoutes, ...postRoutes]
}
