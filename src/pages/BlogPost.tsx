import { useRef } from 'react'
import { useParams } from 'react-router'
import { PATHS } from '@/config/routes'
import { BLOG_AUTHOR, BLOG_POSTS, getPost, type BlogPost as Post } from '@/data/blog'
import { definitionFor } from '@/data/seo'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { Button } from '@/components/ui/Button'
import { Container, Eyebrow, Section } from '@/components/ui/layout'
import { Icon } from '@/components/ui/Icon'
import { PageHero } from '@/components/site/PageHero'
import { SiteLink } from '@/components/site/SiteLink'
import { TrialCallout } from '@/components/site/TrialNote'
import { ClosingScene } from '@/components/story/ClosingScene'
import { formatDate } from './Blog'
import NotFound from './NotFound'

function PostView({ post }: { post: Post }) {
  const root = useRef<HTMLDivElement>(null)
  useScrollReveal(root, '[data-reveal]')
  const related = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3)

  return (
    <div ref={root}>
      <PageHero eyebrow={`Blog · ${post.category}`} lines={[post.title]} lede={definitionFor(`${PATHS.blog}/${post.slug}`)}>
        <p className="mt-6 text-sm text-muted">
          By {BLOG_AUTHOR} · <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readMinutes} min read
        </p>
      </PageHero>

      <Section className="bg-paper pt-12 md:pt-16">
        <Container>
          <article className="mx-auto max-w-[720px]">
            <p className="text-xl leading-relaxed text-muted">{post.intro}</p>
            {post.sections.map((s) => (
              <section key={s.heading} className="mt-12">
                <h2 className="font-serif text-[clamp(22px,2.6vw,30px)] leading-snug font-medium tracking-[-0.02em]">{s.heading}</h2>
                {s.paragraphs.map((p) => (
                  <p key={p} className="mt-4 text-[17px] leading-relaxed">
                    {p}
                  </p>
                ))}
                {s.list && (
                  <ul className="m-0 mt-4 grid list-none gap-2.5 p-0">
                    {s.list.map((item) => (
                      <li key={item} className="grid grid-cols-[22px_minmax(0,1fr)] gap-2.5 text-[16.5px]">
                        <Icon name="check" size={18} className="mt-[3px] text-coral" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            <aside className="mt-14 rounded-card-lg border border-coral/30 bg-coral-soft p-7">
              <small className="font-display text-xs font-bold tracking-[.12em] text-coral-deep uppercase">Key takeaway</small>
              <p className="mt-2 text-[17px] leading-relaxed">{post.takeaway}</p>
            </aside>

            <TrialCallout className="mt-8" />
            <div className="mt-6 flex flex-wrap gap-3">
              <Button to={PATHS.demo} variant="ghost">
                Book a demo
              </Button>
              <Button to={PATHS.blog} variant="ghost">
                All guides
              </Button>
            </div>
          </article>
        </Container>
      </Section>

      <Section>
        <Container>
          <Eyebrow>Keep reading</Eyebrow>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {related.map((p) => (
              <SiteLink
                key={p.slug}
                to={`${PATHS.blog}/${p.slug}`}
                data-reveal
                className="group flex flex-col rounded-card-lg border border-line bg-paper p-6 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-coral hover:shadow-lift"
              >
                <span className="font-display text-xs font-bold tracking-[.12em] text-coral-deep uppercase">{p.category}</span>
                <h3 className="mt-2.5 flex-1 font-serif text-lg leading-snug font-medium">{p.title}</h3>
                <span className="mt-4 text-[13px] text-muted">{p.readMinutes} min read</span>
              </SiteLink>
            ))}
          </div>
        </Container>
      </Section>

      <ClosingScene />
    </div>
  )
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const post = slug ? getPost(slug) : undefined
  if (!post) return <NotFound />
  return <PostView key={post.slug} post={post} />
}
