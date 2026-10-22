import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

// Markdown body for the static trust pages (/about, /contact, /privacy).
// Same typography as blog posts (app/blog/[slug]/page.tsx) so they read alike.
export const trustProseClass = "prose-styled space-y-5 text-[17px] leading-[1.65] text-[var(--color-ink)] [&_h2]:font-display [&_h2]:text-2xl [&_h2]:sm:text-3xl [&_h2]:mt-10 [&_h2]:mb-3 [&_h3]:font-display [&_h3]:text-xl [&_h3]:mt-8 [&_h3]:mb-2 [&_a]:text-[var(--color-accent)] [&_a]:underline [&_strong]:text-[var(--color-ink)] [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-1 [&_code]:bg-[var(--color-paper-warm)] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-[15px] [&_hr]:my-10 [&_hr]:border-[var(--color-line)]"

export function TrustMarkdown({ children }: { children: string }) {
  return (
    <div className={trustProseClass}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // The page title is the sole <h1>.
          h1: ({ node: _node, ...props }) => <h2 {...props} />,
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  )
}
