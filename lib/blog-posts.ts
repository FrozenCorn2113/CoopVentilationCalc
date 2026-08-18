import { posts } from './posts'
import { genesisBlogPosts } from './genesis-blog-posts'

// Unified blog-post roster consumed by the app/blog render paths.
//
// Two sources feed it:
//   1. lib/posts.ts              (the original hand-curated posts, never machine-edited)
//   2. lib/genesis-blog-posts.ts (posts appended by the automated content job)
//
// Existing slugs (and therefore every live /blog/<slug> URL) are preserved verbatim by
// mapping lib/posts.ts through untouched. This adapter exists so the content-handler has a
// single stable roster (`allBlogPosts`) plus a dedicated append target (`genesisBlogPosts`)
// without ever touching the curated posts file.
export type BlogPost = {
  slug: string
  title: string
  seoTitle?: string
  description: string
  publishedAt: string
  body: string
  image?: { src: string; alt: string }
}

// Map the curated posts into the unified shape (slugs unchanged -> URLs unchanged).
const curatedBlogPosts: BlogPost[] = posts.map((p) => ({
  slug: p.slug,
  title: p.title,
  seoTitle: p.seoTitle,
  description: p.description,
  publishedAt: p.publishedAt,
  body: p.body,
}))

// Curated first, then auto-written. Dedupe by slug (curated wins) so a future
// generated slug that collides with a curated one can never produce duplicate static
// params or break the build.
const seenSlugs = new Set<string>()
export const allBlogPosts: BlogPost[] = [...curatedBlogPosts, ...genesisBlogPosts].filter((p) => {
  if (seenSlugs.has(p.slug)) return false
  seenSlugs.add(p.slug)
  return true
})

export function getBlogPost(slug: string): BlogPost | null {
  return allBlogPosts.find((p) => p.slug === slug) || null
}
