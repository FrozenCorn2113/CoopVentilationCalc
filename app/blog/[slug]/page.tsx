import Link from 'next/link'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getBlogPost, allBlogPosts } from '@/lib/blog-posts'
import { pageTitle, clampDescription, stripDuplicateTitleHeading } from '@/lib/site'
import { AffiliateProducts } from '@/components/AffiliateProducts'
import { EmailCapture } from '@/components/EmailCapture'
import { articleNode, breadcrumbNode, faqPageNode, absoluteImageUrl, SITE_ORIGIN } from '@/lib/schema'
import { relatedSlugsFor } from '@/lib/related-guides'

export function generateStaticParams() {
  return allBlogPosts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) return {}
  return {
    title: { absolute: pageTitle(post.seoTitle ?? post.title) },
    description: clampDescription(post.description),
    alternates: { canonical: `/blog/${post.slug}` },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) notFound()

  const article = articleNode({
    slug: post.slug,
    title: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    imageUrl: absoluteImageUrl(post.image?.src),
  })
  const breadcrumb = breadcrumbNode(post.slug, post.title)
  const faqPage = faqPageNode(post.body, `${SITE_ORIGIN}/blog/${post.slug}`)
  // Resolve through the live roster so a related entry naming an undeployed
  // post is dropped instead of rendering a link to a 404.
  const related = relatedSlugsFor(post.slug)
    .map((s) => getBlogPost(s))
    .filter((p): p is NonNullable<typeof p> => p !== null)
  const publishedLabel = post.publishedAt
    ? new Date(post.publishedAt + 'T00:00:00Z').toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC',
      })
    : null

  return (
    <main className="mx-auto max-w-3xl px-5 sm:px-12 py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      {faqPage && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }} />
      )}
      <Link href="/blog" className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-ink-soft)] hover:text-[var(--color-accent)]">
        ← Guides
      </Link>
      <article className="mt-6">
        <h1 className="font-display text-4xl sm:text-5xl leading-[1.05] tracking-[-0.02em] text-[var(--color-ink)]">
          {post.title}
        </h1>
        <p className="mt-4 text-base text-[var(--color-ink-soft)]">{post.description}</p>
        {publishedLabel && (
          <p className="mt-3 text-xs uppercase tracking-[0.12em] text-[var(--color-ink-soft)]">
            By Coop Ventilation Calculator · Updated {publishedLabel}
          </p>
        )}
        <div className="mt-10 prose-styled space-y-5 text-[17px] leading-[1.65] text-[var(--color-ink)] [&_h2]:font-display [&_h2]:text-2xl [&_h2]:sm:text-3xl [&_h2]:mt-10 [&_h2]:mb-3 [&_h3]:font-display [&_h3]:text-xl [&_h3]:mt-8 [&_h3]:mb-2 [&_a]:text-[var(--color-accent)] [&_a]:underline [&_strong]:text-[var(--color-ink)] [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-1 [&_code]:bg-[var(--color-paper-warm)] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-[15px] [&_blockquote]:border-l-4 [&_blockquote]:border-[var(--color-accent)] [&_blockquote]:pl-4 [&_blockquote]:italic [&_th]:border-b-2 [&_th]:border-[var(--color-ink)] [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:font-semibold [&_td]:border-b [&_td]:border-[var(--color-line)] [&_td]:px-3 [&_td]:py-2 [&_td]:align-top">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              // The page title is the sole <h1>. A leading `#` in a post body that
              // merely restates that title is stripped upstream (stripDuplicateTitleHeading);
              // anything else that arrives as `#` renders one level down so every
              // /blog/* page still has exactly one h1.
              h1: ({ node: _node, ...props }) => <h2 {...props} />,
              // Markdown tables arrive unstyled, so cells butt against each
              // other and column labels read as one run-on word. The min-width
              // keeps them legible on a phone by scrolling rather than crushing.
              table: ({ node: _node, ...props }) => (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[32rem] border-collapse text-[15px]" {...props} />
                </div>
              ),
            }}
          >
            {stripDuplicateTitleHeading(post.body, post.title)}
          </ReactMarkdown>
        </div>
      </article>

      {related.length > 0 && (
        <section className="mt-16 border-t-2 border-[var(--color-ink)] pt-10">
          <h2 className="font-display text-2xl mb-5">Read next</h2>
          <ul className="space-y-4">
            {related.map((r) => (
              <li key={r.slug}>
                <Link
                  href={`/blog/${r.slug}`}
                  className="group block"
                >
                  <span className="font-display text-lg text-[var(--color-ink)] underline decoration-[var(--color-accent)] underline-offset-4 group-hover:text-[var(--color-accent)]">
                    {r.title}
                  </span>
                  <span className="mt-1 block text-sm leading-snug text-[var(--color-ink-soft)]">
                    {r.description}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-16 border-t-2 border-[var(--color-ink)] pt-10">
        <h2 className="font-display text-2xl mb-5">Hardware that fits this guide</h2>
        {/* showHeading={false}, not heading="": the latter still rendered an
            empty <h2></h2>, which opens a null-titled section for passage
            chunkers and is a straight accessibility failure. */}
        <AffiliateProducts max={3} showHeading={false} />
      </section>

      <section className="mt-16 poster-card p-7">
        <h2 className="font-display text-2xl mb-2">Get the next guide when it lands</h2>
        <p className="text-sm text-[var(--color-ink-soft)] mb-4 max-w-md">
          One short note when a new ventilation guide or calculator drops. No marketing.
        </p>
        <EmailCapture />
      </section>
    </main>
  )
}
